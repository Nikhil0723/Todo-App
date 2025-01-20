import React, { useState } from "react";
import { Check, Clock5 } from "lucide-react";
import { TaskOptions } from "./TaskOptions";

import { Task } from "@/app/type/task";

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDone, setIsDone] = React.useState(false);
  const [isPinned, setIsPinned] = React.useState(false);

  const toggleDone = () => setIsDone((prev) => !prev);
  const togglePinned = () => setIsPinned((prev) => !prev);

  const fullDescription = task.description;
  const truncatedDescription = fullDescription.slice(0, 100);

  const handleToggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Green background for completed tasks */}

      {/* Main Task Item Container */}
      <div
        style={{ backgroundColor: task.color }}
        className={`relative z-10 rounded-3xl p-4  text-white flex items-center justify-between space-x-3 transition-all duration-300 ${
          task.done
            ? "ml-2 line-through opacity-80 border-l-8 border-[#41EC5D]"
            : ""
        } md:p-6 md:space-x-5`}
      >
        {/* Completion Toggle */}
        {task.done && (
          <div className="w-12 h-12 flex items-center justify-center bg-[#f0f0f0]  rounded-lg md:w-16 md:h-16 overflow-hidden cursor-pointer">
            <Check className="text-2xl text-white md:text-3xl" />
          </div>
        )}

        {/* Task Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-extrabold text-base md:text-xl">{task.name}</p>
            <p className=" text-sm md:text-sm ">
              {new Date(task.date).toLocaleTimeString()}
            </p>
          </div>
          <div>
            <p className="text-sm font-normal md:text-lg md:font-medium">
              {isExpanded ? fullDescription : `${truncatedDescription}...`}
            </p>
          </div>
          <button
            className="text-sm md:text-base font-extrabold mt-1"
            onClick={handleToggleDescription}
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
          <p className="text-xs md:text-sm mt-2 flex items-center space-x-2">
            <span>
              <Clock5 className="w-4 h-4 md:w-5 md:h-5" />
            </span>
            {new Date(task.deadline).toLocaleString()}
          </p>
        </div>

        {/* Options */}
        <div>
          <TaskOptions
            isDone={isDone}
            isPinned={isPinned}
            onToggleDone={toggleDone}
            onTogglePinned={togglePinned}
          />
        </div>
      </div>
    </div>
  );
};
