import { useEditor, EditorContent } from "@tiptap/react";
import editorExtensions from "./Extension";
import EditorHoverMenu from "./Extension/EditorHoverMenu";

const Editor = () => {
  const editor = useEditor({
    extensions: editorExtensions,
    editorProps: {
      attributes: {
        class: "prose focus:outline-none",
      },
    },
  });

  return (
    <>
      <EditorHoverMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
