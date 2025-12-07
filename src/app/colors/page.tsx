"use client";

import { ColorList } from "@/components/colors/ColorList";
import { ColorToolBar } from "@/components/colors/ColorToolBar";

export default function ColorsPage() {
  return (
    <div className="border border-black flex flex-col justify-start gap-1">
      <ColorToolBar />
      <ColorList />
    </div>
  );
}
