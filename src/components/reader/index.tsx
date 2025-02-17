import { Children as ReactChildren } from "react";
import type { MDXComponents } from "mdx/types";

import { CodeBlock } from "./CodeBlock";

export const overrideComponents: MDXComponents = {
  pre(props) {
    if (ReactChildren.count(props.children) === 1) {
      const child = ReactChildren.toArray(props.children)[0];
      if (
        typeof child === "object" &&
        "type" in child &&
        child.type === "code"
      ) {
        return (
          <CodeBlock
            originalClassName={child.props.className}
            code={child.props.children}
          />
        );
      }
    }
    return <pre {...props} />;
  },
};
