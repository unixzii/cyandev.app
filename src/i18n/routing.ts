import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "zh-cn"] as string[],
  defaultLocale: "en",
});

export const { Link } = createNavigation(routing);
