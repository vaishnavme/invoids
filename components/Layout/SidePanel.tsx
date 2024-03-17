import tauriService from "@/lib/tauri.services";
import { appActions, getAllFiles, getAppConfig } from "@/redux/appSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "sonner";

interface SidePanelProps {
  isSidePanelOpen: boolean;
}

const SidePanel = (props: SidePanelProps) => {
  const { isSidePanelOpen } = props;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const appConfig = useAppSelector(getAppConfig);
  const allFiles = useAppSelector(getAllFiles);

  const loadFileContent = async () => {
    const fs = await tauriService.getFS();

    try {
      const response = await fs.readDir(appConfig?.path || "");

      const files = response?.filter(
        (file: { name: string }) => !file?.name?.startsWith(".")
      );

      dispatch(appActions.upsertFiles(files));
    } catch (err) {
      toast.error(`Could load existing notes from vault: ${appConfig.name}`);
    }
  };

  useEffect(() => {
    if (appConfig) {
      loadFileContent();
    }
  }, [appConfig]);

  return (
    <aside
      className={`bg-neutral-50 p-0.5 dark:bg-neutral-800 dark:border-neutral-700 border-neutral-200 shrink-0 transition-all ease-in-out flex flex-col items-start duration-300 ${
        isSidePanelOpen
          ? "border-r translate-x-0 w-64"
          : "w-0 border-transparent -translate-x-64 z-0"
      }`}
    >
      {allFiles.map((note) => {
        const fileName = note.name.replace(".md", "");

        return (
          <button
            type="button"
            key={note.name}
            className={`px-2 py-1.5 focus:ring-2 outline-none rounded-sm hover:bg-neutral-200 dark:hover:bg-neutral-900 w-full text-left mb-0.5 ${router?.query?.slug === fileName ? "bg-neutral-200 dark:bg-neutral-900" : "bg-neutral-50 dark:bg-neutral-800"}`}
            onClick={() => {
              if (note.name) {
                router.push(`?slug=${fileName}`);
              }
            }}
          >
            <p className="truncate text-xs">{note.name}</p>
          </button>
        );
      })}
    </aside>
  );
};

export default SidePanel;
