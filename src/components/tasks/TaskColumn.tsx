"use client";

import { useAppStore } from "@/store/appStore";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TaskCard from "./TaskCard";

export default function TaskColumn({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const { tasks } = useAppStore();
  const columnTasks = tasks
    .filter((t) => t.status === id)
    .sort((a, b) => a.order - b.order);

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 min-h-[200px] border rounded-md p-4"
    >
      <h3 className="font-semibold mb-2">{title}</h3>

      <div className="min-h-[100px]">
        <SortableContext
          items={columnTasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {columnTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
