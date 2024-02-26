import { useEditor, EditorContent } from "@tiptap/react";
import editorExtensions from "./Extension";

const Editor = () => {
  const editor = useEditor({
    extensions: editorExtensions,
    editorProps: {
      attributes: {
        class: "prose focus:outline-none",
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default Editor;
