"use client";
import { Search, X } from "lucide-react";
import { TaskProgress } from "./components";
import { useState } from "react";
import { TaskList } from "./components/tasks/TaskList";
import { useTaskContext } from "@/context/TaskContext";

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

  return (
    <div className="  max-w-screen-md h-6 mx-auto  mt-5 px-4 lg:px-8">
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
        <TaskList />
      </div>
    </div>
  );
}
