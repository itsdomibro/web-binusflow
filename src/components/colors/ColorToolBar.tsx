"use client";

import { Input } from "@/components/ui/input";
import { ColorDialog } from "./ColorDialog";

export function ColorToolBar() {
  return (
    <div className="w-full flex justify-between items-center">
      {/* LEFT TOOL */}
      <div>
        <Input type="text" placeholder="Search tasks..." />
      </div>

      {/* RIGHT TOOL */}
      <div className="flex justify-end items-center gap-3">
        <ColorDialog />
      </div>
    </div>
  );
}
