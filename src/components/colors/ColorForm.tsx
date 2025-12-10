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
      } else {
        createColor(data);
      }
      form.reset();
      if (onClose) onClose();
    } catch (error) {
      console.error("Error submitting color:", error);
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
                <div className="flex items-center gap-3">
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

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{color ? "Save Changes" : "Add Color"}</Button>
        </div>
      </form>
    </Form>
  );
}
