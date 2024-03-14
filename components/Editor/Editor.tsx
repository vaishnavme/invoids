import { forwardRef, useImperativeHandle, ForwardedRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import editorExtensions from "./Extension";
import EditorHoverMenu from "./Extension/EditorHoverMenu";

type IEditorProps = {
  content: string;
  // eslint-disable-next-line no-unused-vars
  onUpdate: (data: string) => void;
};

const Editor = forwardRef((props: IEditorProps, ref: ForwardedRef<any>) => {
  const { onUpdate, content } = props;

  const editor = useEditor({
    extensions: editorExtensions,
    content,
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
          editor.commands.insertContent(contentString);
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
