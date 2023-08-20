"use client";

import {
  createContext,
  ReactNode,
  useState,
  useContext,
  // useLayoutEffect,
} from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: (mode: "light" | "dark") => void;
};
const ThemeContext = createContext<ThemeContextType | null>(null);

export default function ThemeContextProvider({
  children,
  className,
  currentTheme,
}: {
  children: ReactNode;
  className: string;
  currentTheme: "light" | "dark";
}) {
  const [theme, setMode] = useState<"light" | "dark">(currentTheme);

  const setTheme = (mode: "light" | "dark") => {
    document.cookie = `theme=${mode}; path=/; max-age=31536000`;
    setMode(mode);
  };

  // useLayoutEffect(() => {
  //   const lastTheme = window.localStorage.getItem("theme");
  //   if (lastTheme) {
  //     setMode(lastTheme as "light" | "dark");
  //   }
  // }, []);

  const bodyClass = `${className} ${theme}`;
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <body className={bodyClass}>{children}</body>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }
  return context;
};
