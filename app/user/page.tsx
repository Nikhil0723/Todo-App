"use client";

import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CircleUser, PlusCircle, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/context/AppDataContext";
import { Logout } from "../components/Logout";

const ProfileCard = () => {
  const { appData, updateAppData } = useAppData()
  const [imageUrl, setImageUrl] = useState("");
  const [newUsername, setNewUsername] = useState("");

  // Handle profile image update
  const handleSaveImage = () => {
    updateAppData({ profileImage: imageUrl });
    setImageUrl(""); // Clear input
  };

  // Handle username update
  const handleSaveUsername = () => {
    if (newUsername.trim() !== "") {
      updateAppData({ username: newUsername });
      setNewUsername(""); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center relative">
        
        {/* Avatar with fallback */}
        <Avatar className="h-24 w-24">
          {appData.profileImage ? (
            <AvatarImage src={appData.profileImage} alt="Profile" />
          ) : (
            <AvatarFallback>
              <CircleUser className="h-24 w-24 text-blue-400" />
            </AvatarFallback>
          )}
        </Avatar>

        {/* Add Image Icon (Opens Dialog) */}
        <Dialog>
          <DialogTrigger className="absolute top-4 right-4">
            <PlusCircle className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900" />
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Image URL</DialogTitle>
            </DialogHeader>
            <Input 
              type="text" 
              placeholder="Paste image URL here..." 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
            />
            <Button onClick={handleSaveImage} className="mt-2 w-full">
              Save Image
            </Button>
          </DialogContent>
        </Dialog>

        {/* Username with Edit Icon */}
        <div className="mt-4 flex items-center gap-2">
          <h2 className="text-xl font-semibold text-gray-800">{appData.username || "User"}</h2>
          
          {/* Edit Username Dialog */}
          <Dialog>
            <DialogTrigger>
              <Pencil className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-900" />
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Username</DialogTitle>
              </DialogHeader>
              <Input 
                type="text" 
                placeholder="Enter new username..." 
                value={newUsername} 
                onChange={(e) => setNewUsername(e.target.value)} 
              />
              <Button onClick={handleSaveUsername} className="mt-2 w-full">
                Save Username
              </Button>
            </DialogContent>
          </Dialog>
        </div>
        <div>
            <Logout/>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
