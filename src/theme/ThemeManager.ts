import type { Theme } from "./types";

interface ThemeManager {
  init(): void;
  getTheme(): Theme;
  setTheme(theme: Theme): void;
  registerListener(listener: () => void): () => void;
}

const LOCAL_STORAGE_KEY = "app_theme";
const THEME_TRANSITION_CLASS = "theme-transition";

const LIGHT_THEME_COLOR = "#fafafa";
const DARK_THEME_COLOR = "#171717";

const listeners = new Set<() => void>();
let currentTheme: Theme = "system";
let clearTransitionTimer: number | null = null;

let lightThemeColorMeta: HTMLMetaElement | null = null;
let darkThemeColorMeta: HTMLMetaElement | null = null;

function applyTheme(theme: Theme, withAnimation: boolean) {
  currentTheme = theme;

  const root = document.documentElement;
  if (withAnimation) {
    root.classList.add(THEME_TRANSITION_CLASS);
    if (clearTransitionTimer) {
      window.clearTimeout(clearTransitionTimer);
    }
    clearTransitionTimer = window.setTimeout(() => {
      root.classList.remove(THEME_TRANSITION_CLASS);
      clearTransitionTimer = null;
    }, 300);
  }
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
      applyTheme(persistentTheme, false);
    }
  },
  getTheme() {
    return currentTheme;
  },
  setTheme(theme: Theme) {
    localStorage.setItem(LOCAL_STORAGE_KEY, theme);
    applyTheme(theme, true);
  },
  registerListener(listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export default themeManager;
