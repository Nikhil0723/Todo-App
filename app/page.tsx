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
      <div className="flex items-center justify-center flex-col h-[calc(100vh-4rem)]">
        <p className=" font-bold text-xl ">You don&#39;t have any tasks yet</p>
        <p>
          Click on the <b>+</b> button to add one
        </p>
        <div className=" sm:hidden md:block">
          <Link
            href="/add"
            className=" md:fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50  p-3 md:p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            aria-label="Add new task"
          >
            <Plus className="size-8 md:size-10" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-md h-6 mx-auto mt-5 px-4 lg:px-8">
      <TaskProgress
        percentage={percentage}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
      />

      <div className="w-full border-[1px] border-[#B558FF] p-4 flex items-center justify-between space-x-3 rounded-2xl my-5">
        <Search />
        <input
          type="text"
          className="flex-1 bg-transparent outline-none"
          placeholder="Search for task..."
          value={inputValue}
          onChange={handleInputChange}
        />
        {inputValue && (
          <X
            className="cursor-pointer hover:bg-red-50 text-red-500 rounded-full text-xl p-0.5"
            onClick={handleClearInput}
          />
        )}
      </div>

      <div>
        <TaskList searchQuery={inputValue} />
      </div>
      <div className=" sm:hidden md:block">
        <Link
          href="/add"
          className=" md:fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50  p-3 md:p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          aria-label="Add new task"
        >
          <Plus className="size-8 md:size-10" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
