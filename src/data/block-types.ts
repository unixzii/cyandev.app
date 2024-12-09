export type TypedObject<T extends string = string, Props = {}> = {
  _key: string;
  _type: T;
} & Props;

export type MarkDef =
  | TypedObject<
      "link",
      {
        href: string;
      }
    >
  | TypedObject;

export type InlineObject = TypedObject<
  "span",
  {
    marks: string[];
    text: string;
  }
>;

export type NormalBlockObject = TypedObject<
  "block",
  {
    style: string;
    children: InlineObject[];
    markDefs: MarkDef[];
    listItem?: "number" | "bullet";
  }
>;

export type CodeBlockObject = TypedObject<
  "code",
  {
    language: string;
    code: string;
    highlightedLines?: number[];
  }
>;

export type ImageObject = TypedObject<
  "image",
  {
    asset: {
      _ref: string;
      _type: string;
    };
  }
>;

export type BlockObject = NormalBlockObject | CodeBlockObject | ImageObject;
