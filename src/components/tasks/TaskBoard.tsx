"use client";

import { useAppStore } from "@/store/appStore";
import { DndContext } from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";

export default function TaskBoard() {
  const { updateTask } = useAppStore();

  const handleDragEnd = (event: any) => {
    const { over, active } = event;
    if (over) {
      updateTask(active.id, { status: over.id });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="w-full flex justify-start gap-4">
        <TaskColumn id="notStarted" title="Not started" />
        <TaskColumn id="inProgress" title="In progress" />
        <TaskColumn id="toDo" title="Done" />
      </div>
    </DndContext>
  );
}
