import type { ReactNode } from "react";
import { InlineObject, TypedObject } from "./types";

export interface InlineRendererProps {
  object: InlineObject;
  markDefs: TypedObject[];
}

function wrapWithMark(mark: TypedObject, child: ReactNode): ReactNode {
  if (mark._type === "link") {
    const href = (mark as any).href;
    return <a href={href}>{child}</a>;
  }
  return child;
}

export function InlineRenderer(props: InlineRendererProps) {
  const { object, markDefs } = props;

  let child: ReactNode = object.text;
  for (const mark of object.marks) {
    let usedMarkDef = false;
    for (const markDef of markDefs) {
      if (markDef._key === mark) {
        child = wrapWithMark(markDef, child);
        usedMarkDef = true;
        break;
      }
    }
    if (usedMarkDef) {
      continue;
    }
    if (mark === "strong") {
      child = <strong>{child}</strong>;
    }
  }

  return <span>{child}</span>;
}
