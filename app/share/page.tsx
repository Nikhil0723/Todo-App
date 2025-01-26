"use client";

import { useEffect, useState } from "react";
import { Task } from "../type/task";
import { MdPushPin } from "react-icons/md";
import { Clock5 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTaskContext } from "@/context/TaskContext";
import { useRouter } from "next/navigation";

export default function SharePage() {
  const { addTask } = useTaskContext();
  const [task, setTask] = useState<Task | null>(null);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const taskParam = params.get("task");
    const userNameParam = params.get("userName");

    if (taskParam) {
      try {
        // Decode the task using decodeURIComponent
        const decodedTask = decodeURIComponent(taskParam);
        setTask(JSON.parse(decodedTask));
      } catch (error) {
        console.error("Error decoding task:", error);
      }
    }

    if (userNameParam) {
      setUserName(decodeURIComponent(userNameParam));
    }
  }, []);

  const deadlineDate = task?.deadline ? new Date(task.deadline) : null;

  const handleAddTask = () => {
    if (task) {
      addTask(task);
    }
    router.push("/");
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4"> {userName} shared this task</h1>
      <div className="relative">
        {/* Main Task Item Container */}
        <div
          style={{ backgroundColor: task.color }}
          className={`relative z-10 rounded-3xl md:rounded-3xl p-3 text-white flex items-center justify-between space-x-3 transition-all duration-300 ${
            task.done ? "  opacity-80 border-l-8 border-[#41EC5D]" : ""
          } md:p-4 md:space-x-5`}
        >
          {/* Completion Toggle */}

          {/* Task Content */}
          <div className="flex-1">
            {task.pinned && (
              <div className="flex items-center gap-2 text-xs md:text-base opacity-75 p-1 rounded-full">
                <MdPushPin size={20} />
                Pinned
              </div>
            )}
            <div className="flex items-center justify-between">
              {/* Highlighted Task Name */}
              <p
                className={`font-bold text-base md:text-xl ${
                  task.done ? "line-through" : ""
                }`}
              >
                {task.name}
              </p>
              <p className="text-sm md:text-sm ">
                {new Date(task.date).toLocaleTimeString()}
              </p>
            </div>

            {/* Highlighted Task Description */}

            <div>
              <p
                className={`text-sm font-normal md:text-lg md:font-medium ${
                  task.done ? "line-through" : ""
                }`}
              >
                {task.description}
              </p>
            </div>

            {/* Deadline */}
            {deadlineDate && (
              <p className="text-xs md:text-sm mt-2 flex items-center space-x-2">
                <span>
                  <Clock5 className="w-4 h-4 mr-2 md:w-5 md:h-5" />
                </span>
                {deadlineDate?.toLocaleString()}
              </p>
            )}

            <div className=" flex items-center gap-2 justify-start flex-wrap mt-3">
              {/* Categories */}
              {task.category &&
                task.category.length > 0 &&
                task.category.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2 px-2 py-1 md:py-2 md:px-4 rounded-3xl border-[1px]"
                    style={{ backgroundColor: category.color }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: category.color }}
                    >
                      <p className="text-white text-xs md:text-sm font-bold ">
                        {category.emoji.startsWith("1f") &&
                        category.emoji.length === 5
                          ? String.fromCodePoint(parseInt(category.emoji, 16))
                          : category.emoji}
                        {category.name}
                      </p>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-end gap-5 mt-5">
        <Button onClick={() => router.push("/")}>Decline</Button>
        <Button onClick={handleAddTask}>Add Task</Button>
      </div>
    </div>
  );
}