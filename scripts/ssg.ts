import path from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import { ensureDir } from "fs-extra";

import type * as ssgModule from "../src/main.ssg";

const dirname = import.meta.dirname;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import("../dist/server/main.ssg.js" as any).then(
  async (entry: typeof ssgModule) => {
    const { render } = entry;

    const htmlTemplate = readFileSync(
      path.resolve(dirname, "../dist/index.html"),
    ).toString();

    async function writeRenderedPage(page: ssgModule.RenderedPage) {
      const { path: routePath, contents, metadata } = page;
      const htmlString = htmlTemplate
        .replace("<!--META-SLOT-->", metadata)
        .replace(
          '<div id="root"></div>',
          '<div id="root">' + contents + "</div>",
        );

      const cleanedRoutePath =
        routePath === "/" ? "index.html" : `${routePath.slice(1)}.html`;
      const resolvedDestPath = path.resolve(
        dirname,
        "../dist",
        cleanedRoutePath,
      );
      await ensureDir(path.dirname(resolvedDestPath));
      writeFileSync(resolvedDestPath, htmlString);
    }

    const renderedPages = await render();
    for (const page of renderedPages) {
      await writeRenderedPage(page);
    }
  },
);
