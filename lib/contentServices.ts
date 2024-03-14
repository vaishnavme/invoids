import Showdown from "showdown";
import matter from "gray-matter";

type FrontMatter = {
  title: string;
  createdAt: number;
  updatedAt: number;
  [key: string]: string | number;
};

type GetMarkDownString = {
  body: string;
  metaData: FrontMatter;
};

const text = new Showdown.Converter();

const getHTMLText = async (textBuffer: string) => {
  const { data, content } = matter(textBuffer);

  const html = await text.makeHtml(content);

  return {
    frontMatter: data,
    body: html,
  };
};

const getMarkdownString = async ({ body, metaData }: GetMarkDownString) => {
  const frontMatterString = Object.keys(metaData)
    .map((key) => `${key}: ${metaData[key]}`)
    .join("\n");

  const markdownString = `---\n${frontMatterString}\n---\n\n${body}`;

  return markdownString;
};

const contentService = {
  getHTMLText,
  getMarkdownString,
};

export default contentService;
