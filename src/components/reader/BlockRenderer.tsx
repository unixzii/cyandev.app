import { createElement } from "react";
import {
  BlockObject,
  NormalBlockObject,
  CodeBlockObject,
  ImageObject,
} from "@/data/block-types";
import { InlineRenderer } from "./InlineRenderer";
import { CodeBlockRenderer } from "./CodeBlockRenderer";
import { ImageRenderer } from "./ImageRenderer";

export interface BlockRendererProps {
  containerKey: string | null;
  block: BlockObject;
}

export interface BlockquoteRendererProps {
  containerKey: string | null;
  blocks: NormalBlockObject[];
}

export interface ListRendererProps {
  containerKey: string | null;
  blocks: NormalBlockObject[];
  listStyle: NormalBlockObject["listItem"];
}

function ParagraphRenderer(props: {
  containerKey?: string | null;
  block: NormalBlockObject;
}) {
  const { block } = props;
  const { children, markDefs } = block;

  const childNodes = children.map((obj) => (
    <InlineRenderer key={obj._key} object={obj} markDefs={markDefs} />
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
        <ParagraphRenderer key={block._key} block={block} />
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
      <li key={block._key}>
        <ParagraphRenderer block={block} />
      </li>
    ))
  );
}

export function BlockRenderer(props: BlockRendererProps) {
  const { containerKey, block } = props;
  if (block._type === "block") {
    return <ParagraphRenderer containerKey={containerKey} block={block} />;
  } else if (block._type === "code") {
    return (
      <CodeBlockRenderer
        containerKey={containerKey}
        block={block as CodeBlockObject}
      />
    );
  } else if (block._type === "image") {
    return (
      <ImageRenderer containerKey={containerKey} block={block as ImageObject} />
    );
  }

  return null;
}
