import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { debounce, getFilePath, getSlug } from "@/lib/utils";
import { appActions, getAppConfig } from "@/redux/appSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Textarea } from "@/components/UI/Textarea";
import useAutosizeTextArea from "@/hooks/useAutosizeTextArea";
import contentService from "@/lib/contentServices";
import tauriService from "@/lib/tauri.services";
import DocsOverview from "@/components/Documents/DocsOverview";
import Editor from "@/components/Editor/Editor";
import { EditorRefMethods } from "@/lib/types/editor.types";
import { FrontMatter } from "@/lib/types/content.types";

const initialFrontmatterState = {
  title: "",
};

const Home = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const appConfig = useAppSelector(getAppConfig);

  const titleAreaRef = useRef(null);
  const contentAreaRef = useRef<EditorRefMethods>(null);

  const [frontMatter, setFrontmatter] = useState<FrontMatter>(
    initialFrontmatterState,
  );
  const [content, setContent] = useState<string>("");

  useAutosizeTextArea(titleAreaRef, frontMatter?.title || "");

  const loadExistingDocs = async (slug: string) => {
    try {
      const fs = await tauriService.getFS();

      const docsPath = getFilePath({
        basePath: appConfig.path,
        fileName: slug,
      });

      const response = await fs.readTextFile(docsPath);
      const { frontMatter: frontMatterData, body } =
        await contentService.getHTMLText(response);

      setFrontmatter(frontMatterData);
      setContent(body);
      contentAreaRef?.current?.setContent(body);
    } catch (err) {
      toast.error("Could not load note. Please try again later.");
    }
  };

  const autoSaveDocs = async (contentString: string) => {
    let file = null;
    let isNewFile = false;

    if (router?.query?.slug) {
      file = router.query.slug as string;
    } else {
      isNewFile = true;
      file = frontMatter?.title;
    }

    if (!file) return null;

    const fileSlug = isNewFile ? getSlug(file) : file;
    const filePath = getFilePath({
      basePath: appConfig.path,
      fileName: fileSlug,
    });

    try {
      const fs = await tauriService.getFS();
      const markdownString = await contentService.getMarkdownString({
        body: contentString,
        metaData: frontMatter,
      });

      setContent(contentString);

      await fs.writeTextFile(filePath, markdownString);

      if (isNewFile) {
        dispatch(
          appActions.addNewFile({ name: `${fileSlug}.md`, path: filePath }),
        );
        router.replace(`?slug=${fileSlug}`);
      }
    } catch (err) {
      toast.error("Could not auto save.");
    }
  };

  const handleContentString = debounce(
    (textContent) => autoSaveDocs(textContent as string),
    1200,
  );

  useEffect(() => {
    const slug = router?.query?.slug || "";

    if (slug) {
      loadExistingDocs(slug as string);
      return;
    }

    setFrontmatter(initialFrontmatterState);
    setContent("");
    contentAreaRef?.current?.clearContent();
  }, [router]);

  return (
    <div className="max-w-3xl w-full mx-auto p-6">
      <Textarea
        ref={titleAreaRef}
        autoFocus
        maxLength={180}
        placeholder="Untitled"
        value={frontMatter?.title || ""}
        onBlur={() => {
          autoSaveDocs(content);
        }}
        className="text-3xl font-semibold w-full mb-4 h-0 outline-none border-none dark:border-none resize-none focus-visible:ring-transparent dark:focus-visible:ring-transparent shadow-none"
        onChange={(e) => {
          setFrontmatter((prevState) => ({
            ...prevState,
            title: e.target.value,
          }));
        }}
      />

      <div id="editor" className="mb-64 px-4">
        <Editor
          ref={contentAreaRef}
          onUpdate={(contentString) => handleContentString(contentString)}
        />
      </div>

      {frontMatter?.title ? <DocsOverview frontMatter={frontMatter} /> : null}
    </div>
  );
};

export default Home;
