"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "night" | "day";
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: "night", toggle: () => undefined });

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("night");

    useEffect(() => {
        const stored = window.localStorage.getItem("portfolio-theme") as Theme | null;
        const systemDay = window.matchMedia("(prefers-color-scheme: light)").matches;
        setTheme(stored ?? (systemDay ? "day" : "night"));
    }, []);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.body.classList.toggle("theme-day", theme === "day");
        window.localStorage.setItem("portfolio-theme", theme);
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, toggle: () => setTheme((current) => current === "night" ? "day" : "night") }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    return useContext(ThemeContext);
}