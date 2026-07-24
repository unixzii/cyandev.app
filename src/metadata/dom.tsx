import type { Metadata } from "./types";

function findOrInsertMetaElement(name?: string, property?: string) {
  const selector = name
    ? `meta[name='${name}']`
    : property
      ? `meta[property='${property}']`
      : "";
  if (!selector) {
    throw new Error("Invalid metadata");
  }

  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    if (name) {
      element.setAttribute("name", name);
    } else if (property) {
      element.setAttribute("property", property);
    }
    document.head.appendChild(element);
  }
  return element as HTMLMetaElement;
}

export function renderMetadata(metadata: Metadata) {
  const { title, description, url, imageUrl } = metadata;

  let titleElement = document.head.querySelector("title");
  if (!titleElement) {
    titleElement = document.createElement("title");
    document.head.appendChild(titleElement);
  }
  titleElement.textContent = title || "";

  const descriptionElement = findOrInsertMetaElement("description");
  descriptionElement.setAttribute("content", description || "");

  const ogTitleElement = findOrInsertMetaElement(undefined, "og:title");
  ogTitleElement.setAttribute("content", title || "");

  const ogDescriptionElement = findOrInsertMetaElement(
    undefined,
    "og:description",
  );
  ogDescriptionElement.setAttribute("content", description || "");

  const ogImageElement = findOrInsertMetaElement(undefined, "og:image");
  ogImageElement.setAttribute("content", imageUrl || "");

  const ogUrlElement = findOrInsertMetaElement(undefined, "og:url");
  ogUrlElement.setAttribute("content", url || "");

  const twDescriptionElement = findOrInsertMetaElement("twitter:description");
  twDescriptionElement.setAttribute("content", description || "");

  const twImageElement = findOrInsertMetaElement("twitter:image");
  twImageElement.setAttribute("content", imageUrl || "");
}

export function renderMetadataToString(metadata: Metadata) {
  const { title, description, url, imageUrl } = metadata;
  let htmlString = "";

  if (title) {
    htmlString += `<title>${title}</title>`;
    htmlString += `<meta name="og:title" content="${title}">`;
  }

  if (description) {
    htmlString += `<meta name="description" content="${description}">`;
    htmlString += `<meta property="og:description" content="${description}">`;
    htmlString += `<meta name="twitter:description" content="${description}">`;
  }

  if (url) {
    htmlString += `<meta property="og:url" content="${url}">`;
  }

  if (imageUrl) {
    htmlString += `<meta property="og:image" content="${imageUrl}">`;
    htmlString += `<meta name="twitter:image" content="${imageUrl}">`;
  }

  return htmlString;
}
