"use client";

import { type MouseEventHandler, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { type IconType, Icon } from "@/components/icon";
import { selectClass } from "@/utils";
import { type Theme, themeManager } from "@/theme";

function ThemeRadioButton({
  active,
  icon,
  onClick,
}: {
  active: boolean;
  icon: IconType;
  onClick: MouseEventHandler;
}) {
  return (
    <button
      className={selectClass(
        {
          "text-primary": active,
          "text-secondary": !active,
        },
        "flex w-[30px] h-[30px] items-center justify-center cursor-pointer hover:text-primary transition-colors duration-200",
      )}
      onClick={onClick}
    >
      <Icon icon={icon} size="15px" />
    </button>
  );
}

const INDICATOR_OFFSET_MAP: Record<Theme, number> = {
  dark: 2,
  system: 32,
  light: 62,
};

export function ThemeSwitcher() {
  const currentTheme = useSyncExternalStore<Theme>(
    (onStoreChange) => {
      return themeManager.registerListener(onStoreChange);
    },
    () => themeManager.getTheme(),
    () => "system",
  );

  function changeTheme(theme: Theme) {
    themeManager.setTheme(theme);
  }

  return (
    <div className="relative p-0.5 bg-separator inset-shadow-xs rounded-full">
      <motion.div
        className="absolute w-[30px] h-[30px] bg-background shadow rounded-full z-10"
        initial={{ left: INDICATOR_OFFSET_MAP["system"] }}
        animate={{ left: INDICATOR_OFFSET_MAP[currentTheme] }}
        transition={{ type: "spring", duration: 0.36, bounce: 0 }}
      />

      <div className="relative flex z-20">
        <ThemeRadioButton
          active={currentTheme === "dark"}
          icon="moon"
          onClick={() => changeTheme("dark")}
        />
        <ThemeRadioButton
          active={currentTheme === "system"}
          icon="display"
          onClick={() => changeTheme("system")}
        />
        <ThemeRadioButton
          active={currentTheme === "light"}
          icon="sun"
          onClick={() => changeTheme("light")}
        />
      </div>
    </div>
  );
}
