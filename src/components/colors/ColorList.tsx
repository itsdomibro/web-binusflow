"use client";

import { useState } from "react";
import { useAppStore } from "@/store/appStore";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { ColorDialog } from "./ColorDialog";

type ColorListProps = {
  searchQuery?: string;
};

export function ColorList({ searchQuery = "" }: ColorListProps) {
  const { colors, deleteColor } = useAppStore();
  const [editingColorId, setEditingColorId] = useState<string | null>(null);

  const filteredColors = searchQuery
    ? colors.filter(
        (c) =>
          c.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.color.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : colors;

  if (colors.length === 0) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">No colors yet.</p>
      </div>
    );
  }

  if (filteredColors.length === 0) {
    return (
      <div className="p-4">
        <p className="text-muted-foreground">No colors found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredColors.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Color swatch */}
              <div
                className="w-10 h-10 rounded-md border-2 border-gray-200 shrink-0"
                style={{ backgroundColor: c.color }}
              />
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-medium truncate">{c.label}</span>
                <span className="text-sm text-muted-foreground truncate">
                  {c.color}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditingColorId(c.id)}
                aria-label="edit"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <ColorDialog
                color={c}
                open={editingColorId === c.id}
                onOpenChange={(open) => {
                  if (!open) setEditingColorId(null);
                }}
              />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteColor(c.id)}
                aria-label="delete"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
