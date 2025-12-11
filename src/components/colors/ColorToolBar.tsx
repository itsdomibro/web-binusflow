"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, CirclePlus } from "lucide-react";
import { ColorDialog } from "./ColorDialog";
import { DeleteAllColorsDialog } from "./DeleteAllColorsDialog";
import { useAppStore } from "@/store/appStore";

type ColorToolBarProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export function ColorToolBar({
  searchQuery,
  onSearchChange,
}: ColorToolBarProps) {
  const [isDeleteAllOpen, setIsDeleteAllOpen] = useState(false);
  const { colors } = useAppStore();

  return (
    <nav className="flex justify-between items-center gap-4 p-4 border-b">
      {/* LEFT */}
      <div className="flex justify-start items-center gap-3">
        <Input
          type="text"
          placeholder="Search colors by label..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full md:w-[300px]"
        />
      </div>

      {/* RIGHT */}
      <div className="flex justify-end items-center gap-3">
        <ColorDialog
          trigger={
            <Button variant="outline" size="default" aria-label="add-color">
              <CirclePlus className="w-4 h-4" />
              <span className="hidden md:inline">Create Color</span>
            </Button>
          }
        />

        <Button
          variant="outline"
          size="default"
          aria-label="remove-all-colors"
          onClick={() => setIsDeleteAllOpen(true)}
          disabled={colors.length === 0}
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden md:inline">Remove All Colors</span>
        </Button>

        <DeleteAllColorsDialog
          open={isDeleteAllOpen}
          onOpenChange={setIsDeleteAllOpen}
        />
      </div>
    </nav>
  );
}
