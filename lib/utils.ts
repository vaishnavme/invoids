import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Func = (...args: unknown[]) => void;

function debounce(func: Func, delay: number): Func {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: unknown, ...args: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

const getSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

const getFilePath = ({
  basePath,
  fileName,
}: {
  basePath: string;
  fileName: string;
}) => `${basePath}/${fileName}.md`;

export { cn, debounce, getSlug, getFilePath };
