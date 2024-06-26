import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BaseDirectory } from "@tauri-apps/api/fs";
import { appActions } from "@/redux/appSlice";
import tauriService from "@/lib/tauri.services";
import { APP_CONFIG } from "@/lib/constant";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";

type FilesConfig = {
  folder: string;
  path: string;
};

const Files = () => {
  const dispatch = useAppDispatch();

  const { appConfig } = useAppSelector((state) => state.AppData);

  const [filesConfig, setFilesConfig] = useState<FilesConfig>({
    folder: "",
    path: "",
  });

  const selectFolderPath = async () => {
    const dialog = await tauriService.getDialog();

    try {
      const result = await dialog.open({
        directory: true,
        multiple: false,
        defaultPath: ".",
        title: "Select Vault to Store Invoids files.",
      });

      setFilesConfig((prevState) => ({
        ...prevState,
        path: result as string,
      }));
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const saveSettings = async () => {
    const fs = await tauriService.getFS();

    const { folder, path } = filesConfig;

    if (!path || folder) return;

    try {
      const vaultPath = `${path}/${folder}`;

      await fs.createDir(vaultPath);

      await fs.createDir("", { dir: BaseDirectory.App, recursive: true });
      await fs.writeTextFile(
        APP_CONFIG,
        JSON.stringify({ path: vaultPath, folder }),
        {
          dir: BaseDirectory.App,
        },
      );
      const payload = {
        path: vaultPath,
        folder,
      };
      dispatch(appActions.updateAppConfig(payload));
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    setFilesConfig(appConfig);
  }, [appConfig]);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="w-full flex flex-col gap-y-8">
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="font-medium text-sm">Folder name</p>
          </div>
          <div>
            <Input
              id="folder-name"
              className="bg-white dark:bg-zinc-800"
              placeholder="Folder name"
              value={filesConfig.folder}
              onChange={(e) =>
                setFilesConfig((prevState) => ({
                  ...prevState,
                  folder: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          <div>
            <p className="font-medium text-sm">Select folder path</p>
            <p className="text-xs text-gray-500">
              Where notes, bookmarks are stored.
            </p>
          </div>
          <div>
            <Button size="sm" variant="outline" onClick={selectFolderPath}>
              Manage
            </Button>
          </div>
        </div>

        <p className="text-xs" title="Current Vault Path">
          {filesConfig?.path || "No folder selected"}
        </p>
      </div>

      <Button
        size="sm"
        variant="default"
        className="self-end"
        onClick={saveSettings}
      >
        Save
      </Button>
    </div>
  );
};

export default Files;
