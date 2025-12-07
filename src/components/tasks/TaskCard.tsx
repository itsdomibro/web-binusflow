"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { TaskBaseType } from "@/schemas/taskSchema";

export default function TaskCard({ task }: { task: TaskBaseType }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="p-3 mb-2 rounded-md shadow-sm cursor-grab bg-white border"
    >
      <div className="font-medium">{task.title}</div>
      {task.description && (
        <div className="text-sm text-gray-600">{task.description}</div>
      )}
      <div
        className="w-4 h-4 rounded-full mt-2"
        style={{ backgroundColor: task.color }}
      />
    </div>
  );
}
