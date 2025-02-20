import { codeToHtml } from "shiki";

import "./styles.css";

export interface CodeBlockProps {
  originalClassName: string | null;
  code: string;
}

type CodeInfo = {
  language: string;
  highlightedLines: number[] | null;
};

function extractCodeInfo(className: string): CodeInfo {
  const groups = /language-([^{]+)({[^}]+})?/.exec(className);
  if (!groups) {
    return { language: "plaintext", highlightedLines: null };
  }
  const language = groups[1];
  let highlightedLines = groups[2];
  if (highlightedLines) {
    highlightedLines = highlightedLines.slice(1, -1);
  }
  return {
    language,
    highlightedLines: highlightedLines?.split(",").map((e) => parseInt(e)),
  };
}

export async function CodeBlock(props: CodeBlockProps) {
  const { originalClassName, code } = props;
  const codeInfo = extractCodeInfo(originalClassName ?? "");
  const html = await codeToHtml(code, {
    lang: codeInfo.language,
    themes: {
      light: "github-light-default",
      dark: "github-dark-default",
    },
    decorations:
      codeInfo.highlightedLines?.map((line) => ({
        start: { line, character: 0 },
        end: { line: line + 1, character: 0 },
        properties: { class: "highlighted-line" },
      })) ?? [],
  });
  return (
    <div className="code-block" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
