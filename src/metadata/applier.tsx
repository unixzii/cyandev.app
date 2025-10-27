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

export function applyMetadata(metadata: Metadata) {
  const { title, description, url } = metadata;

  let titleElement = document.head.querySelector("title");
  if (!titleElement) {
    titleElement = document.createElement("title");
    document.head.appendChild(titleElement);
  }
  titleElement.textContent = title || "";

  const descriptionElement = findOrInsertMetaElement("description");
  descriptionElement.setAttribute("content", description || "");

  const ogDescriptionElement = findOrInsertMetaElement(
    undefined,
    "og:description",
  );
  ogDescriptionElement.setAttribute("content", description || "");

  const twDescriptionElement = findOrInsertMetaElement("twitter:description");
  twDescriptionElement.setAttribute("content", description || "");

  const ogUrlElement = findOrInsertMetaElement(undefined, "og:url");
  ogUrlElement.setAttribute("content", url || "");
}
