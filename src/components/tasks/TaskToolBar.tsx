"use client";

import { useState } from "react";
import { CirclePlus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import TaskDialog from "./TaskDialog";
import TaskSearch from "./TaskSearch";
import DeleteAllTasksDialog from "./DeleteAllTasksDialog";
import { useAppStore } from "@/store/appStore";

export default function TaskToolBar() {
  const { tasks } = useAppStore();
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center gap-4 p-4 border-b">
      {/* LEFT */}
      <div className="flex justify-start items-center gap-3">
        <TaskSearch />
      </div>

      {/* RIGHT */}
      <div className="flex justify-end items-center gap-3">
        <TaskDialog
          trigger={
            <Button variant="outline" size="default" aria-label="add-task">
              <CirclePlus className="w-4 h-4" />
              <span className="hidden md:inline">Create Task</span>
            </Button>
          }
        />

        <Button
          variant="outline"
          size="default"
          aria-label="remove-all"
          onClick={() => setIsDeleteAllOpen(true)}
          disabled={tasks.length === 0}
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden md:inline">Remove All Tasks</span>
        </Button>

        <DeleteAllTasksDialog
          open={isDeleteAllOpen}
          onOpenChange={setIsDeleteAllOpen}
        />
      </div>
    </nav>
  );
}
