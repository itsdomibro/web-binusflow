"use client";

import { useState } from "react";
import { CirclePlus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import TaskDialog from "./TaskDialog";
import TaskSearch from "./TaskSearch";
import DeleteAllTasksDialog from "./DeleteAllTasksDialog";

export default function TaskToolBar() {
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center gap-4 p-4 border-b">
      {/* LEFT TOOL */}
      <div className="flex items-center gap-3">
        <TaskDialog
          trigger={
            <Button variant="outline" size="default" aria-label="add-task">
              <CirclePlus className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          }
        />

        <DeleteAllTasksDialog
          open={isDeleteAllOpen}
          onOpenChange={setIsDeleteAllOpen}
        />
        <Button
          variant="outline"
          size="default"
          aria-label="remove-all"
          onClick={() => setIsDeleteAllOpen(true)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Remove All Tasks
        </Button>
      </div>

      {/* RIGHT TOOL */}
      <div className="flex items-center gap-3">
        <TaskSearch />
      </div>
    </nav>
  );
}
