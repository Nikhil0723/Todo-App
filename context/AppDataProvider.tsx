"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AppData, AppDataContext, Category } from "./AppDataContext";
import {
  getAppDataFromLocalStorage,
  saveAppDataToLocalStorage,
} from "@/app/utils/localStorage";

// Default app data (used as fallback when no data is in localStorage)
const defaultAppData: AppData = {
  username: undefined,
  profileImage: undefined,
  categories: [
    { id: "1", name: "Work", emoji: "😊", color: "#ff5733" },
    { id: "2", name: "Personal", emoji: "🏡", color: "#33ff57" },
    { id: "3", name: "Fitness", emoji: "🏋️", color: "#3357ff" },
  ],
  taskColors: ["#e843fe", "#ff5733", "#33ff57", "#3357ff", "#ffdf3d"],
};

interface AppDataProviderProps {
  children: React.ReactNode;
}

const isValidColor = (color: string) => /^#[0-9A-F]{6}$/i.test(color);

export const AppDataProvider: React.FC<AppDataProviderProps> = ({
  children,
}) => {
  const [appData, setAppData] = useState<AppData>(defaultAppData);

  useEffect(() => {
    const storedAppData = getAppDataFromLocalStorage();
    if (storedAppData) {
      setAppData(storedAppData);
    }
  }, []);

  // Save app data to localStorage whenever it changes
  useEffect(() => {
    saveAppDataToLocalStorage(appData);
  }, [appData]);

  // Update entire app data
  const updateAppData = (newData: Partial<AppData>) => {
    setAppData((prev) => ({ ...prev, ...newData }));
  };

  // Add a new category
  const addCategory = (category: Category) => {
    // Ensure ID is unique
    const isUnique = !appData.categories.some((cat) => cat.id === category.id);
    if (isUnique) {
      setAppData((prev) => ({
        ...prev,
        categories: [...prev.categories, category],
      }));
    } else {
      console.error("Category ID must be unique");
    }
  };

  // Edit an existing category
  const editCategory = (updatedCategory: Category) => {
    setAppData((prev) => ({
      ...prev,
      categories: prev.categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      ),
    }));
  };

  // Delete a category by ID
  const deleteCategory = (categoryId: string) => {
    setAppData((prev) => ({
      ...prev,
      categories: prev.categories.filter(
        (category) => category.id !== categoryId
      ),
    }));
  };

  // Add a task color with validation
  const addTaskColor = useCallback((color: string) => {
    if (isValidColor(color)) {
      setAppData((prev) => ({
        ...prev,
        taskColors: [...new Set([...prev.taskColors, color.toUpperCase()])],
      }));
    } else {
      console.error("Invalid color format");
    }
  }, []);

  return (
    <AppDataContext.Provider
      value={{
        appData,
        updateAppData,
        addCategory,
        editCategory,
        deleteCategory,
        addTaskColor,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
