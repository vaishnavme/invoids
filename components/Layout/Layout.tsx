import { ReactNode, useState } from "react";
import SideNavbar from "./SideNavbar";
import { ThemeProvider } from "./ThemeProvider";
import { inter } from "@/pages/_app";
import { Toaster } from "sonner";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const { children } = props;

  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={`${inter.variable} flex flex-row relative`}>
        <div className="fixed left-0 top-0">
          <SideNavbar
            isSidePanelOpen={isSidePanelOpen}
            setIsSidePanelOpen={setIsSidePanelOpen}
          />
        </div>

        <div className="w-full relative ml-11">
          <div className="h-8 border-b border-neutral-200 dark:border-neutral-700" />
          <main className="w-full flex flex-row h-[calc(100vh-32px)]">
            <div
              className={`bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700  border-neutral-200 shrink-0 transition-all ease-in-out ${
                isSidePanelOpen ? "w-64 border-r" : "w-0 border-transparent"
              }`}
            />
            <div className="w-full overflow-y-auto">{children}</div>
          </main>
        </div>
      </div>
      <Toaster richColors />
    </ThemeProvider>
  );
};

export default Layout;
