import { Button } from "../UI/Button";
import { Input } from "../UI/input";
import { Label } from "../UI/label";

const Files = () => {
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
            <Button size="sm" variant="outline">
              Manage
            </Button>
          </div>
        </div>
      </div>

      <Button size="sm" variant="default" className=" self-end">
        Save
      </Button>
    </div>
  );
};

export default Files;
