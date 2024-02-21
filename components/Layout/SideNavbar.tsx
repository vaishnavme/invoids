import {
  IconBookmarks,
  IconFolder,
  IconLayoutSidebarLeftExpand,
  IconMoonStars,
  IconPencilPlus,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";
import { Button } from "../UI/Button";
import ToggleTheme from "./ToggleTheme";

const navbarItems = [
  {
    label: "Create New",
    icon: <IconPencilPlus strokeWidth={1.5} size={20} />,
  },
  {
    label: "Folder",
    icon: <IconFolder strokeWidth={1.5} size={20} />,
  },
  {
    label: "Search",
    icon: <IconSearch strokeWidth={1.5} size={20} />,
  },
  {
    label: "Bookmarks",
    icon: <IconBookmarks strokeWidth={1.5} size={20} />,
  },
];

const SideNavbar = () => {
  return (
    <div className="h-screen w-11 bg-neutral-100 dark:bg-neutral-800 px-1 py-1.5 flex flex-col items-center justify-between border-r border-neutral-200 dark:border-neutral-700">
      <div className="flex flex-col items-center">
        <Button variant="ghost" size="icon" className="mb-6">
          <IconLayoutSidebarLeftExpand strokeWidth={1.5} size={20} />
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
        <Button
          variant="ghost"
          size="icon"
          aria-label="Settings"
          title="Settings"
          className="mb-2"
        >
          <IconSettings strokeWidth={1.5} size={20} />
        </Button>
      </div>
    </div>
  );
};

export default SideNavbar;
