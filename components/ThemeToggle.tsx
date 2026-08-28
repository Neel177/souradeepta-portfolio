"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
    const { theme, toggle } = useTheme();
    const day = theme === "day";

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${day ? "night" : "day"} theme`}
            className="relative flex h-8 w-[3.25rem] items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface-2)] p-0.5 text-muted transition-all duration-300 hover:border-[var(--color-border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
        >
            {/* Track icons */}
            <span className="relative flex w-full items-center justify-between px-1.5">
                <Sun size={10} className={day ? "opacity-0" : "text-amber opacity-60"} />
                <Moon size={10} className={day ? "text-violet opacity-60" : "opacity-0"} />
            </span>

            {/* Thumb */}
            <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-ink shadow-md"
                style={{ left: day ? "calc(100% - 1.625rem)" : "2px" }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={theme}
                        initial={{ opacity: 0, rotate: -15, scale: 0.7 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 15, scale: 0.7 }}
                        transition={{ duration: 0.18 }}
                    >
                        {day ? (
                            <Sun size={12} className="text-void" />
                        ) : (
                            <Moon size={12} className="text-void" />
                        )}
                    </motion.span>
                </AnimatePresence>
            </motion.span>
        </button>
    );
}