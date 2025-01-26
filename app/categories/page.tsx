"use client";

import React, { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Check, Edit, Plus, SmilePlus, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";

const Categories: React.FC = () => {
  const { appData, addCategory, editCategory, deleteCategory, addTaskColor } =
    useAppData();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string>("😊");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState(appData.taskColors[0]);
  const [newColor, setNewColor] = useState("#3b82f6");

  // Handle emoji selection
  const handleEmojiSelect = (emojiObject: EmojiClickData) => {
    setEmoji(emojiObject.emoji);
    setIsEmojiPickerOpen(false);
  };

  // Reset inputs
  const resetInputs = () => {
    setSelectedCategory(null);
    setEmoji("😊");
    setName("");
    setSelectedColor(appData.taskColors[0]);
    setIsEditing(false);
  };

  // Handle save category (add or update)
  const handleSaveCategory = () => {
    if (!name.trim()) {
      alert("Category name cannot be empty.");
      return;
    }

    if (isEditing && selectedCategory) {
      editCategory({ id: selectedCategory, emoji, name, color: selectedColor });
    } else {
      const newCategory = {
        id: crypto.randomUUID(),
        emoji,
        name,
        color: selectedColor,
      };
      addCategory(newCategory);
    }
    resetInputs();
  };

  // Handle edit
  const handleEditCategory = (categoryId: string) => {
    const category = appData.categories.find((cat) => cat.id === categoryId);
    if (category) {
      setSelectedCategory(categoryId);
      setEmoji(category.emoji);
      setName(category.name);
      setSelectedColor(category.color);
      setIsEditing(true);
    }
  };

  // Handle delete
  const handleDeleteCategory = (categoryId: string) => {
    deleteCategory(categoryId);
    if (selectedCategory === categoryId) resetInputs();
  };

  // Handle add new color
  const handleAddNewColor = () => {
    addTaskColor(newColor); // Add the new color to the task colors
    setSelectedColor(newColor); // Set the new color as the selected color
  };

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto w-full m-10">
      <h2 className="text-xl font-bold">Manage Categories</h2>

      {/* Scrollable Category List */}
      <div className="h-60 overflow-y-auto border p-4 rounded shadow-md space-y-3">
        {appData.categories.map((category) => (
          <div
            key={category.id}
            className="flex justify-between items-center p-2 rounded hover:bg-gray-100"
            style={{ backgroundColor: `${category.color}` }}
          >
            <div className="flex items-center space-x-3 px-4 py-1">
              <span className="text-4xl">{category.emoji}</span>
              <span className="font-semibold">{category.name}</span>
            </div>
            <div className="space-x-2">
              <button
                className="text-blue-500 bg-white p-2 rounded-full"
                onClick={() => handleEditCategory(category.id)}
              >
                <Edit />
              </button>
              <button
                className="text-red-500 p-2 bg-white rounded-full"
                onClick={() => handleDeleteCategory(category.id)}
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      <div className="space-y-4 my-20">
        <h1 className="text-center font-extrabold text-2xl">
          {isEditing ? "Edit Category" : "Add New Category"}
        </h1>

        {/* Emoji Picker */}
        <div className="flex items-center justify-center space-x-3">
          <div>
            <div
              className="text-6xl cursor-pointer text-center"
              onClick={() => setIsEmojiPickerOpen((prev) => !prev)}
            >
              {emoji || <SmilePlus size={52} />}
            </div>
            {isEmojiPickerOpen && (
              <div className="absolute z-10">
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </div>
            )}
          </div>
        </div>

        {/* Category Name Input */}
        <input
          type="text"
          className="border rounded px-4 py-2 w-full"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Color Selector */}
        <div>
          <Label htmlFor="color">Task Color</Label>
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap gap-2">
              {appData.taskColors.map((color) => (
                <div
                  key={color}
                  className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-2 ${
                    selectedColor === color
                      ? "border-gray-500"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                >
                  {selectedColor === color && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </div>
              ))}
            </div>

            {/* Add New Color Button */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <div className="space-y-4">
                  <HexColorPicker color={newColor} onChange={setNewColor} />
                  <Button onClick={handleAddNewColor} className="w-full">
                    Add Color
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex-auto"
            onClick={handleSaveCategory}
          >
            {isEditing ? "Update Category" : "Create Category"}
          </button>
          {isEditing && (
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded flex-auto"
              onClick={resetInputs}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
