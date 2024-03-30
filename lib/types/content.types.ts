export type FrontMatter = {
  title: string;
  createdAt?: number;
  updatedAt?: number;
};

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface Heading {
  tag: string;
  level: HeadingLevel;
}

export interface Headings {
  H1: Heading;
  H2: Heading;
  H3: Heading;
  H4: Heading;
  H5: Heading;
  H6: Heading;
}

interface TagInfo {
  tag: string;
  level: number;
}

export type TableOfContentElement = {
  text: string | null;
} & TagInfo;
