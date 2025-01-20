"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handleGoHome = () => {
    router.push("/"); // Navigate to the home route
  };
  return (
    <div className="flex items-center justify-between mt-5 px-4 lg:px-8">
      <div>
        {pathname === "/" ? (
          <>
            <h2 className="font-bold text-2xl sm:text-3xl">👋 Good evening</h2>
            <p className="font-medium mt-1 text-sm sm:text-base">
              Get ready to make things happen!
            </p>
          </>
        ) : (
          <ArrowLeft className="text-xl sm:text-2xl cursor-pointer" onClick={handleGoHome} />
        )}
      </div>
      <div>
        <Sidebar />
      </div>
    </div>
  );
};
