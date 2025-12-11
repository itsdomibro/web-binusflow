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
import { ColorBaseType } from "@/schemas/colorSchema";
import { toast } from "sonner";

type DeleteColorDialogProps = {
  color: ColorBaseType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteColorDialog({
  color,
  open,
  onOpenChange,
}: DeleteColorDialogProps) {
  const { deleteColor } = useAppStore();

  const handleConfirm = () => {
    deleteColor(color.id);
    toast.success(`Color "${color.label}" has been removed`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Color</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete "{color.label}" ({color.color})?
            This action cannot be undone.
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
