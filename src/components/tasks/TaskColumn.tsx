import { useAppStore } from "@/store/appStore";
import { useDroppable } from "@dnd-kit/core";

import TaskCard from "./TaskCard";

export default function TaskColumn({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const { tasks } = useAppStore();
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 min-h-[200px] border rounded-md p-4 bg-gray-50"
    >
      <h3 className="font-semibold mb-2">{title}</h3>
      {tasks
        .filter((t) => t.status === id)
        .map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
    </div>
  );
}
