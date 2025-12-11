"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/appStore";
import { TaskBaseType } from "@/schemas/taskSchema";
import { toast } from "sonner";

type DeleteTaskDialogProps = {
  task: TaskBaseType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DeleteTaskDialog({
  task,
  open,
  onOpenChange,
}: DeleteTaskDialogProps) {
  const { deleteTask } = useAppStore();

  const handleConfirm = () => {
    deleteTask(task.id);
    toast.success(`Task "${task.title}" has been removed`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete "{task.title}"? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
