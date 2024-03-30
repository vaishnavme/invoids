export type EditorProps = {
  onUpdate: (data: string) => void;
};

export type EditorRefMethods = {
  clearContent: () => void;
  setContent: (contentString: string) => void;
};
