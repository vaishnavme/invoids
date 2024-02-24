import { Button } from "../UI/Button";
import ToggleTheme from "./ToggleTheme";
import Icon from "../UI/Icons";
import SettingsDialog from "../Settings/SettingDialog";

const navbarItems = [
  {
    label: "Create New",
    icon: <Icon.PencilPlus strokeWidth={1.5} size={20} />,
  },
  {
    label: "Folder",
    icon: <Icon.Folder strokeWidth={1.5} size={20} />,
  },
  {
    label: "Search",
    icon: <Icon.Search strokeWidth={1.5} size={20} />,
  },
  {
    label: "Bookmarks",
    icon: <Icon.Bookmarks strokeWidth={1.5} size={20} />,
  },
];

interface ISideNavProps {
  setOpenPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNavbar = (props: ISideNavProps) => {
  const { setOpenPanel } = props;

  return (
    <div className="h-screen w-11 bg-neutral-100 dark:bg-neutral-800 px-1 py-1.5 flex flex-col items-center justify-between border-r border-neutral-200 dark:border-neutral-700">
      <div className="flex flex-col items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpenPanel((prevState) => !prevState)}
          className="mb-6"
        >
          <Icon.LeftSidebar strokeWidth={1.5} size={20} />
        </Button>

        <div className="flex flex-col items-center">
          {navbarItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              size="icon"
              aria-label={item.label}
              className="mb-4"
              title={item.label}
            >
              {item.icon}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <ToggleTheme />
        <SettingsDialog>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Settings"
            title="Settings"
            className="mb-2"
          >
            <Icon.Settings strokeWidth={1.5} size={20} />
          </Button>
        </SettingsDialog>
      </div>
    </div>
  );
};

export default SideNavbar;
