"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

//DONE: change themes via click
//DONE: create dark theme toggle
//TODO3: persist the themes choice in localStorage

const THEMES = ["default", "dark-theme", "green-theme"] as const;

type ThemeType = (typeof THEMES)[number];

type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

//isis provider
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window === "undefined") return "default";

    const savedTheme = localStorage.getItem("theme") as ThemeType | null;
    return savedTheme && THEMES.includes(savedTheme) ? savedTheme : "default";
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    localStorage?.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const body = document.body;
    body.classList.remove(...THEMES);

    if (theme !== "default") {
      body.classList.add(theme);
    }
  }, [theme]);

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export { ThemeProvider, THEMES, useTheme };
export type { ThemeType };
