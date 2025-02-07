"use client";
import React, { useState } from "react";
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
  PinOff,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTaskContext } from "@/context/TaskContext";
import { EditTaskDialog } from "../EditTaskDailog";
import { ShareTaskDialog } from "../ShareTaskDailog";
import { useAppData } from "@/context/AppDataContext";

interface TaskOptionsProps {
  taskId: string; // Accept only taskId as a prop
}

export const TaskOptions: React.FC<TaskOptionsProps> = ({ taskId }) => {
  const router = useRouter();
  const { appData } = useAppData();
  const {
    toggleTaskCompletion,
    removeTask,
    togglePinnedTask,
    duplicateTask,
    tasks,
  } = useTaskContext();
  const task = tasks.find((t) => t.id === taskId);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const showDetail = () => {
    router.push(`/task/${taskId}`); // Redirect to the task
  };

  const menuItems = task
    ? [
        {
          label: task.done ? "Mark as not Done" : "Mark as Done",
          icon: task.done ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />,
          action: () => toggleTaskCompletion(taskId),
        },
        {
          label: task.pinned ? "Unpin" : "Pin",
          icon: task.pinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />,
          action: () => togglePinnedTask(taskId),
        },
        {
          label: "Select",
          icon: <FileText className="w-4 h-4" />,
          action: () => {
            console.log("Select Task");
          },
        },
        {
          label: "Task Detail",
          icon: <FileText className="w-4 h-4" />,
          action: showDetail,
        },
        {
          label: "Read Aloud",
          icon: <Volume className="w-4 h-4" />,
          action: () => {
            console.log("Read Aloud");
          },
        },
        {
          label: "Share Task",
          icon: <Share2 className="w-4 h-4" />,
          action: () => setIsShareDialogOpen(true),
        },
        {
          label: "Edit",
          icon: <Edit className="w-4 h-4" />,
          action: () => setEditDialogOpen(true), // Open edit dialog
        },
        {
          label: "Duplicate",
          icon: <Repeat className="w-4 h-4" />,
          action: () => duplicateTask(taskId),
        },
        {
          label: "Delete",
          icon: <Trash2 className="w-4 h-4 text-red-500" />,
          action: () => removeTask(taskId),
        },
      ]
    : [];

  return (
    <>
      {/* Task Options Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="rounded-full w-8 h-8 flex items-center justify-center bg-opacity-0 bg-gray-100 hover:bg-opacity-15 transition-all duration-200"
            aria-label="Task options"
          >
            <HiOutlineDotsVertical className="text-lg md:text-xl" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="right"
          className="w-56 p-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col space-y-1">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-start space-x-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all duration-200"
                  size="sm"
                  onClick={item.action}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
                {/* Add separator for logical grouping */}
                {(index === 1 || index === 3 || index === 5) && (
                  <Separator className="my-1 bg-gray-200 dark:bg-gray-700" />
                )}
              </React.Fragment>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Edit Task Dialog */}
      {task && (
        <>
          <EditTaskDialog
            task={task}
            isOpen={isEditDialogOpen}
            onClose={() => setEditDialogOpen(false)}
          />
          <ShareTaskDialog
            task={task}
            userName={appData.username || "user"}
            isOpen={isShareDialogOpen}
            onClose={() => setIsShareDialogOpen(false)}
          />
        </>
      )}
    </>
  );
};