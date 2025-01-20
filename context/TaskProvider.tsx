"use client"
import React, { useState, useEffect } from "react";
import TaskContext, { Task } from "./TaskContext";

// Function to get tasks from local storage (or default empty array if none exist)
const getTasksFromLocalStorage = (): Task[] => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

// Function to save tasks to local storage
const saveTasksToLocalStorage = (tasks: Task[]): void => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// The TaskProvider component that provides task data globally
interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Load tasks from local storage on initial render
    const storedTasks = getTasksFromLocalStorage();
    setTasks(storedTasks);
  }, []);

  // Function to add a task
  const addTask = (task: Task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Function to remove a task
  const removeTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  // Function to update a task
  const updateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
