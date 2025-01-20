"use client"
import { createContext, useContext } from "react";

// Define the structure of your app data
export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
}
export interface AppData {
  username: string;
  backgroundColor: string;
  profileImage: string;
  categories: Category[];
  taskColors: string[];
}

// Define a structure for the context value, which includes app data and the updater function
interface AppDataContextType {
  appData: AppData;
  updateAppData: (newData: Partial<AppData>) => void;
}

// Create a context with a default value of null
const AppDataContext = createContext<AppDataContextType | null>(null);

// Custom hook to use app data context
export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppDataProvider");
  }
  return context;
};

export default AppDataContext;
