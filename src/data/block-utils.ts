import type { BlockObject, NormalBlockObject } from "./block-types";

export interface HeadingInfo {
  key: string;
  level: number;
  text: string;
}

export function getInnerText(block: NormalBlockObject): string {
  return block.children.map((span) => span.text).join("");
}

export function getHeadings(blocks: BlockObject[]): HeadingInfo[] {
  return blocks
    .filter(
      (block) =>
        block._type === "block" &&
        (block.style === "h1" || block.style === "h2")
    )
    .map((block) => ({
      key: block._key,
      level: (block as NormalBlockObject).style === "h1" ? 1 : 2,
      text: getInnerText(block as NormalBlockObject),
    }));
}
