import Editor from "@/components/Editor/Editor";
import { Textarea } from "@/components/UI/Textarea";
import useAutosizeTextArea from "@/hooks/useAutosizeTextarea";
import { debounce } from "@/lib/utils";
import { useRef, useState } from "react";

const Home = () => {
  const docTitleRef = useRef(null);

  const [docTitle, setDocTitle] = useState<string>("Untitled");
  const [docsBody, setDocsBody] = useState<string>("");

  useAutosizeTextArea(docTitleRef.current, docTitle);

  return (
    <div className="max-w-3xl w-full mx-auto p-6">
      <div className="w-full mb-4 ">
        <p className="text-sm font-medium text-center">{docTitle}</p>
      </div>
      <Textarea
        ref={docTitleRef}
        autoFocus
        defaultValue={docTitle}
        placeholder="Untitled"
        maxLength={180}
        onChange={(e) => setDocTitle(e.target.value)}
        className="text-3xl font-semibold w-full mb-4 h-0 outline-none border-none dark:border-none resize-none focus-visible:ring-transparent dark:focus-visible:ring-transparent"
      />
      <div className="mb-64 px-4">
        <Editor onUpdate={setDocsBody} />
      </div>
    </div>
  );
};

export default Home;
