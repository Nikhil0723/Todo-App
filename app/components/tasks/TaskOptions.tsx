import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  Pin,
  FileText,
  Volume,
  Share2,
  Edit,
  Repeat,
  Trash2,
} from "lucide-react";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  action: () => void; // Action to perform on button click
}

interface TaskOptionsProps {
  isDone: boolean;
  isPinned: boolean;
  onToggleDone: () => void;
  onTogglePinned: () => void;
}

export const TaskOptions: React.FC<TaskOptionsProps> = ({
  isDone,
  isPinned,
  onToggleDone,
  onTogglePinned,
}) => {
  const menuItems: MenuItem[] = [
    {
      label: isDone ? "Mark as Not Done" : "Mark as Done",
      icon: <Check />,
      action: onToggleDone, // Use the prop function
    },
    {
      label: isPinned ? "Unpin" : "Pin",
      icon: <Pin />,
      action: onTogglePinned, // Use the prop function
    },
    {
      label: "Select",
      icon: <FileText />,
      action: () => {
        console.log("Select Task");
      },
    },
    {
      label: "Task Detail",
      icon: <FileText />,
      action: () => {
        console.log("Task Details");
      },
    },
    {
      label: "Read Loud",
      icon: <Volume />,
      action: () => {
        console.log("Read Loud");
      },
    },
    {
      label: "Share",
      icon: <Share2 />,
      action: () => {
        console.log("Share Task");
      },
    },
    {
      label: "Edit",
      icon: <Edit />,
      action: () => {
        console.log("Edit Task");
      },
    },
    {
      label: "Duplicate",
      icon: <Repeat />,
      action: () => {
        console.log("Duplicate Task");
      },
    },
    {
      label: "Delete",
      icon: <Trash2 />,
      action: () => {
        console.log("Delete Task");
      },
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded-full hover:bg-gray-200">
          <HiOutlineDotsVertical className="text-lg md:text-2xl" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="right"
        className="w-48 p-2 bg-white shadow-lg rounded-lg"
      >
        <div className="flex flex-col space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start space-x-2"
                size="sm"
                onClick={item.action} // Dynamically handle actions
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>{" "}
                {/* Ensure left-aligned */}
              </Button>
              {index === 1 || index === 3 || index === 5 ? (
                <Separator className="my-1" />
              ) : null}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
