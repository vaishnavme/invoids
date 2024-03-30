import Showdown from "showdown";
import matter from "gray-matter";
import { HEADINGS } from "./constant";
import { FrontMatter, TableOfContentElement } from "./types/content.types";

const text = new Showdown.Converter();

const getHTMLText = async (textBuffer: string) => {
  const { data, content } = matter(textBuffer);

  const html = await text.makeHtml(content);

  return {
    frontMatter: {
      title: data.title,
      createdAt: data?.createdAt || null,
      updatedAt: data?.updatedAt || null,
    },
    body: html,
  };
};

const getMarkdownString = async ({
  body,
  metaData,
}: {
  body: string;
  metaData: FrontMatter;
}) => {
  const frontMatterString = Object.keys(metaData)
    .map((key) => `${key}: ${metaData[key as keyof FrontMatter]}`)
    .join("\n");

  const markdown = text.makeMarkdown(body);

  const markdownString = `---\n${frontMatterString}\n---\n\n${markdown}`;

  return markdownString;
};

const getOverviewInfo = (textContent: string) => {
  const words = textContent.trim().split(/\s+/).length;
  const characters = textContent?.replaceAll(" ", "")?.length;

  const readTime = words > 0 ? Math.ceil(words / 200) : 0;

  return {
    words,
    characters,
    readTime,
  };
};

const getTableOfContentFromDOM = (domNode: HTMLElement) => {
  const rawHeadingTags = domNode?.querySelectorAll("h1, h2, h3, h4, h5, h6");

  const tableOfContent: TableOfContentElement[] = [];

  rawHeadingTags?.forEach((tag) => {
    const tagName = tag?.tagName;
    const tagInfo = HEADINGS[tagName as keyof typeof HEADINGS];
    const element = {
      text: tag?.textContent || null,
      ...tagInfo,
    };
    tableOfContent.push(element);
  });

  return tableOfContent;
};

const contentService = {
  getHTMLText,
  getMarkdownString,
  getOverviewInfo,
  getTableOfContentFromDOM,
};

export default contentService;
