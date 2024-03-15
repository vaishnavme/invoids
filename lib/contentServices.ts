import Showdown from "showdown";
import matter from "gray-matter";

type FrontMatter = {
  title: string;
  slug: string;
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

  const markdown = text.makeMarkdown(body);

  const markdownString = `---\n${frontMatterString}\n---\n\n${markdown}`;

  return markdownString;
};

const contentService = {
  getHTMLText,
  getMarkdownString,
};

export default contentService;
