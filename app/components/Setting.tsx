import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Setting = () => {
  return (
    <Dialog>
      <DialogTrigger className="w-full flex justify-start text-lg border-none font-medium p-4 py-3 shadow-none gap-3 rounded-xl text-white bg-black hover:bg-stone-700 hover:text-white">
        <Settings />
        Setting
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className=" flex flex-row items-center gap-4">
          <Settings size={50} className=" border p-3 rounded-2xl " />
          <div>
            <DialogTitle className="mb-2">Settings</DialogTitle>
            <DialogDescription>
              Manage your settings and preferences.
            </DialogDescription>
          </div>
        </DialogHeader>
        <Separator />
        <div>Setting</div>
      </DialogContent>
    </Dialog>
  );
};
