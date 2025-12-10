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

type DeleteAllTasksDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DeleteAllTasksDialog({
  open,
  onOpenChange,
}: DeleteAllTasksDialogProps) {
  const { deleteAllTasks, tasks } = useAppStore();

  const handleConfirm = () => {
    deleteAllTasks();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete All Tasks</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete all {tasks.length} task(s)? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

