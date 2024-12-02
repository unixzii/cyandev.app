import { codeToHtml } from "shiki";
import { CodeBlockObject } from "./types";

export interface CodeBlockRendererProps {
  block: CodeBlockObject;
}

export async function CodeBlockRenderer(props: CodeBlockRendererProps) {
  const { language, code, highlightedLines } = props.block;
  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      light: "vitesse-light",
      dark: "vitesse-dark",
    },
    decorations:
      highlightedLines?.map((line) => ({
        start: { line: line - 1, character: 0 },
        end: { line, character: 0 },
        properties: { class: "highlighted-line" },
      })) ?? [],
  });
  return (
    <div className="shiki-code" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
