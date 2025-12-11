"use client";

import { CirclePlus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import ToggleTheme from "./ToggleTheme";

export default function TopBar() {
  return (
    <nav className="py-2 px-4 flex items-center justify-between border-b">
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <ToggleTheme />
      </div>
    </nav>
  );
}
