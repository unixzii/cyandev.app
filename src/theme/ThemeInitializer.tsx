"use client";

import { useEffect } from "react";
import themeManager from "./ThemeManager";

export default function ThemeInitializer() {
  useEffect(() => {
    themeManager.init();
  }, []);
  return null;
}
