import TaskBoard from "@/components/tasks/TaskBoard";
import TaskToolBar from "@/components/tasks/TaskToolBar";

export default function TasksPage() {
  return (
    <div className="flex flex-col justify-start gap-1">
      <TaskToolBar />
      <TaskBoard />
    </div>
  );
}
