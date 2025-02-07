"use client";
import { Plus, Search, X } from "lucide-react";
import { TaskProgress } from "./components";
import { useState } from "react";
import { TaskList } from "./components/tasks/TaskList";
import { useTaskContext } from "@/context/TaskContext";
import Link from "next/link";

export default function Home() {
  const { tasks } = useTaskContext();
  const [inputValue, setInputValue] = useState("");
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.done).length;
  const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  if (totalTasks === 0) {
    return (
      <div className="flex items-center justify-center flex-col h-[calc(100vh-4rem)] text-center">
        <p className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-gray-200">
          You don#39;t have any tasks yet
        </p>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Click on the <b>+</b> button to add one
        </p>
        <div className="hidden md:flex w-full justify-end">
          <Link
            href="/add"
            className=" fixed bottom-8 z-50 p-2.5 md:p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            aria-label="Add new task"
          >
            <Plus className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto mt-5 px-4 lg:px-8 space-y-6">
      {/* Task Progress */}
      <TaskProgress
        percentage={percentage}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
      />

      {/* Search Bar */}
      <div className="w-full border-[1px] border-[#B558FF] p-3 sm:p-4 flex items-center justify-between space-x-3 rounded-2xl shadow-sm">
        <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Search for task..."
          value={inputValue}
          onChange={handleInputChange}
        />
        {inputValue && (
          <X
            className="cursor-pointer hover:bg-red-50 text-red-500 rounded-full w-6 h-6 p-0.5 transition-all duration-200"
            onClick={handleClearInput}
          />
        )}
      </div>

      {/* Task List */}
      <div>
        <TaskList searchQuery={inputValue} />
      </div>

      {/* Floating Add Button */}
      <div className="hidden md:flex w-full justify-end">
        <Link
          href="/add"
          className=" fixed bottom-8 z-50 p-2.5 md:p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          aria-label="Add new task"
        >
          <Plus className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
