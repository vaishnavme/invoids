import { ReactNode, useState } from "react";
import SideNavbar from "./SideNavbar";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "../UI/Sonner";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const { children } = props;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex flex-row bg-white text-black dark:bg-neutral-950 dark:text-white relative">
        <div className=" fixed left-0 top-0">
          <SideNavbar />
        </div>
        <main className="w-full">
          <div className="h-8 border-b border-neutral-200 dark:border-neutral-700" />
          {children}
        </main>
      </div>
      <Toaster />
    </ThemeProvider>
  );
};

export default Layout;
