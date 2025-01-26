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
      // Add toast notification here if needed
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
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold">
            Share Task
          </DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <Tabs defaultValue="link" className="space-y-4 py-4">
          <TabsList className="flex justify-center">
            <TabsTrigger value="link" className="w-1/2">
              Link
            </TabsTrigger>
            <TabsTrigger value="qr" className="w-1/2">
              QR Code
            </TabsTrigger>
          </TabsList>

          {/* Tab Content - Link */}
          <TabsContent value="link">
            <div>
              <Label htmlFor="share-url" className="block text-sm font-medium">
                Share Link
              </Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  id="share-url"
                  value={shareUrl}
                  readOnly
                  className="flex-1"
                />
                <Button onClick={copyToClipboard} className="shrink-0">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Button
                variant="outline"
                className="w-28"
                onClick={() => shareOnPlatform("whatsapp")}
              >
                <FaWhatsapp className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                variant="outline"
                className="w-28"
                onClick={() => shareOnPlatform("twitter")}
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="w-28"
                onClick={() => shareOnPlatform("facebook")}
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                className="w-28"
                onClick={() => shareOnPlatform("email")}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </TabsContent>

          {/* Tab Content - QR Code */}
          <TabsContent value="qr">
            <div className="flex flex-col items-center">
              <Label className="block text-sm font-medium">QR Code</Label>
              <div className="p-4 bg-white rounded-lg shadow mt-4">
                <QRCodeSVG
                  value={shareUrl}
                  size={128}
                  level="H"
                  includeMargin
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
