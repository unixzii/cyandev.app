import { ReactNode } from "react";
import {
  BlockObject,
  NormalBlockObject,
  CodeBlockObject,
  ImageObject,
} from "@/data/block-types";
import {
  ParagraphRenderer,
  BlockquoteRenderer,
  ListRenderer,
} from "./BlockRenderers";
import { CodeBlockRenderer } from "./CodeBlockRenderer";
import { ImageRenderer } from "./ImageRenderer";
import { selectClass } from "@/utils";

import "./styles.css";

export interface ReaderProps {
  className?: string;
  body: unknown;
}

const NORMAL_BLOCK_TYPE = 0;
const BLOCKQUOTE_TYPE = 1;
const BULLET_LIST_TYPE = 2;
const NUMBER_LIST_TYPE = 3;
type BlockType =
  | typeof NORMAL_BLOCK_TYPE
  | typeof BLOCKQUOTE_TYPE
  | typeof BULLET_LIST_TYPE
  | typeof NUMBER_LIST_TYPE;

function getBlockType(block: BlockObject): BlockType {
  if ("listItem" in block) {
    if (block.listItem === "bullet") {
      return BULLET_LIST_TYPE;
    } else if (block.listItem === "number") {
      return NUMBER_LIST_TYPE;
    }
  } else if (block._type === "block" && block.style === "blockquote") {
    return BLOCKQUOTE_TYPE;
  }
  return NORMAL_BLOCK_TYPE;
}

interface BlockRendererProps {
  containerKey: string | null;
  block: BlockObject;
}

function BlockRenderer(props: BlockRendererProps) {
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

export function Reader(props: ReaderProps) {
  const { className, body } = props;
  const blocks = body as BlockObject[];

  let currentContainerKey: string | null = null;
  let blockGroup: BlockObject[] = [];
  const childNodes: ReactNode[] = [];

  function flushBlockGroup() {
    if (blockGroup.length === 0) {
      return;
    }

    const firstBlockInGroup = blockGroup[0];
    if (
      firstBlockInGroup._type === "block" &&
      firstBlockInGroup.style === "blockquote"
    ) {
      const key = "_" + firstBlockInGroup._key;
      childNodes.push(
        <BlockquoteRenderer
          key={key}
          containerKey={currentContainerKey}
          blocks={blockGroup as NormalBlockObject[]}
        />
      );
    } else if ("listItem" in firstBlockInGroup) {
      const key = "_" + firstBlockInGroup._key;
      childNodes.push(
        <ListRenderer
          key={key}
          containerKey={currentContainerKey}
          blocks={blockGroup as NormalBlockObject[]}
          listStyle={firstBlockInGroup.listItem}
        />
      );
    } else {
      for (const block of blockGroup) {
        childNodes.push(
          <BlockRenderer
            key={block._key}
            containerKey={currentContainerKey}
            block={block}
          />
        );
      }
    }

    blockGroup = [];
  }

  for (const block of blocks) {
    if (
      block._type === "block" &&
      (block.style === "h1" || block.style === "h2")
    ) {
      const thisContainerKey = block._key;
      if (currentContainerKey !== thisContainerKey) {
        flushBlockGroup();
      }
      currentContainerKey = thisContainerKey;
    }

    if (blockGroup.length > 0) {
      const lastBlockType = getBlockType(blockGroup[blockGroup.length - 1]);
      const thisBlockType = getBlockType(block);
      if (lastBlockType !== thisBlockType) {
        flushBlockGroup();
      }
    }

    // Merge adjacent blockquote and list blocks.
    blockGroup.push(block);
  }

  flushBlockGroup();

  return (
    <article className={selectClass({ "cyan-reader": true }, className)}>
      {childNodes}
    </article>
  );
}

export { BlockVisibilityCollector } from "./BlockVisibilityCollector";
