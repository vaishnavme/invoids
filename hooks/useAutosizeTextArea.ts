import React, { useEffect } from "react";

const useAutosizeTextArea = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  value: string,
) => {
  useEffect(() => {
    if (textAreaRef.current) {
      const currentRef = textAreaRef.current;
      currentRef.style.height = "0px";
      const scrollHeight = currentRef?.scrollHeight;
      currentRef.style.height = `${scrollHeight}px`;
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
