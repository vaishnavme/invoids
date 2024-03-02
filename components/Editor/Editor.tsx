import { useEditor, EditorContent } from "@tiptap/react";
import editorExtensions from "./Extension";
import EditorHoverMenu from "./Extension/EditorHoverMenu";

type IEditorProps = {
  onUpdate: (data: any) => void;
};

const Editor = (props: IEditorProps) => {
  const { onUpdate } = props;

  const editor = useEditor({
    extensions: editorExtensions,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onUpdate(html);
    },
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
