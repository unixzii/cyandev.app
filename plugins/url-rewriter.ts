import type { Node, Parent, Image } from "mdast";

// TODO: make this configurable.
const PATTERNS = [["//images.cyandev.app", "//blog-images.cy4n.dev"]];

export function RemarkUrlRewriter() {
  function visitAndRewrite(tree: Node) {
    if (tree.type === "image") {
      const image = tree as Image;
      let url = image.url;
      for (const pattern of PATTERNS) {
        url = url.replaceAll(pattern[0], pattern[1]);
      }
      image.url = url;
    }
    if ("children" in tree) {
      for (const child of (tree as Parent).children) {
        visitAndRewrite(child);
      }
    }
  }

  return async (tree: Node) => {
    visitAndRewrite(tree);
    return tree;
  };
}
