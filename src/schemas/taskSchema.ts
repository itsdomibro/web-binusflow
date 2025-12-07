import z from "zod";
import { taskStatusBaseSchema } from "./taskStatusSchema";

export const taskBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  status: taskStatusBaseSchema,
  color: z.string(),
});

export const taskCreateSchema = taskBaseSchema.omit({
  id: true,
  status: true,
});
export const taskUpdateSchema = taskBaseSchema.partial();

export type TaskBaseType = z.infer<typeof taskBaseSchema>;
export type TaskCreateType = z.infer<typeof taskCreateSchema>;
export type TaskUpdateType = z.infer<typeof taskUpdateSchema>;
