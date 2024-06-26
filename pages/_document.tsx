import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white text-black dark:bg-neutral-950 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
