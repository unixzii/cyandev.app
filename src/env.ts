type EnvironmentType = "client" | "server" | "rss-generator";

let environmentType: EnvironmentType | undefined;

export function getType() {
  return environmentType || "client";
}

export function init(type: EnvironmentType) {
  if (environmentType) {
    throw new Error("Environment has already been initialized");
  }
  environmentType = type;
}
