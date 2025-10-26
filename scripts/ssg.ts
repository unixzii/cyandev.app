import path from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import { ensureDir } from "fs-extra";

const dirname = import.meta.dirname;

import("../dist/server/main.ssg.js" as any).then(async (entry) => {
  const template = readFileSync(
    path.resolve(dirname, "../dist/index.html"),
  ).toString();

  async function render(routePath: string, dest: string) {
    const contents = await entry.render(routePath);
    const htmlString = template.replace(
      '<div id="root"></div>',
      '<div id="root">' + contents + "</div>",
    );
    const resolvedDestPath = path.resolve(dirname, "../dist", dest);
    await ensureDir(path.dirname(resolvedDestPath));
    writeFileSync(resolvedDestPath, htmlString);
  }

  await render("/", "index.html");
  for (const post of entry.postIndex) {
    const { slug } = post;
    await render(`/post/${slug}`, `post/${slug}.html`);
  }
});
