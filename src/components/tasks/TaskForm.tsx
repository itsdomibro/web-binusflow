"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  taskCreateSchema,
  TaskCreateType,
  TaskBaseType,
} from "@/schemas/taskSchema";
import { useAppStore } from "@/store/appStore";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

type TaskFormProps = {
  task?: TaskBaseType;
  onClose?: () => void;
};

export function TaskForm({ task, onClose }: TaskFormProps) {
  const { createTask, updateTask, colors } = useAppStore();

  const form = useForm<TaskCreateType>({
    resolver: zodResolver(taskCreateSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      color: task?.color ?? "",
    },
  });

  const onSubmit = (data: TaskCreateType) => {
    try {
      if (task) {
        updateTask(task.id, data);
        toast.success(`Color "${task.title}" has been updated`);
      } else {
        createTask(data);
        toast.success(`Color "${data.title}" has been updated`);
      }
      form.reset();
      if (onClose) onClose();
    } catch (error) {
      console.error("Error submitting task:", error);
      toast.error("Task has not been created");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter task title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter task description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color (Optional)</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value === "__none__" ? "" : value);
                  }}
                  value={field.value || "__none__"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a color (optional)" />
                  </SelectTrigger>

                  <SelectContent>
                    {colors.length > 0 ? (
                      <>
                        <SelectItem value="__none__">No color</SelectItem>
                        {colors.map((c) => (
                          <SelectItem key={c.id} value={c.color}>
                            <div className="flex items-center gap-2">
                              <span
                                className="w-4 h-4 rounded-full border"
                                style={{ backgroundColor: c.color }}
                              />
                              {c.label}
                            </div>
                          </SelectItem>
                        ))}
                      </>
                    ) : (
                      <SelectItem value="__none__">
                        No color (no colors available)
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-center gap-3">
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}

          <Button type="submit">{task ? "Save Changes" : "Add Task"}</Button>
        </div>
      </form>
    </Form>
  );
}
