import type { Metadata } from "next";
import "./globals.css";
import { BottomMenuBar, DevelopmentAlert, Navbar } from "./components";
import { TaskProvider } from "@/context/TaskProvider";
import { AppDataProvider } from "@/context/AppDataProvider";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo App to make you day productive",
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
            <div className=" max-w-screen-lg mx-auto ">
              <Navbar />
              {children}
              <BottomMenuBar />
            </div>
          </AppDataProvider>
        </TaskProvider>
      </body>
    </html>
  );
}
