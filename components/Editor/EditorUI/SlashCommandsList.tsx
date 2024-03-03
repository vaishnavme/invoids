/* eslint-disable react/display-name */
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { type Editor, type Range } from "@tiptap/core";
import Icon from "@/components/UI/Icons";
import { debounce } from "@/lib/utils";

type CommandTypes = {
  editor: Editor;
  range: Range;
};

interface ISlashCommand {
  editor: Editor;
  range: Range;
  query?: string;
}

const suggestedCommands = [
  {
    title: "Text",
    description: "Just start writing plain text.",
    icon: <Icon.Typography />,
    command: ({ editor, range }: CommandTypes) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .run();
    },
  },
  {
    title: "Heading 1",
    description: "Big section heading.",
    icon: <Icon.Heading1 />,
    command: ({ editor, range }: CommandTypes) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    icon: <Icon.Heading2 />,
    command: ({ editor, range }: CommandTypes) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    icon: <Icon.Heading3 />,
    command: ({ editor, range }: CommandTypes) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
  },
  {
    title: "To-do list",
    description: "Track list with to-do list.",
    icon: <Icon.CheckList />,
    command: ({ editor, range }: CommandTypes) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Bulleted list",
    description: "Create simple bulleted list.",
    icon: <Icon.BulletList />,
    command: ({ editor, range }: CommandTypes) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered list",
    description: "Create list with numbering.",
    icon: <Icon.NumberList />,
    command: ({ editor, range }: CommandTypes) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Quote",
    description: "Capture a quote.",
    icon: <Icon.Blockquote />,
    command: ({ editor, range }: CommandTypes) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode("paragraph", "paragraph")
        .toggleBlockquote()
        .run();
    },
  },
  {
    title: "Code",
    description: "Capture a code snippet.",
    icon: <Icon.Codeblock />,
    command: ({ editor, range }: CommandTypes) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    title: "Divider",
    description: "Visually divide blocks.",
    icon: <Icon.Separator />,
    command: ({ editor, range }: CommandTypes) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
];

const SlashCommandsList = forwardRef((props: ISlashCommand, ref) => {
  const { editor, range, query } = props;

  const commandsRef = useRef([]);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [allCommands, setAllCommands] = useState(suggestedCommands);

  const triggerCommand = (index: number) => {
    const suggestedCommand = allCommands[index];
    if (!suggestedCommand) return;

    suggestedCommand.command({ editor, range });
  };

  const upHandler = () =>
    setSelectedIndex(
      (selectedIndex + allCommands.length - 1) % allCommands.length
    );

  const downHandler = () =>
    setSelectedIndex((selectedIndex + 1) % allCommands.length);

  const enterHandler = () => triggerCommand(selectedIndex);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: any) => {
      switch (event.key) {
        case "ArrowUp":
          upHandler();
          return true;

        case "ArrowDown":
          downHandler();
          return true;

        case "Enter":
          enterHandler();
          return true;

        default:
          return false;
      }
    },
  }));

  const searchCommands = (searchQuery: string) => {
    const updatedCommandsList = allCommands.filter((option) =>
      option.title.toLowerCase().includes(searchQuery)
    );
    setAllCommands(updatedCommandsList);
  };

  const filterCommands = useCallback(
    debounce((searchQuery) => searchCommands(searchQuery), 100),
    []
  );

  useEffect(() => {
    if (query) filterCommands(query);
  }, [query, filterCommands]);

  return (
    <div className="dark:bg-neutral-800 bg-white  dark:border-neutral-600 border w-64 max-h-80 overflow-y-auto rounded-lg p-1 shadow-lg">
      <>
        {allCommands?.length > 0 ? (
          <div>
            {allCommands.map((option, index) => {
              if (selectedIndex === index) {
                // @ts-ignore
                commandsRef.current[selectedIndex]?.scrollIntoView({
                  block: "nearest",
                });
              }

              return (
                <button
                  key={option.title}
                  type="button"
                  ref={(element) => {
                    // @ts-ignore
                    commandsRef.current[index] = element;
                  }}
                  onClick={() => option.command({ editor, range })}
                  className={`dark:hover:bg-neutral-700 hover:bg-slate-100 w-full rounded ${
                    selectedIndex === index
                      ? "dark:bg-neutral-700 bg-slate-100"
                      : ""
                  }`}
                >
                  <div className="flex items-center px-3 py-2 gap-x-2">
                    {option.icon}
                    <div className="text-left">
                      <p className="text-sm">{option.title}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="px-3 py-2 text-sm">No Comand Found</div>
        )}
      </>
    </div>
  );
});

export default SlashCommandsList;
