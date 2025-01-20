import React from "react";
import { TaskItem } from "./TaskItem";
import { useTaskContext } from "@/context/TaskContext";
import { Task } from "@/app/type/task";
export const TaskList: React.FC = () => {
  // Fetch tasks from the global state
  const { tasks } = useTaskContext();

  return (
    <div className="task-list flex flex-col space-y-3">
      {tasks.length > 0 ? (
        tasks.map((task: Task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <p className="text-gray-500">
          No tasks available. Start by adding one!
        </p>
      )}
    </div>
  );
};
