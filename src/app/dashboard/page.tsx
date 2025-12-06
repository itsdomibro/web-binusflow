import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus, Trash2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="w-full">
      {/* TOOLBAR */}
      <div className="w-full px-3 flex justify-between items-center">
        {/* LEFT TOOL */}
        <div className="">
          <Input type="text" placeholder="Search tasks..." />
        </div>

        {/* RIGHT TOOL */}
        <div className="flex justify-end items-center gap-3">
          <Button variant="outline" size="icon" aria-label="add">
            <CirclePlus />
          </Button>
          <Button variant="outline" size="icon" aria-label="remove">
            <Trash2 />
          </Button>
        </div>
      </div>

      {/*  */}
    </div>
  );
}
