"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createColorSchema,
  CreateColorType,
  ColorBaseType,
  UpdateColorType,
} from "@/schemas/colorSchema";
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
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ColorFormProps = {
  color?: ColorBaseType;
  onClose?: () => void;
};

export function ColorForm({ color, onClose }: ColorFormProps) {
  const { createColor, updateColor } = useAppStore();

  const form = useForm<CreateColorType>({
    resolver: zodResolver(createColorSchema),
    defaultValues: {
      color: color?.color ?? "#000000",
      label: color?.label ?? "",
    },
  });

  const onSubmit = (data: CreateColorType) => {
    try {
      if (color) {
        updateColor(color.id, data as UpdateColorType);
        toast.success(`Color "${color.label}" has been updated`);
      } else {
        createColor(data);
        toast.success(`Color "${data.label}" has been created`);
      }
      form.reset();
      if (onClose) onClose();
    } catch (error) {
      console.error("Error submitting color:", error);
      toast.error("Color has not been created");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="Enter color label" {...field} />
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
              <FormLabel>Color</FormLabel>
              <FormControl>
                <div className="flex justify-start items-center gap-3">
                  <Input type="color" {...field} className="w-20 h-10" />
                  <Input
                    type="text"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-center gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{color ? "Save Changes" : "Add Color"}</Button>
        </div>
      </form>
    </Form>
  );
}
