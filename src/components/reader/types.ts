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

export type InlineObject = TypedObject & {
  marks: string[];
  text: string;
};
