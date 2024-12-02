import { createElement } from "react";
import { BlockObject } from "./types";
import { InlineRenderer } from "./InlineRenderer";

export interface BlockRendererProps {
  block: BlockObject;
}

export interface BlockquoteRendererProps {
  blocks: BlockObject[];
}

export interface ListRendererProps {
  blocks: BlockObject[];
  listStyle: BlockObject["listItem"];
}

function ParagraphRenderer(props: BlockRendererProps) {
  const block = props.block as BlockObject;
  const { children, markDefs } = block;

  const childNodes = children.map((obj) => (
    <InlineRenderer object={obj} markDefs={markDefs} />
  ));

  const { style, _key } = block;
  if (
    style === "h1" ||
    style === "h2" ||
    style === "h3" ||
    style === "h4" ||
    style === "h5"
  ) {
    return createElement(
      style,
      { id: _key },
      <a href={`#${_key}`}>{childNodes}</a>
    );
  }

  return <p>{childNodes}</p>;
}

export function BlockquoteRenderer(props: BlockquoteRendererProps) {
  const { blocks } = props;
  return (
    <blockquote>
      {blocks.map((block) => (
        <ParagraphRenderer block={block} />
      ))}
    </blockquote>
  );
}

export function ListRenderer(props: ListRendererProps) {
  const { blocks, listStyle } = props;

  return createElement(
    listStyle === "number" ? "ol" : "ul",
    undefined,
    blocks.map((block) => (
      <li>
        <ParagraphRenderer block={block} />
      </li>
    ))
  );
}

export function BlockRenderer(props: BlockRendererProps) {
  const { block } = props;
  if (block._type === "block") {
    return <ParagraphRenderer block={block} />;
  }

  return null;
}
