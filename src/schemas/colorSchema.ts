import z from "zod";

export const colorBaseSchema = z.object({
  id: z.string(),
  color: z.string().min(1, "Color is required"),
  label: z.string().min(1, "Label is required"),
});

export const createColorSchema = colorBaseSchema.omit({
  id: true,
});
export const updateColorSchema = colorBaseSchema.partial();

export type ColorBaseType = z.infer<typeof colorBaseSchema>;
export type CreateColorType = z.infer<typeof createColorSchema>;
export type UpdateColorType = z.infer<typeof updateColorSchema>;
