import { create } from "zustand";
import { persist } from "zustand/middleware";

type TaskStatus = "to_do" | "in_progress" | "done";

type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  color: string;
};

type Color = {
  id: string;
  color: string;
};

type AppState = {
  tasks: Task[];
  colors: Color[];

  addTask: (
    title: string,
    description: string,
    status: TaskStatus,
    colorId: string
  ) => void;
  editTask: (
    id: string,
    title?: string,
    description?: string,
    status?: TaskStatus,
    colorId?: string
  ) => void;
  removeTask: (id: string) => void;

  addColor: (color: string) => void;
  editColor: (id: string, color: string) => void;
  removeColor: (id: string) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      tasks: [],
      colors: [],

      addTask: (title, description, status, colorId) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title,
              description,
              status,
              color: colorId,
            },
          ],
        })),

      editTask: (id, title, description, status, colorId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  title: title ?? t.title,
                  description: description ?? t.description,
                  status: status ?? t.status,
                  color: colorId ?? t.color,
                }
              : t
          ),
        })),

      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      addColor: (color) =>
        set((state) => ({
          colors: [...state.colors, { id: crypto.randomUUID(), color }],
        })),

      editColor: (id, color) =>
        set((state) => ({
          colors: state.colors.map((c) => (c.id === id ? { ...c, color } : c)),
        })),

      removeColor: (id) =>
        set((state) => ({
          colors: state.colors.filter((c) => c.id !== id),
        })),
    }),
    {
      name: "task-app-storage",
    }
  )
);
