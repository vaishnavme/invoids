import { useEffect, useState } from "react";
import contentService from "@/lib/contentServices";
import {
  FrontMatter,
  TableOfContentElement,
} from "@/lib/types/content.service.types";

interface OverviewInfo {
  words: number;
  characters: number;
  readTime: number;
  tableOfContent: TableOfContentElement[];
}

interface DocsOverviewProps {
  frontMatter: FrontMatter;
}

const DocsOverview = (props: DocsOverviewProps) => {
  const { frontMatter } = props;

  const [overviewInfo, setOverviewInfo] = useState<OverviewInfo>({
    words: 0,
    characters: 0,
    readTime: 0,
    tableOfContent: [],
  });

  const getDocumentOverview = () => {
    const editorView = document.getElementById("editor");
    const tableOfContent = contentService.getTableOfContentFromDOM(
      editorView as HTMLElement,
    );

    const textContent = editorView?.innerText;
    if (!textContent) return;

    const { words, characters, readTime } =
      contentService.getOverviewInfo(textContent);

    setOverviewInfo({
      words,
      characters,
      readTime,
      tableOfContent,
    });
  };

  useEffect(() => {
    getDocumentOverview();
  }, [frontMatter]);

  return (
    <div className="">
      <aside className="w-72 h-screen bg-white dark:bg-neutral-900 fixed right-0 top-0 shadow overflow-y-auto">
        <div className="h-8 border-b border-neutral-200 dark:border-neutral-700 flex items-center px-4 mb-6">
          <p className="text-sm">Document Overview</p>
        </div>
        <div className="p-4">
          <div className="border rounded-2xl p-2 bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 mb-6">
            <div className="bg-white dark:bg-neutral-700 p-2 rounded-lg border relative border-neutral-200 dark:border-neutral-700">
              <p className="font-medium ">{frontMatter?.title || "Untitled"}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 text-center text-sm mb-10">
            <div>
              {overviewInfo.characters}
              <p className="text-xs">Words</p>
            </div>
            <div>
              {overviewInfo.words}
              <p className="text-xs">Words</p>
            </div>
            <div>
              <p>
                ~{overviewInfo.readTime}
                <span className="text-xs"> min</span>
              </p>

              <p className="text-xs">Read time</p>
            </div>
          </div>

          <div className="text-sm mb-10">
            <p className="font-medium text-base mb-4">Table of content</p>
            <ul>
              {overviewInfo.tableOfContent.map((toc) => (
                <li
                  key={`${toc.text}-${toc.level}`}
                  className="py-1 bg-neutral-100 dark:bg-neutral-800 px-2 mb-0.5 text-ms rounded list-none"
                >
                  <p>{toc.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DocsOverview;
