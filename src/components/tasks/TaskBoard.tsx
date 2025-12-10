"use client";

import { useAppStore } from "@/store/appStore";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";
import { arrayMove } from "@dnd-kit/sortable";

export default function TaskBoard() {
  const { tasks, updateTask, updateTaskOrder } = useAppStore();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const isOverColumn =
      overId === "notStarted" || overId === "inProgress" || overId === "toDo";

    if (isOverColumn) {
      const targetStatus = overId as "notStarted" | "inProgress" | "toDo";
      if (activeTask.status !== targetStatus) {
        const sourceColumnTasks = tasks
          .filter((t) => t.status === activeTask.status && t.id !== activeId)
          .sort((a, b) => a.order - b.order)
          .map((t, idx) => ({ ...t, order: idx }));

        const targetColumnTasks = tasks
          .filter((t) => t.status === targetStatus)
          .sort((a, b) => a.order - b.order);

        if (sourceColumnTasks.length > 0) {
          updateTaskOrder(activeTask.status, sourceColumnTasks);
        }

        const newOrder = targetColumnTasks.length;
        const updatedTargetTasks = [
          ...targetColumnTasks,
          { ...activeTask, status: targetStatus, order: newOrder },
        ].map((t, idx) => ({ ...t, order: idx }));

        updateTask(activeId, {
          status: targetStatus,
          order: newOrder,
        });
        updateTaskOrder(targetStatus, updatedTargetTasks);
      }
      return;
    }

    const overTask = tasks.find((t) => t.id === overId);
    if (!overTask) return;

    if (activeTask.status !== overTask.status) {
      const sourceColumnTasks = tasks
        .filter((t) => t.status === activeTask.status && t.id !== activeId)
        .sort((a, b) => a.order - b.order)
        .map((t, idx) => ({ ...t, order: idx }));

      const targetColumnTasks = tasks
        .filter((t) => t.status === overTask.status)
        .sort((a, b) => a.order - b.order);

      const insertIndex = targetColumnTasks.findIndex((t) => t.id === overId);

      const updatedTargetTasks = [...targetColumnTasks];
      updatedTargetTasks.splice(insertIndex, 0, {
        ...activeTask,
        status: overTask.status,
      });

      const reorderedTargetTasks = updatedTargetTasks.map((t, idx) => ({
        ...t,
        order: idx,
      }));

      if (sourceColumnTasks.length > 0) {
        updateTaskOrder(activeTask.status, sourceColumnTasks);
      }

      updateTask(activeId, {
        status: overTask.status,
        order: insertIndex,
      });
      updateTaskOrder(overTask.status, reorderedTargetTasks);
    } else {
      const columnTasks = tasks
        .filter((t) => t.status === overTask.status)
        .sort((a, b) => a.order - b.order);

      const oldIndex = columnTasks.findIndex((t) => t.id === activeId);
      const newIndex = columnTasks.findIndex((t) => t.id === overId);

      if (oldIndex !== newIndex && oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(columnTasks, oldIndex, newIndex).map(
          (t, idx) => ({
            ...t,
            order: idx,
          })
        );
        updateTaskOrder(overTask.status, newOrder);
      }
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="w-full flex justify-start gap-4 p-4">
        <TaskColumn id="notStarted" title="Not started" />
        <TaskColumn id="inProgress" title="In progress" />
        <TaskColumn id="toDo" title="Done" />
      </div>
    </DndContext>
  );
}
