// app/type/task.ts
export interface Category {
    id: string;
    name: string;
    emoji: string;
    color: string;
  }
  
  export interface Task {
    id: string;
    done: boolean;
    pinned: boolean;
    name: string;
    description: string;
    color: string;
    date: string;
    deadline: string;
    category: Category[];
    lastSave: string;
  }
  