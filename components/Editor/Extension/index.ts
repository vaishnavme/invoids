import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import StarterKit from "@tiptap/starter-kit";
import SlashCommand from "./SlashCommand";

const editorExtensions = [
  StarterKit,
  SlashCommand,
  TaskItem,
  TaskList,
  Placeholder.configure({
    placeholder: "Sketch, Write, Organize",
  }),
];

export default editorExtensions;
