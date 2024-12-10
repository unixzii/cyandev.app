"use client";

import { createElement } from "react";
import { NormalBlockObject } from "@/data/block-types";
import { InlineRenderer } from "./InlineRenderer";
import { useReportBlockVisibility } from "./BlockVisibilityCollector";

export interface ParagraphRendererProps {
  containerKey?: string | null;
  block: NormalBlockObject;
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

export function ParagraphRenderer(props: ParagraphRendererProps) {
  const { containerKey, block } = props;
  const { children, markDefs } = block;

  const ref = useReportBlockVisibility(block._key, containerKey);

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
      <a ref={ref} href={`#${_key}`}>
        {childNodes}
      </a>
    );
  }

  return <p ref={ref}>{childNodes}</p>;
}

export function BlockquoteRenderer(props: BlockquoteRendererProps) {
  const { containerKey, blocks } = props;

  const ref = useReportBlockVisibility(blocks[0]._key, containerKey);

  return (
    <blockquote ref={ref}>
      {blocks.map((block) => (
        <ParagraphRenderer key={block._key} block={block} />
      ))}
    </blockquote>
  );
}

export function ListRenderer(props: ListRendererProps) {
  const { containerKey, blocks, listStyle } = props;

  const ref = useReportBlockVisibility(blocks[0]._key, containerKey);

  return createElement(
    listStyle === "number" ? "ol" : "ul",
    { ref },
    blocks.map((block) => (
      <li key={block._key}>
        <ParagraphRenderer block={block} />
      </li>
    ))
  );
}
