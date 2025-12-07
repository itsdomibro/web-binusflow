import { CirclePlus, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TaskDialog from "./TaskDialog";

export default function TaskToolBar() {
  return (
    <nav className="flex justify-between items-center">
      {/* LEFT TOOL */}
      <div className="flex justify-startr items-center gap-3">
        <Input type="text" placeholder="Search tasks..." />
      </div>

      {/* RIGHT TOOL */}
      <div className="flex justify-end items-center gap-3">
        <TaskDialog />
        <Button variant="outline" size="icon" aria-label="remove">
          <Trash2 />
        </Button>
      </div>
    </nav>
  );
}
