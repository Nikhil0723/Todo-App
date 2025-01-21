"use client";
import { Category } from "@/app/type/task";
import { createContext, useContext } from "react";

// Define the structure of a task

export interface Task {
  id: string;
  emoji: string;
  done: boolean;
  pinned: boolean;
  name: string;
  description: string;
  color: string;
  date: string;
  deadline: string | null;
  category: Category[];
  lastSave: string;
}

// Create the context with the correct types (task list and actions)
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  updateTask: (updatedTask: Task) => void;
  toggleTaskCompletion: (taskId: string) => void;
  deleteSelectedTasks: (selectedIds: string[]) => void;
  deleteDoneTasks: () => void;
  deleteAllTasks: () => void;
  togglePinnedTask: (taskId: string) => void;
  duplicateTask: (taskId: string) => void;
}

// Create a context for task data and task actions
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Custom hook to use task context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export default TaskContext;
