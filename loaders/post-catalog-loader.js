import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const postsPath = (() => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(dirname, "../data/posts");
})();

export default async function postCatalogLoader() {
  let code = "";
  const posts = [];

  const files = await readdir(postsPath);
  for (const file of files) {
    const components = file.split(".");
    const slug = components[0];
    const postPath = path.join(postsPath, file);
    const id = posts.length;
    posts.push({
      id,
      slug,
      postPath,
    });
    code += `import { metadata as metadata${id}, default as MDXContent${id} } from "${postPath}";\n`;
  }

  code += "export const slugs = [\n";
  for (const post of posts) {
    code += `  "${post.slug}",\n`;
  }
  code += "];\n";

  code += "export const postModules = {\n";
  for (const post of posts) {
    code += `  "${post.slug}": { metadata: metadata${post.id}, MDXContent: MDXContent${post.id} },\n`;
  }
  code += "};\n";

  return code;
}
