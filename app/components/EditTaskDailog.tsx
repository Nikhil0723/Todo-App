import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Task } from "../type/task";
import { useAppData } from "@/context/AppDataContext";
import { useTaskContext } from "@/context/TaskContext";
import EmojiPicker from "emoji-picker-react"; // Import the emoji picker
import { SmilePlus } from "lucide-react"; // Import an icon for the emoji picker button

interface EditTaskDialogProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  task,
  isOpen,
  onClose,
}) => {
  const [updatedTask, setUpdatedTask] = useState<Task>(task);
  const [error, setError] = useState("");
  const { appData } = useAppData();
  const { updateTask } = useTaskContext();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false); // State to manage emoji picker visibility

  useEffect(() => {
    if (isOpen) {
      setUpdatedTask(task);
      setError("");
    }
  }, [isOpen, task]);

  const handleSave = () => {
    if (!updatedTask.name.trim()) {
      setError("Title is required");
      return;
    }

    // Prepare the updated task with proper ISO string dates
    const finalTask: Task = {
      ...updatedTask,
      name: updatedTask.name,
      description: updatedTask.description,
      emoji: updatedTask.emoji,
      deadline: updatedTask.deadline
        ? new Date(updatedTask.deadline).toISOString()
        : null,
      lastSave: new Date().toISOString(),
    };

    updateTask(finalTask);
    onClose();
  };

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUpdatedTask((prev) => ({
      ...prev,
      deadline: value ? new Date(value).toISOString() : null,
    }));
  };

  const handleEmojiSelect = (emoji: { emoji: string }) => {
    setUpdatedTask((prev) => ({ ...prev, emoji: emoji.emoji })); // Update the emoji in the task
    setIsEmojiPickerOpen(false); // Close the emoji picker after selection
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <Label htmlFor="emoji">Emoji</Label>
            <div className="flex items-center gap-2 mt-1">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsEmojiPickerOpen((prev) => !prev)}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  <SmilePlus className="h-5 w-5" />
                </button>
                {isEmojiPickerOpen && (
                  <div className="absolute z-10 mt-2">
                    <EmojiPicker
                      onEmojiClick={handleEmojiSelect}
                      className="max-w-sm"
                    />
                  </div>
                )}
              </div>
              {updatedTask.emoji && (
                <span className="text-2xl">{updatedTask.emoji}</span>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={updatedTask.name}
              onChange={(e) =>
                setUpdatedTask((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Task title"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={updatedTask.description || ""}
              onChange={(e) =>
                setUpdatedTask((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Task description"
              rows={3}
            />
          </div>

          {/* Deadline */}
          <div>
            <Label htmlFor="deadline">Due Date & Time</Label>
            <Input
              id="deadline"
              type="datetime-local"
              value={
                updatedTask.deadline
                  ? new Date(updatedTask.deadline).toISOString().slice(0, 16)
                  : ""
              }
              onChange={handleDateTimeChange}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          {/* Categories */}
          <div>
            <Label>Categories</Label>
            <div className="space-y-2 mt-2">
              {appData.categories.map((category) => (
                <div key={category.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`cat-${category.id}`}
                    checked={
                      updatedTask.category?.some((c) => c.id === category.id) ||
                      false
                    }
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setUpdatedTask((prev) => ({
                        ...prev,
                        category: isChecked
                          ? [...(prev.category || []), category]
                          : (prev.category || []).filter(
                              (c) => c.id !== category.id
                            ),
                      }));
                    }}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label
                    htmlFor={`cat-${category.id}`}
                    className="flex items-center gap-2"
                  >
                    <span>{category.emoji}</span>
                    <span>{category.name}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Task Color */}
          <div>
            <Label>Task Color</Label>
            <div className="flex items-center gap-2 mt-2">
              {appData.taskColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setUpdatedTask((prev) => ({ ...prev, color }))}
                  className={`h-8 w-8 rounded-full border-2 transition-colors ${
                    updatedTask.color === color
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Emoji */}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
