import {
  createColorSchema,
  updateColorSchema,
  ColorBaseType,
  CreateColorType,
  UpdateColorType,
} from "@/schemas/colorSchema";
import {
  taskCreateSchema,
  taskUpdateSchema,
  TaskBaseType,
  TaskCreateType,
  TaskUpdateType,
} from "@/schemas/taskSchema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AppState = {
  tasks: TaskBaseType[];
  colors: ColorBaseType[];

  createTask: (data: TaskCreateType) => void;
  updateTask: (id: string, data: TaskUpdateType) => void;
  deleteTask: (id: string) => void;

  createColor: (data: CreateColorType) => void;
  updateColor: (id: string, data: UpdateColorType) => void;
  deleteColor: (id: string) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      tasks: [],
      colors: [],

      createTask: (data) =>
        set((state) => {
          const parsed = taskCreateSchema.parse(data);
          const newTask: TaskBaseType = {
            ...parsed,
            id: crypto.randomUUID(),
            status: "notStarted",
          };
          return { tasks: [...state.tasks, newTask] };
        }),

      updateTask: (id, data) =>
        set((state) => {
          const parsed = taskUpdateSchema.parse(data);
          return {
            tasks: state.tasks.map((t) =>
              t.id === id ? { ...t, ...parsed } : t
            ),
          };
        }),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      createColor: (data) =>
        set((state) => {
          const parsed = createColorSchema.parse(data);
          const newColor: ColorBaseType = {
            ...parsed,
            id: crypto.randomUUID(),
          };
          return { colors: [...state.colors, newColor] };
        }),

      updateColor: (id, data) =>
        set((state) => {
          const parsed = updateColorSchema.parse(data);
          return {
            colors: state.colors.map((c) =>
              c.id === id ? { ...c, ...parsed } : c
            ),
          };
        }),

      deleteColor: (id) =>
        set((state) => ({
          colors: state.colors.filter((c) => c.id !== id),
        })),
    }),
    { name: "task-app-storage" }
  )
);
