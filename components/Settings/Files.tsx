import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { BaseDirectory } from "@tauri-apps/api/fs";
import useStore from "@/store/store";

type FilesConfig = {
  folder: string;
  path: string;
};

const Files = () => {
  const { settingsConfig, updateSettingConfig } = useStore((state) => state);

  const [filesConfig, setFilesConfig] = useState<FilesConfig>({
    folder: "",
    path: "",
  });

  const selectFolderPath = async () => {
    const dialog = await import("@tauri-apps/api/dialog");

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
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong!");
    }
  };

  const saveSettings = async () => {
    const fs = await import("@tauri-apps/api/fs");
    const { folder, path } = filesConfig;
    if (!path || folder) return;
    try {
      const vaultPath = `${path}/${folder}`;

      await fs.createDir(vaultPath);

      await fs.createDir("", { dir: BaseDirectory.App, recursive: true });
      await fs.writeTextFile(
        "app.json",
        JSON.stringify({ path: vaultPath, folder: folder }),
        {
          dir: BaseDirectory.App,
        },
      );
      const payload = {
        path: vaultPath,
        folder,
      };
      updateSettingConfig(payload);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    setFilesConfig(settingsConfig);
  }, [settingsConfig]);

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

            <p className="text-xs text-gray-600 mt-2">
              {filesConfig.folder || "No folder selected"}
            </p>
          </div>
          <div>
            <Button size="sm" variant="outline" onClick={selectFolderPath}>
              Manage
            </Button>
          </div>
        </div>
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
