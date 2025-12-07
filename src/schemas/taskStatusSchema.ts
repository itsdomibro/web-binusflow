import z from "zod";

export const taskStatusBaseSchema = z.enum([
  "notStarted",
  "inProgress",
  "toDo",
]);

export type TaskStatusBaseType = z.infer<typeof taskStatusBaseSchema>;
