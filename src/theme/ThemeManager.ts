"use client";

import type { Theme } from "./types";

interface ThemeManager {
  init(): void;
  getTheme(): Theme;
  setTheme(theme: Theme): void;
  registerListener(listener: () => void): () => void;
}

const LOCAL_STORAGE_KEY = "app_theme";

const listeners = new Set<() => void>();
let currentTheme: Theme = "system";
function applyTheme(theme: Theme) {
  currentTheme = theme;
  document.documentElement.dataset["theme"] = theme;

  listeners.forEach((f) => f());
}

const themeManager: ThemeManager = {
  init() {
    let persistentTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
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
    applyTheme(theme);
  },
  registerListener(listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export default themeManager;
