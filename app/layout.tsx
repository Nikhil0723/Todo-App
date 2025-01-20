import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components";
import { TaskProvider } from "@/context/TaskProvider";
import { AppDataProvider } from "@/context/AppDataProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-[#EDEEF6] ">
        <TaskProvider>
          <AppDataProvider>
            <div className=" max-w-screen-lg mx-auto">
              <Navbar />
              {children}
            </div>
          </AppDataProvider>
        </TaskProvider>
      </body>
    </html>
  );
}
