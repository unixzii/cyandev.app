import { type JSX, type PropsWithChildren, Children } from "react";

// Decorate the rendered contents from rehype-pretty-code.

export function FigureCodeBlock(props: PropsWithChildren) {
  if ("data-rehype-pretty-code-figure" in props) {
    const element = Children.only(props.children) as JSX.Element;
    return (
      <div className="code-block">
        <pre className="shiki" {...element.props} />
      </div>
    );
  }
  return <figure {...props} />;
}

export function PreCodeBlock(props: PropsWithChildren) {
  const codeElement = Children.only(props.children) as JSX.Element;
  const code = codeElement.props.children as string;
  const codeLines = code.trim().split("\n");
  return (
    <div className="code-block">
      <pre className="shiki">
        <code>
          {codeLines.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </code>
      </pre>
    </div>
  );
}
