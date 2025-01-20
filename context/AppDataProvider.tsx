"use client"
import React, { useState } from "react";
import AppDataContext, { AppData } from "./AppDataContext";

// Define default app data values
const defaultAppData: AppData = {
  username: "John Doe",
  backgroundColor: "#f0f0f0",
  profileImage: "/path/to/image",
  categories: [
    { id: "0292cba5-f6e2-41c4-b5a7-c59a0aaecfe3", name: "Work", emoji: "1f3e2", color: "#248eff" },
    { id: "a47a4af1-d720-41eb-9121-d3728605a62b", name: "Personal", emoji: "1f464", color: "#e843fe" },
    { id: "393068a9-9db7-4dfa-a00f-cd359f8024e8", name: "Health/Fitness", emoji: "1f4aa", color: "#ffdf3d" },
  ],
  taskColors: [ "#e843fe","#248eff", "#ffdf3d"],
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
