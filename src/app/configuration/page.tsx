"use client";

import { ColorList } from "@/components/colors/ColorList";
import { ColorToolBar } from "@/components/colors/ColorToolBar";

export default function ConfigurationPage() {
  return (
    <div className="w-full flex flex-col justify-start items-center gap-2">
      <ColorToolBar />
      <ColorList />
    </div>
  );
}
