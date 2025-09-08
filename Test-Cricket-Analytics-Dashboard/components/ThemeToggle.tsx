"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// Theme toggle button
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Toggle between 'light' and 'dark'
  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const isDark = theme === "dark";
  return (
    <Toggle
      aria-label="Toggle theme"
      pressed={theme === "dark"}
      onPressedChange={handleToggle}
      className="ml-4"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Toggle>
  );
}
