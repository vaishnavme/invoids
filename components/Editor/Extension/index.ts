import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Underline from "@tiptap/extension-underline";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import SlashCommand from "./SlashCommand";

const editorExtensions = [
  StarterKit.configure({
    codeBlock: false,
  }),
  SlashCommand,
  TaskItem,
  TaskList,
  Underline,
  CodeBlockLowlight.configure({
    lowlight: createLowlight(common),
    HTMLAttributes: {
      class: "hljs",
    },
  }),
  Placeholder.configure({
    placeholder: "Sketch, Write, Organize",
  }),
];

export default editorExtensions;
