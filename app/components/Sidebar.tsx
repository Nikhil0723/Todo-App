"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Image from "next/image";
import {
  IoMdCreate,
  IoMdFolderOpen,
  IoMdList,
  IoMdSwap,
  IoMdTrash,
} from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { Setting } from "./Setting";
import { Logout } from "./Logout";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";
import { useAppData } from "@/context/AppDataContext";
import { MenuButton } from "./MenuButton";

export const Sidebar = () => {
  const { appData } = useAppData();

  const menuItems = [
    {
      label: "Menu Tasks",
      icon: <IoMdList size={24} />,
      route: "/", // Adjust route as needed
    },
    {
      label: "Create Task",
      icon: <IoMdCreate size={24} />,
      route: "/add",
    },
    {
      label: "Categories",
      icon: <IoMdFolderOpen size={24} />,
      route: "/categories",
    },
    {
      label: "Delete Tasks",
      icon: <IoMdTrash size={24} />,
      route: "/delete",
    },
    {
      label: "Transfer Tasks",
      icon: <IoMdSwap size={24} />,
      route: "/transfer-tasks",
    },
  ];

  return (
    <div>
      {/* Sheet Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Avatar className="h-12 w-12 cursor-pointer">
            <AvatarImage src={appData?.profileImage} />
            <AvatarFallback>
              <CircleUser className="text-blue-600" />
            </AvatarFallback>
          </Avatar>
        </SheetTrigger>

        {/* Sheet Content */}
        <SheetContent
          side="right"
          className="rounded-l-3xl p-6 bg-white dark:bg-gray-900 shadow-lg"
        >
          {/* Header Section */}
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/Logo.png"
              height={53}
              width={53}
              alt="logo"
              className="rounded-full"
            />
            <h1 className="font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-200">
              <span className="text-[#B558FF]">Todo</span> App.
            </h1>
          </div>

          {/* Menu Section */}
          <div className="space-y-2">
            {menuItems.map((menu) => (
              <MenuButton
                key={menu.label}
                title={menu.label}
                icon={menu.icon}
                route={menu.route}
              />
            ))}
          </div>

          <Separator className="my-5 bg-gray-200 dark:bg-gray-700" />

          {/* Logout and Settings Section */}
          <div className="flex flex-col gap-2">
            <Logout />
            <Setting />
          </div>

          <Separator className="my-5 bg-gray-200 dark:bg-gray-700" />

          {/* User Section */}
          <Link href="/user">
            <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-gray-700 dark:text-gray-300 bg-zinc-200 dark:bg-gray-800 hover:bg-zinc-100 dark:hover:bg-gray-700 transition-all duration-200">
              <User className="w-5 h-5" />
              <span>User</span>
            </div>
          </Link>

          <Separator className="my-5 bg-gray-200 dark:bg-gray-700" />

          {/* Footer Section */}
          <div className="text-xs text-center mt-4 text-gray-500 dark:text-gray-400">
            <p>
              Made with ❤️ by{" "}
              <a
                href="https://github.com/Nikhil0723"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-bold hover:underline"
              >
                nikhil0723
              </a>
            </p>
            <p>Last update: 2 January 2025 at 4:58:07 am</p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
