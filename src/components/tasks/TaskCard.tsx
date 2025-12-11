"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { TaskBaseType } from "@/schemas/taskSchema";
import { Button } from "../ui/button";
import { Trash2, Pencil } from "lucide-react";
import TaskDialog from "./TaskDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";

export default function TaskCard({ task }: { task: TaskBaseType }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    disabled: isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3 mb-2 rounded-md shadow-sm border${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div
          {...listeners}
          {...attributes}
          className="flex-1 cursor-grab active:cursor-grabbing"
        >
          <div className="font-medium">{task.title}</div>
          {task.description && (
            <div className="text-sm text-gray-600 mt-1">{task.description}</div>
          )}
          {task.color && (
            <div
              className="w-4 h-4 rounded-full mt-2 border"
              style={{ backgroundColor: task.color }}
            />
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            aria-label="edit"
            className="cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDeleting(true)}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            aria-label="delete"
            className="cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </Button>

          <TaskDialog
            task={task}
            open={isEditing}
            onOpenChange={setIsEditing}
          />
          <DeleteTaskDialog
            task={task}
            open={isDeleting}
            onOpenChange={(open) => {
              if (!open) setIsDeleting(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
