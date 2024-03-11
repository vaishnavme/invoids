import { type Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";
import Icon from "@/components/UI/Icons";
import { Toggle } from "@/components/UI/Toggle";

interface IEditorHoverMenu {
  editor: Editor | null;
}

const EditorHoverMenu = (props: IEditorHoverMenu) => {
  const { editor } = props;

  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="p-1 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700 flex flex-row items-center gap-x-1 shadow"
    >
      <Toggle asChild size="sm" pressed={editor.isActive("bold")}>
        <button
          type="button"
          aria-label="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Icon.Bold size={18} />
        </button>
      </Toggle>

      <Toggle asChild size="sm" pressed={editor.isActive("italic")}>
        <button
          type="button"
          aria-label="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Icon.Italic size={18} />
        </button>
      </Toggle>

      <Toggle asChild size="sm" pressed={editor.isActive("strike")}>
        <button
          type="button"
          aria-label="Strike Through"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Icon.StrikeThrough size={18} />
        </button>
      </Toggle>

      <Toggle asChild size="sm" pressed={editor.isActive("underline")}>
        <button
          type="button"
          aria-label="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Icon.Underline size={18} />
        </button>
      </Toggle>

      <Toggle asChild size="sm" pressed={editor.isActive("code")}>
        <button
          type="button"
          aria-label="Codeblock"
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Icon.Codeblock size={18} />
        </button>
      </Toggle>
    </BubbleMenu>
  );
};

export default EditorHoverMenu;
