import type { Theme } from "./types";

interface ThemeManager {
  init(): void;
  getTheme(): Theme;
  setTheme(theme: Theme): void;
  registerListener(listener: () => void): () => void;
}

const LOCAL_STORAGE_KEY = "app_theme";

const LIGHT_THEME_COLOR = "#fafafa";
const DARK_THEME_COLOR = "#171717";

const listeners = new Set<() => void>();
let currentTheme: Theme = "system";

let lightThemeColorMeta: HTMLMetaElement | null = null;
let darkThemeColorMeta: HTMLMetaElement | null = null;

function applyTheme(theme: Theme) {
  currentTheme = theme;

  const root = document.documentElement;
  root.dataset["theme"] = theme;

  if (!lightThemeColorMeta || !darkThemeColorMeta) {
    lightThemeColorMeta = document.createElement("meta");
    lightThemeColorMeta.name = "theme-color";
    lightThemeColorMeta.media = "(prefers-color-scheme: light)";
    darkThemeColorMeta = document.createElement("meta");
    darkThemeColorMeta.name = "theme-color";
    darkThemeColorMeta.media = "(prefers-color-scheme: dark)";

    const head = document.head;
    head.appendChild(lightThemeColorMeta);
    head.appendChild(darkThemeColorMeta);
  }

  lightThemeColorMeta.content =
    theme === "dark" ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
  darkThemeColorMeta.content =
    theme === "light" ? LIGHT_THEME_COLOR : DARK_THEME_COLOR;

  listeners.forEach((f) => f());
}

const themeManager: ThemeManager = {
  init() {
    const persistentTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (
      persistentTheme === "system" ||
      persistentTheme === "light" ||
      persistentTheme === "dark"
    ) {
      applyTheme(persistentTheme);
    }
  },
  getTheme() {
    return currentTheme;
  },
  setTheme(theme: Theme) {
    localStorage.setItem(LOCAL_STORAGE_KEY, theme);

    if (!("startViewTransition" in document)) {
      applyTheme(theme);
      return;
    }

    const transition = document.startViewTransition(() => {
      applyTheme(theme);
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        { opacity: 1 },
        {
          duration: 200,
          pseudoElement: "::view-transition-new(root)",
          fill: "both",
        },
      );
    });
  },
  registerListener(listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export default themeManager;
