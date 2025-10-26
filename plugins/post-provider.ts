import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import * as mdx from "@mdx-js/mdx";

function createVirtualModule(id: string, loader: () => string) {
  let cachedLoadResult: string | undefined;
  return {
    id: "virtual:" + id,
    resolvedId: "\0virtual:" + id,
    get loadResult() {
      if (cachedLoadResult) {
        return cachedLoadResult;
      }
      cachedLoadResult = loader();
      return cachedLoadResult;
    },
  };
}

function parseMetadataFromMdx(path: string): PostMetadata {
  const buffer = readFileSync(path);
  const compiledBody = mdx
    .compileSync(buffer, {
      outputFormat: "function-body",
    })
    .value.toString();
  const compiledFunction = new Function(compiledBody);
  const { metadata } = compiledFunction({});
  return metadata;
}

export default function postProvider(postsPath: string): Plugin {
  const postFilenames = readdirSync(postsPath);

  const postsVirtualModule = createVirtualModule("posts", () => {
    let code = "const posts = {";
    for (const filename of postFilenames) {
      const name = path.parse(filename).name;
      const postPath = path.resolve(postsPath, filename);
      code += `get ['${name}']() { return import('${postPath}') },`;
    }
    code += "};";
    code += "export default posts;";
    return code;
  });
  const postIndexVirtualModule = createVirtualModule("postIndex", () => {
    let metadataList: PostMetadata[] = [];
    for (const filename of postFilenames) {
      const postPath = path.resolve(postsPath, filename);
      const metadata = parseMetadataFromMdx(postPath);
      metadata.slug = path.parse(filename).name;
      metadata.date = new Date(metadata.date);
      metadataList.push(metadata);
    }
    metadataList.sort((a, b) => +b.date - +a.date);
    return "export default " + JSON.stringify(metadataList);
  });

  const resolvedIds = {
    [postsVirtualModule.id]: postsVirtualModule.resolvedId,
    [postIndexVirtualModule.id]: postIndexVirtualModule.resolvedId,
  };

  const virtualModules = {
    [postsVirtualModule.resolvedId]: postsVirtualModule,
    [postIndexVirtualModule.resolvedId]: postIndexVirtualModule,
  };

  return {
    name: "post-provider-plugin",
    resolveId(id) {
      return resolvedIds[id];
    },
    load(id) {
      const virtualModule = virtualModules[id];
      if (virtualModule) {
        return virtualModule.loadResult;
      }
    },
  };
}
