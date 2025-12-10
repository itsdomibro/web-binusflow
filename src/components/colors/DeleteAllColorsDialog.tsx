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

type DeleteAllColorsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteAllColorsDialog({
  open,
  onOpenChange,
}: DeleteAllColorsDialogProps) {
  const { deleteAllColors, colors } = useAppStore();

  const handleConfirm = () => {
    deleteAllColors();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete All Colors</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete all {colors.length} color(s)? This
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
