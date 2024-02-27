import Editor from "@/components/Editor/Editor";
import { useState } from "react";

const Home = () => {
  const [docTitle, setDocTitle] = useState<string>("Untitled");

  return (
    <div className="max-w-3xl w-full mx-auto p-6">
      <div className="w-full mb-4 ">
        <p className="text-sm font-medium text-center">{docTitle}</p>
      </div>
      <textarea
        autoFocus
        defaultValue={docTitle}
        placeholder="Untitled"
        maxLength={280}
        onChange={(e) => setDocTitle(e.target.value)}
        className="text-3xl font-semibold w-full mb-6 outline-none resize-none"
      />
      <div className="mb-20">
        <Editor />
      </div>
    </div>
  );
};

export default Home;
