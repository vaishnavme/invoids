import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { BaseDirectory, FileEntry } from "@tauri-apps/api/fs";
import { Toaster, toast } from "sonner";
import { inter } from "@/pages/_app";
import { appActions } from "@/redux/appSlice";
import { ThemeProvider } from "./ThemeProvider";
import SideNavbar from "./SideNavbar";

interface ILayoutProps {
  children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const { children } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const { appConfig } = useSelector((state) => state.AppData);

  const [allNotes, setAllNotes] = useState<FileEntry[]>([]);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);

  const initalizeApp = async () => {
    const fs = await import("@tauri-apps/api/fs");

    try {
      const result = await fs.readTextFile("app.json", {
        dir: BaseDirectory.App,
      });

      const settingsConfig = JSON.parse(result);

      dispatch(appActions.init(settingsConfig));
    } catch {
      dispatch(appActions.toggleSettingsDialog(true));
    }
  };

  const loadFileContent = async () => {
    const fs = await import("@tauri-apps/api/fs");
    try {
      const response = await fs.readDir(appConfig.path);

      const files = response?.filter((file) => !file?.name?.startsWith("."));

      setAllNotes(files);
    } catch (err) {
      toast.error(`Could load existing notes from vault: ${appConfig.name}`);
    }
  };

  useEffect(() => {
    if (appConfig === null) {
      initalizeApp();
    } else {
      loadFileContent();
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
              className={`bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 border-neutral-200 shrink-0 transition-all ease-in-out flex flex-col items-center ${
                isSidePanelOpen ? "w-64 border-r" : "w-0 border-transparent"
              }`}
            >
              {allNotes.map((note) => (
                <button
                  type="button"
                  key={note.name}
                  className="px-2 py-1 rounded"
                  onClick={() => {
                    if (note.name) {
                      router.push(`?slug=${note.name.replace(".md", "")}`);
                    }
                  }}
                >
                  <p className="truncate text-xs">{note.name}</p>
                </button>
              ))}
            </div>
            <div className="w-full overflow-y-auto">{children}</div>
          </main>
        </div>
      </div>
      <Toaster richColors />
    </ThemeProvider>
  );
};

export default Layout;
