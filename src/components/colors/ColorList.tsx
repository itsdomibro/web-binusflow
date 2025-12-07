"use client";

import { useAppStore } from "@/store/appStore";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function ColorList() {
  const { colors, deleteColor } = useAppStore();

  if (colors.length === 0) {
    return <p className="text-muted-foreground">No colors yet.</p>;
  }

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {colors.map((c) => (
        <div
          key={c.id}
          className="flex items-center justify-between border rounded p-2"
        >
          {/* Color swatch */}
          <div
            className="w-6 h-6 rounded"
            style={{ backgroundColor: c.color }}
          />
          <span className="ml-2">{c.color}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteColor(c.id)}
            aria-label="delete"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
