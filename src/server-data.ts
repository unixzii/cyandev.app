import * as env from "./env";

const serverValues = new Map();

export function getAllServerValues() {
  if (env.getType() === "client") {
    throw new Error("`getAllServerValues` is only available on the server");
  }

  return Object.fromEntries(serverValues);
}

export function resetAllServerValues() {
  if (env.getType() === "client") {
    throw new Error("`resetAllServerValues` is only available on the server");
  }

  serverValues.clear();
}

export function useServerValue<T>(key: string, getValue: () => T): T {
  if (env.getType() !== "client") {
    if (serverValues.has(key)) {
      return serverValues.get(key);
    }
    const value = getValue();
    serverValues.set(key, value);
    return value;
  }

  if (key in (window.__SERVER_VALUES || {})) {
    return window.__SERVER_VALUES[key] as T;
  }
  return getValue();
}
