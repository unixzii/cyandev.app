import { ReactNode } from "react";
import { BlockObject } from "./types";
import {
  BlockRenderer,
  BlockquoteRenderer,
  ListRenderer,
} from "./BlockRenderer";

import "./styles.css";

export interface ReaderProps {
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
  if (block.listItem === "bullet") {
    return BULLET_LIST_TYPE;
  } else if (block.listItem === "number") {
    return NUMBER_LIST_TYPE;
  } else if (block.style === "blockquote") {
    return BLOCKQUOTE_TYPE;
  }
  return NORMAL_BLOCK_TYPE;
}

export function Reader(props: ReaderProps) {
  const { body } = props;
  const blocks = body as BlockObject[];

  let blockGroup: BlockObject[] = [];
  const childNodes: ReactNode[] = [];

  function flushBlockGroup() {
    if (blockGroup.length === 0) {
      return;
    }

    const firstBlockInGroup = blockGroup[0];
    if (firstBlockInGroup.style === "blockquote") {
      const key = "_" + firstBlockInGroup._key;
      childNodes.push(<BlockquoteRenderer key={key} blocks={blockGroup} />);
    } else if (firstBlockInGroup.listItem) {
      const key = "_" + firstBlockInGroup._key;
      childNodes.push(
        <ListRenderer
          key={key}
          blocks={blockGroup}
          listStyle={firstBlockInGroup.listItem}
        />
      );
    } else {
      for (const block of blockGroup) {
        childNodes.push(<BlockRenderer key={block._key} block={block} />);
      }
    }

    blockGroup = [];
  }

  // Merge adjacent blockquote and list blocks.
  for (const block of blocks) {
    if (blockGroup.length > 0) {
      const lastBlockType = getBlockType(blockGroup[blockGroup.length - 1]);
      const thisBlockType = getBlockType(block);
      if (lastBlockType !== thisBlockType) {
        flushBlockGroup();
      }
    }

    blockGroup.push(block);
  }

  flushBlockGroup();

  return <article className="cyan-reader">{childNodes}</article>;
}
