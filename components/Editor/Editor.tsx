import { useEditor, EditorContent } from "@tiptap/react";
import editorExtensions from "./Extension";
import EditorHoverMenu from "./Extension/EditorHoverMenu";
import { useEffect } from "react";

type IEditorProps = {
  content: string;
  onUpdate: (data: any) => void;
};

const Editor = (props: IEditorProps) => {
  const { onUpdate, content } = props;

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

  useEffect(() => {
    if (editor && editor.isEmpty && content !== "") {
      editor.commands.insertContent(content);
    }
  }, [editor, content]);

  return (
    <>
      <EditorHoverMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
