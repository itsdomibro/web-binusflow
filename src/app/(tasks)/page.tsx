import TaskBoard from "@/components/tasks/TaskBoard";
import TaskToolBar from "@/components/tasks/TaskToolBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus, Trash2 } from "lucide-react";

export default function TasksPage() {
  return (
    <div className="border border-black flex flex-col justify-start gap-1">
      <TaskToolBar />
      <TaskBoard />
    </div>
  );
}
