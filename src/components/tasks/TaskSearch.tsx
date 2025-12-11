"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/appStore";
import { TaskBaseType } from "@/schemas/taskSchema";
import { cn } from "@/lib/utils";
import TaskDialog from "./TaskDialog";

export default function TaskSearch() {
  const { tasks } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskBaseType | null>(null);

  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
    );
  }, [searchQuery, tasks]);

  const handleTaskSelect = (task: TaskBaseType) => {
    setSelectedTask(task);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          if (filteredTasks.length > 0) setIsOpen(true);
        }}
        onBlur={() => {
          setTimeout(() => setIsOpen(false), 200);
        }}
        className="w-full md:w-[300px]"
      />

      {isOpen && filteredTasks.length > 0 && (
        <div
          className={cn(
            "absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md",
            "max-h-[300px] overflow-auto"
          )}
        >
          <div className="p-1">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus:bg-accent focus:text-accent-foreground"
                )}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleTaskSelect(task);
                }}
              >
                <div className="flex flex-col flex-1">
                  <div className="font-medium">{task.title}</div>
                  {task.description && (
                    <div className="text-xs text-muted-foreground truncate">
                      {task.description}
                    </div>
                  )}
                </div>
                <div
                  className="ml-2 w-3 h-3 rounded-full border"
                  style={{ backgroundColor: task.color }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTask && (
        <TaskDialog
          task={selectedTask}
          open={!!selectedTask}
          onOpenChange={(open) => {
            if (!open) setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}
