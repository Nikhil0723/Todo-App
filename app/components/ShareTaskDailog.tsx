"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Facebook, Mail, Twitter } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Task } from "../type/task";

interface ShareTaskDialogProps {
  task: Task;
  userName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareTaskDialog: React.FC<ShareTaskDialogProps> = ({
  task,
  userName,
  isOpen,
  onClose,
}) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/share";
  // Encode the task object using encodeURIComponent
  const encodedTask = encodeURIComponent(JSON.stringify(task));
  const shareUrl = `${baseUrl}?task=${encodedTask}&userName=${encodeURIComponent(
    userName
  )}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareOnPlatform = (platform: string) => {
    const message = `Check out this task from ${userName}: ${shareUrl}`;
    switch (platform) {
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(message)}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            message
          )}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        );
        break;
      case "email":
        window.open(
          `mailto:?subject=Shared Task&body=${encodeURIComponent(message)}`,
          "_blank"
        );
        break;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold text-gray-800 dark:text-gray-200">
            Share Task
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <Tabs defaultValue="link" className="space-y-4 py-4">
          <TabsList className="flex justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
            <TabsTrigger
              value="link"
              className="w-1/2 p-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 rounded-tl-md"
            >
              Link
            </TabsTrigger>
            <TabsTrigger
              value="qr"
              className="w-1/2 p-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 rounded-tr-md"
            >
              QR Code
            </TabsTrigger>
          </TabsList>

          {/* Tab Content - Link */}
          <TabsContent value="link">
            <div>
              <Label htmlFor="share-url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Share Link
              </Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  id="share-url"
                  value={shareUrl}
                  readOnly
                  className="flex-1 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button
                  onClick={copyToClipboard}
                  className="shrink-0 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Button
                variant="outline"
                className="w-28 bg-green-500 text-white hover:bg-green-600 transition-all duration-200"
                onClick={() => shareOnPlatform("whatsapp")}
              >
                <FaWhatsapp className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                className="w-28 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200"
                onClick={() => shareOnPlatform("twitter")}
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="w-28 bg-blue-700 text-white hover:bg-blue-800 transition-all duration-200"
                onClick={() => shareOnPlatform("facebook")}
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                className="w-28 bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
                onClick={() => shareOnPlatform("email")}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </TabsContent>

          {/* Tab Content - QR Code */}
          <TabsContent value="qr">
            <div className="flex flex-col items-center space-y-4">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                QR Code
              </Label>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <QRCodeSVG
                  value={shareUrl}
                  size={200} // Reduced size for better responsiveness
                  level="H" // High error correction
                  includeMargin
                />
              </div>
              <Button
                onClick={copyToClipboard}
                className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};