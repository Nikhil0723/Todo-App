import React, { useState } from "react";
import { Check, Clock5 } from "lucide-react";
import { TaskOptions } from "./TaskOptions";
import { Task } from "@/app/type/task";
import { MdPushPin } from "react-icons/md";

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
        <span key={index} className="bg-blue-400 rounded">
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
        className={`relative z-10 rounded-3xl p-4 text-white flex items-center justify-between space-x-4 transition-all duration-300 shadow-lg ${
          task.done ? "opacity-80 border-l-8 border-[#41EC5D]" : ""
        }`}
      >
        {/* Completion Toggle */}
        {task.done && (
          <div className="flex items-center justify-center bg-[#f0f0f0] bg-opacity-50 rounded-2xl md:w-16 md:h-16 overflow-hidden cursor-pointer">
            {task.emoji ? (
              <span className="text-2xl text-white md:text-3xl p-4">
                {task.emoji}
              </span>
            ) : (
              <Check
                className="text-2xl text-white md:text-3xl p-4"
                size={53}
              />
            )}
          </div>
        )}

        {/* Task Content */}
        <div className="flex-1 space-y-2">
          {/* Pinned Status */}
          {task.pinned && (
            <div className="flex items-center gap-2 text-xs md:text-sm opacity-75  px-2 py-1 rounded-full">
              <MdPushPin size={16} />
              <span>Pinned</span>
            </div>
          )}

          {/* Task Name */}
          <div className="flex items-center justify-between">
            <p
              className={`font-bold text-base md:text-lg ${
                task.done ? "line-through opacity-70" : ""
              }`}
            >
              {highlightText(task.name, searchQuery)}
            </p>
            <p className="text-xs md:text-sm opacity-70">
              {new Date(task.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Task Description */}
          {task?.description?.length > 0 && (
            <>
              <div>
                <p
                  className={`text-sm md:text-base ${
                    task.done ? "line-through opacity-70" : ""
                  }`}
                >
                  {isExpanded
                    ? highlightText(fullDescription, searchQuery)
                    : highlightText(`${truncatedDescription}...`, searchQuery)}
                </p>
              </div>
              {task?.description?.length > 100 && (
                <button
                  className="text-xs md:text-sm font-semibold text-blue-200 hover:underline"
                  onClick={handleToggleDescription}
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              )}
            </>
          )}

          {/* Deadline */}
          {deadlineDate && (
            <div className="flex items-center space-x-2 text-xs md:text-sm opacity-70">
              <Clock5 className="w-4 h-4" />
              <span>{deadlineDate.toLocaleString()}</span>
            </div>
          )}

          {/* Categories */}
          {task.category && task.category.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-2">
              {task.category.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs md:text-sm font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: category.color,
                    color: "#fff",
                  }}
                >
                  <span>
                    {category.emoji.startsWith("1f") &&
                    category.emoji.length === 5
                      ? String.fromCodePoint(parseInt(category.emoji, 16))
                      : category.emoji}
                  </span>
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Options */}
        <div className="flex-shrink-0">
          <TaskOptions taskId={task.id} />
        </div>
      </div>
    </div>
  );
};
