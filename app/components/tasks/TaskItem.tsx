import React, { useState } from "react";
import { Check, Clock5 } from "lucide-react";
import { TaskOptions } from "./TaskOptions";
import { Task } from "@/app/type/task";

interface TaskItemProps {
  task: Task;
  searchQuery: string;
}

export const TaskItem = ({ task, searchQuery }: TaskItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const deadlineDate = task.deadline ? new Date(task.deadline) : null;

  const fullDescription = task.description || "";
  const truncatedDescription = fullDescription.slice(0, 100);

  const handleToggleDescription = () => {
    setIsExpanded((prev) => !prev);
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-blue-400">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative">
      {/* Main Task Item Container */}
      <div
        style={{ backgroundColor: task.color }}
        className={`relative z-10 rounded-3xl md:rounded-3xl p-3 text-white flex items-center justify-between space-x-3 transition-all duration-300 ${
          task.done
            ? " line-through opacity-80 border-l-8 border-[#41EC5D]"
            : ""
        } md:p-4 md:space-x-5`}
      >
        {/* Completion Toggle */}
        {task.done && (
          <div className="w-12 h-12 flex items-center justify-center bg-[#f0f0f0] rounded-lg md:w-16 md:h-16 overflow-hidden cursor-pointer">
            <Check className="text-2xl text-white md:text-3xl" />
          </div>
        )}

        {/* Task Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            {/* Highlighted Task Name */}
            <p className="font-bold text-base md:text-xl">
              {highlightText(task.name, searchQuery)}
            </p>
            <p className="text-sm md:text-sm">
              {new Date(task.date).toLocaleTimeString()}
            </p>
          </div>

          {/* Highlighted Task Description */}
          {task?.description?.length <= 100 && (
            <div>
              <p className="text-sm font-normal md:text-lg md:font-medium">
                {highlightText(task.description, searchQuery)}
              </p>
            </div>
          )}

          {task?.description?.length > 100 && (
            <>
              <div>
                <p className="text-sm font-normal md:text-lg md:font-medium">
                  {isExpanded
                    ? highlightText(fullDescription, searchQuery)
                    : highlightText(`${truncatedDescription}...`, searchQuery)}
                </p>
              </div>
              <button
                className="text-sm md:text-base font-extrabold mt-1"
                onClick={handleToggleDescription}
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            </>
          )}

          {/* Deadline */}
          {deadlineDate && (
            <p className="text-xs md:text-sm mt-2 flex items-center space-x-2">
              <span>
                <Clock5 className="w-4 h-4 mr-2 md:w-5 md:h-5" />
              </span>
              {deadlineDate?.toLocaleString()}
            </p>
          )}
        </div>

        {/* Options */}
        <div>
          <TaskOptions taskId={task.id} />
        </div>
      </div>
    </div>
  );
};
