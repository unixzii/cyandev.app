export default function makeClass(
  selectors: Record<string, boolean | undefined>,
  ...extraClassNames: (string | undefined)[]
): string {
  let className = "";
  for (const key in selectors) {
    if (selectors[key]) {
      className += `${key} `;
    }
  }
  for (const extraClassName of extraClassNames) {
    if (extraClassName) {
      className += `${extraClassName} `;
    }
  }
  return className.trimEnd();
}
