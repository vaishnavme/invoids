import { ReactNode, useState } from "react";
import { Button } from "../UI/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../UI/Dialog";
import General from "./General";
import Files from "./Files";
import Editor from "./Editor";
import dynamic from "next/dynamic";

interface ISettingProps {
  children: ReactNode;
}

const general = "general";
const files = "files";
const editor = "editor";

const settingsOption = [general, files, editor];

const SettingsDialog = (props: ISettingProps) => {
  const { children } = props;

  const [selectedOption, setSelectedOption] = useState<string>(general);

  const renderSettingComponent = (componentOption: string) => {
    switch (componentOption) {
      case general:
        return <General />;

      case files:
        return <Files />;

      case editor:
        return <Editor />;

      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="tracking-wide">Settings</DialogTitle>
        </DialogHeader>

        <div className="flex flex-row gap-x-4 h-96">
          <div className="flex flex-col gap-y-1 w-52">
            {settingsOption.map((option) => (
              <Button
                key={option}
                size="sm"
                onClick={() => setSelectedOption(option)}
                variant={option === selectedOption ? "outline" : "ghost"}
                className="justify-start capitalize"
              >
                {option}
              </Button>
            ))}
          </div>
          <div className="bg-neutral-100 dark:bg-neutral-900 w-full rounded-xl p-4">
            {renderSettingComponent(selectedOption)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default dynamic(() => Promise.resolve(SettingsDialog), {
  ssr: false,
});
