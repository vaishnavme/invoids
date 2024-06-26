import { forwardRef, useImperativeHandle, ForwardedRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { EditorProps } from "@/lib/types/editor.types";
import editorExtensions from "./Extension";
import EditorHoverMenu from "./Extension/EditorHoverMenu";

const Editor = forwardRef((props: EditorProps, ref: ForwardedRef<any>) => {
  const { onUpdate } = props;

  const editor = useEditor({
    extensions: editorExtensions,
    onUpdate: ({ editor: editorInstance }) => {
      const html = editorInstance.getHTML();
      onUpdate(html);
    },
    editorProps: {
      attributes: {
        class: "prose focus:outline-none",
      },
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      clearContent: () => {
        if (editor) {
          editor.commands.clearContent();
        }
      },
      setContent: (contentString: string) => {
        if (editor) {
          editor.commands.setContent(contentString);
        }
      },
    }),
    [editor],
  );

  return (
    <>
      <EditorHoverMenu editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
});

export default Editor;
