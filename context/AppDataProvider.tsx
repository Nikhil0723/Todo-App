"use client"
import React, { useState } from "react";
import AppDataContext, { AppData } from "./AppDataContext";

// Define default app data values
const defaultAppData: AppData = {
  username: "John Doe",
  backgroundColor: "#ffffff",
  profileImage: "https://example.com/profile.jpg",
  categories: ["Work", "Personal", "Health/Fitness"],
  taskColors: ["#FF5733", "#33FF57", "#3357FF"]
};

// The AppDataProvider component that provides app data globally
interface AppDataProviderProps {
  children: React.ReactNode;
}

export const AppDataProvider: React.FC<AppDataProviderProps> = ({ children }) => {
  const [appData, setAppData] = useState<AppData>(defaultAppData);

  // Function to update app data
  const updateAppData = (newData: Partial<AppData>) => {
    setAppData(prev => ({ ...prev, ...newData }));
  };

  return (
    <AppDataContext.Provider value={{ appData, updateAppData }}>
      {children}
    </AppDataContext.Provider>
  );
};
