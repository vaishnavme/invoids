import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Sketch, Write, Organize",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default Editor;
