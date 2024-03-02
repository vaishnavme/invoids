import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";

const Files = () => {
  const [folderName, setFolderName] = useState<string | null>(null);
  const [folderPath, setFolderPath] = useState<string | null>(null);

  const selectFolderPath = async () => {
    const dialog = await import("@tauri-apps/api/dialog");
    try {
      const result = await dialog.open({
        directory: true,
        multiple: false,
        defaultPath: ".",
      });

      setFolderPath(result as string | null);
    } catch (err: any) {
      toast(err?.message || "Something went wrong!");
    }
  };

  const saveSettings = async () => {
    const fs = await import("@tauri-apps/api/fs");
    try {
      const vaultPath = `${folderPath}/${folderName}`;
      await fs.createDir(vaultPath);
    } catch (err: any) {
      toast(err?.message || "Something went wrong!");
    }
  };

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
              onChange={(e) => setFolderName(e.target.value)}
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
              {folderPath || "No folder selected"}
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
