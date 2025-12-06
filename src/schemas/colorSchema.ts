import * as z from "zod";
export const colorSchema = z.object({
  color: z.string().min(1, "Color is required"),
});

export type ColorFormValues = z.infer<typeof colorSchema>;
