import { Task } from "../type/task";

export const LOCAL_STORAGE_KEY = "tasks";

export const getTasksFromLocalStorage = (): Task[] => {
  const tasks = localStorage.getItem(LOCAL_STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasksToLocalStorage = (tasks: Task[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};
