"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <MoonIcon className="size-5" />
      ) : (
        <SunIcon className="size-5" />
      )}
    </button>
  );
};
