"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { colorSchema, ColorFormValues } from "@/schemas/colorSchema";
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

export function ColorForm({ onClose }: { onClose: () => void }) {
  const addColor = useAppStore((s) => s.addColor);
  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: { color: "#000000" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          addColor(data.color);
          onClose();
        })}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pick a Color</FormLabel>
              <FormControl>
                <Input type="color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Color</Button>
      </form>
    </Form>
  );
}
