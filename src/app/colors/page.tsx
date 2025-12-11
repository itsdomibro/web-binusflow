"use client";

import { useState } from "react";
import { ColorList } from "@/components/colors/ColorList";
import { ColorToolBar } from "@/components/colors/ColorToolBar";

export default function ColorsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col justify-start gap-1">
      <ColorToolBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <ColorList searchQuery={searchQuery} />
    </div>
  );
}
