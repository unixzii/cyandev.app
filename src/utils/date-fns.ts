import { format as formatDate } from "date-fns";

export function formatTimestampToHumanReadableDate(
  timestamp: number | string,
  style?: "short" | "long",
): string {
  const date = new Date(timestamp);
  if (style === "long") {
    return formatDate(date, "MMMM do, yyyy");
  }
  return formatDate(date, "MMM. do, yyyy");
}
