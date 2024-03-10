import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Editor from "@/components/Editor/Editor";
import { Textarea } from "@/components/UI/Textarea";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import contentService from "@/lib/contentServices";
import { toast } from "sonner";

const Home = () => {
  const router = useRouter();

  const { appConfig } = useSelector((state) => state.AppData);

  const docTitleRef = useRef(null);
  const docsBodyRef = useRef(null);

  const [docTitle, setDocTitle] = useState<string>("Untitled");
  const [docsBody, setDocBody] = useState<string>("");

  useAutosizeTextArea(docTitleRef.current, docTitle);

  const loadExistingNote = async (fileName: string) => {
    const fs = await import("@tauri-apps/api/fs");

    const filePath = `${appConfig.path}/${fileName}.md`;

    try {
      const response = await fs.readTextFile(filePath);
      const { frontMatter, body } = await contentService.getHTMLText(response);

      setDocTitle(frontMatter.title);
      setDocBody(body);
    } catch (err) {
      toast.error("Could not load note. Please try again later.");
    }
  };

  const handleDocBodyUpdate = (textContent: string) => setDocBody(textContent);

  useEffect(() => {
    const slug = (router?.query?.slug as string) || "";
    if (slug) {
      loadExistingNote(slug);
    } else {
      setDocTitle("Untitled");
      setDocBody("");
      docsBodyRef?.current?.clearContent();
    }
  }, [router]);

  return (
    <div className="max-w-3xl w-full mx-auto p-6">
      <div className="w-full mb-4 ">
        <p className="text-sm font-medium text-center">{docTitle}</p>
      </div>
      <Textarea
        ref={docTitleRef}
        autoFocus
        value={docTitle}
        placeholder="Untitled"
        maxLength={180}
        onChange={(e) => setDocTitle(e.target.value)}
        className="text-3xl font-semibold w-full mb-4 h-0 outline-none border-none dark:border-none resize-none focus-visible:ring-transparent dark:focus-visible:ring-transparent shadow-none"
      />
      <div className="mb-64 px-4">
        <Editor
          ref={docsBodyRef}
          content={docsBody}
          onUpdate={(data) => handleDocBodyUpdate(data)}
        />
      </div>
    </div>
  );
};

export default Home;
