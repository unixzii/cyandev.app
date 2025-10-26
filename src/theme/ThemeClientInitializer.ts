import { useEffect } from "react";
import themeManager from "./ThemeManager";

export default function ThemeClientInitializer() {
  useEffect(() => {
    themeManager.init();
  }, []);
  return null;
}
