import path from "node:path";
import { readdirSync, writeFileSync } from "node:fs";
import fse from "fs-extra";

const dirname = import.meta.dirname;
const distPath = path.resolve(dirname, "../dist");

const pathMappings: Record<string, { path: string }> = {};
function generatePathMappings(pathSegments: string[]) {
  const files = readdirSync(path.join(distPath, ...pathSegments));
  for (const file of files) {
    if (path.extname(file) === ".html") {
      const slug = path.parse(file).name;
      const routePrefix = pathSegments.join("/");
      const routePath = `${routePrefix}${routePrefix ? "/" : ""}${slug}`;
      if (routePath === "index" || routePath === "404") {
        continue;
      }
      pathMappings[`${routePath}.html`] = {
        path: routePath,
      };
    } else {
      try {
        generatePathMappings([...pathSegments, file]);
      } catch {
        // Just ignore the errors, they are mostly ENOTDIR.
      }
    }
  }
}
generatePathMappings([]);

const config = {
  version: 3,
  routes: [
    {
      src: "/blog/rss.xml",
      status: 308,
      headers: {
        ["Location"]: "/rss",
      },
    },
  ],
  overrides: {
    ...pathMappings,
    "rss.xml": {
      path: "rss",
      contentType: "application/rss+xml",
    },
  },
};

const outputPath = path.resolve(dirname, "../.vercel/output");
fse.ensureDirSync(outputPath);
writeFileSync(path.join(outputPath, "config.json"), JSON.stringify(config));
fse.copySync(distPath, path.join(outputPath, "static"));
