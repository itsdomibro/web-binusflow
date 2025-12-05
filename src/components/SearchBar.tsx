"use client";

import { CirclePlus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

export default function SearchBar() {
  return (
    <nav className="py-2 px-4 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" aria-label="add">
          <CirclePlus />
        </Button>
        <Button variant="outline" size="icon" aria-label="remove">
          <Trash2 />
        </Button>
      </div>
    </nav>
  );
}
