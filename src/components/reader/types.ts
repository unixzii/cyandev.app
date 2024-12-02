export type TypedObject = {
  _key: string;
  _type: string;
};

export type BlockObject = TypedObject & {
  style: string;
  children: InlineObject[];
  markDefs: TypedObject[];
  listItem?: "number" | "bullet";
};

export type CodeBlockObject = TypedObject & {
  language: string;
  code: string;
  highlightedLines?: number[];
};

export type ImageObject = TypedObject & {
  asset: {
    _ref: string;
    _type: string;
  };
};

export type InlineObject = TypedObject & {
  marks: string[];
  text: string;
};
