"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TaskForm } from "./TaskForm";
import { TaskBaseType } from "@/schemas/taskSchema";
import { useState } from "react";

type TaskDialogProps = {
  task?: TaskBaseType;
  trigger?: React.ReactNode; // optional when controlled
  open?: boolean; // optional
  onOpenChange?: (open: boolean) => void; // optional
};

export default function TaskDialog({
  task,
  trigger,
  open,
  onOpenChange,
}: TaskDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined && onOpenChange !== undefined;

  const dialogOpen = isControlled ? open : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange! : setInternalOpen;

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Create a Task"}</DialogTitle>
          <DialogDescription>
            {task
              ? "Update the details of your task"
              : "Fill in the details to add a new task"}
          </DialogDescription>
        </DialogHeader>

        <TaskForm task={task} onClose={() => handleOpenChange(false)} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
