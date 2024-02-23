import { ReactNode, useState } from "react";
import SideNavbar from "./SideNavbar";
import { ThemeProvider } from "./ThemeProvider";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const { children } = props;

  const [openPanel, setOpenPanel] = useState<boolean>(false);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex flex-row bg-white text-black dark:bg-neutral-950 dark:text-white">
        <SideNavbar setOpenPanel={setOpenPanel} />
        <div
          className={`h-screen bg-neutral-100 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-all ${
            openPanel ? "w-64" : "w-0 border-transparent"
          }`}
        ></div>
        <main>{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
