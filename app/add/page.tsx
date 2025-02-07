"use client";
import React, { useState } from "react";
import { useAppData } from "@/context/AppDataContext";
import { useTaskContext } from "@/context/TaskContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { v4 as uuidv4 } from "uuid";
import EmojiPicker from "emoji-picker-react";
import { SmilePlus, Plus, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";

const CreateTaskForm = () => {
  const router = useRouter();
  const { appData, addTaskColor } = useAppData();
  const { addTask } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(appData.taskColors[0]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [deadline, setDeadline] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [error, setError] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
  const [newColor, setNewColor] = useState("#3b82f6");

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen((prev) => !prev);
  };

  const handleEmojiSelect = (emoji: { emoji: string }) => {
    setSelectedEmoji(emoji.emoji);
    setIsEmojiPickerOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    const deadlineDate = deadline ? new Date(deadline) : null;
    const newTask = {
      id: uuidv4(),
      emoji: selectedEmoji,
      name: title,
      description,
      color: selectedColor,
      done: false,
      pinned: false,
      date: new Date().toISOString(),
      deadline: deadlineDate ? deadlineDate.toISOString() : null,
      lastSave: new Date().toISOString(),
      category: selectedCategories.map((id) => {
        const matchedCategory = appData.categories.find((cat) => cat.id === id);
        return (
          matchedCategory || {
            id,
            name: "Unknown",
            emoji: "❓",
            color: "#000000",
          }
        );
      }),
    };
    addTask(newTask);
    // Clear form
    setTitle("");
    setDescription("");
    setSelectedColor(appData.taskColors[0]);
    setSelectedCategories([]);
    setDeadline("");
    setSelectedEmoji("");
    setError("");
    router.push("/");
  };

  const handleAddNewColor = () => {
    addTaskColor(newColor);
    setSelectedColor(newColor);
  };

  return (
    <div className="max-w-md mx-auto p-4 sm:p-6">
      {/* Card Container */}
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
          Create New Task
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {/* Emoji Picker */}
        <div className="flex items-center justify-center space-x-3">
          <div
            className="text-6xl cursor-pointer text-center transition-transform hover:scale-110"
            onClick={toggleEmojiPicker}
          >
            {selectedEmoji || <SmilePlus size={52} />}
          </div>
          {isEmojiPickerOpen && (
            <div className="absolute z-50 mt-2">
              <EmojiPicker
                onEmojiClick={handleEmojiSelect}
                className="max-w-sm mx-auto m-4 top-0"
              />
            </div>
          )}
        </div>

        {/* Title Input */}
        <div>
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
            className="mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Description Input */}
        <div>
          <Label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category Selection */}
        <div>
          <Label htmlFor="categories" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Categories
          </Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {appData.categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center space-x-2 p-1 rounded-md transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{ backgroundColor: category.color }}
              >
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                  className="dark:text-gray-200"
                />
                <Label htmlFor={category.id} className="text-sm text-gray-800 dark:text-gray-200">
                  {category.name}{" "}
                  <span className="ml-1" style={{ color: category.color }}>
                    {category.emoji.startsWith("1f") && category.emoji.length === 5
                      ? String.fromCodePoint(parseInt(category.emoji, 16))
                      : category.emoji}
                  </span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Deadline Input */}
        <div>
          <Label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Deadline
          </Label>
          <Input
            type="datetime-local"
            id="deadline"
            value={deadline || ""}
            onChange={(e) => setDeadline(e.target.value || null)}
            className="mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Task Color */}
        <div>
          <Label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Task Color
          </Label>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex flex-wrap gap-2">
              {appData.taskColors.map((color) => (
                <div
                  key={color}
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all"
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
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                <div className="space-y-4">
                  <HexColorPicker color={newColor} onChange={setNewColor} />
                  <Button
                    onClick={handleAddNewColor}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all"
                  >
                    Add Color
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all"
        >
          Create Task
        </Button>
      </div>
    </div>
  );
};

export default CreateTaskForm;