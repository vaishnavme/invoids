import { ReactNode, useEffect, useState } from "react";
import { BaseDirectory } from "@tauri-apps/api/fs";
import { Toaster } from "sonner";
import { inter } from "@/pages/_app";
import { appActions } from "@/redux/appSlice";
import { APP_CONFIG } from "@/lib/constant";
import tauriService from "@/lib/tauri.services";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import VerticalNavbar from "./VerticalNavbar";
import ThemeProvider from "./ThemeProvider";
import SidePanel from "./SidePanel";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const { children } = props;

  const dispatch = useAppDispatch();

  const { appConfig } = useAppSelector((state) => state.AppData);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);

  const initalizeApp = async () => {
    try {
      const fs = await tauriService.getFS();

      const result = await fs.readTextFile(APP_CONFIG, {
        dir: BaseDirectory.App,
      });

      const settingsConfig = JSON.parse(result);
      dispatch(appActions.init(settingsConfig));
    } catch {
      dispatch(appActions.toggleSettingsDialog(true));
    }
  };

  useEffect(() => {
    if (appConfig === null) {
      initalizeApp();
    }
  }, [appConfig]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={`${inter.variable} flex flex-row relative`}>
        <div className="fixed left-0 top-0 z-30">
          <VerticalNavbar
            isSidePanelOpen={isSidePanelOpen}
            setIsSidePanelOpen={setIsSidePanelOpen}
          />
        </div>

        <div className="w-full relative ml-11">
          <div className="h-8 border-b border-neutral-200 dark:border-neutral-700" />
          <main className="w-full flex flex-row h-[calc(100vh-32px)]">
            <SidePanel isSidePanelOpen={isSidePanelOpen} />
            <div className="w-full overflow-y-auto">{children}</div>
          </main>
        </div>
      </div>
      <Toaster richColors />
    </ThemeProvider>
  );
};

export default Layout;
