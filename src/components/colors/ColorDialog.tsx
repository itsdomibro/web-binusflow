"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { ColorForm } from "./ColorForm";
import { ColorBaseType } from "@/schemas/colorSchema";

type ColorDialogProps = {
  color?: ColorBaseType;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ColorDialog({
  color,
  trigger,
  open,
  onOpenChange,
}: ColorDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined && onOpenChange !== undefined;
  const dialogOpen = isControlled ? open : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange! : setInternalOpen;

  const defaultTrigger = (
    <Button variant="outline" size="icon" aria-label="add">
      <CirclePlus />
    </Button>
  );

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      {!trigger && !isControlled && (
        <DialogTrigger asChild>{defaultTrigger}</DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{color ? "Edit Color" : "Create a Color"}</DialogTitle>

          <DialogDescription>
            {color
              ? "Update the color details"
              : "Fill in the details to add a new color"}
          </DialogDescription>
        </DialogHeader>

        <ColorForm color={color} onClose={() => handleOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
