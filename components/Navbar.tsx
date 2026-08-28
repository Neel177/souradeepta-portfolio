"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";
import { GradientButton } from "@/components/ui/GradientButton";
import { ThemeToggle } from "@/components/ThemeToggle";

const visibleLinks = siteConfig.navLinks;

export function Navbar() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const contactLink = profile.socials.find((s) => s.label === "Email");
    const closeRef = useRef<HTMLButtonElement>(null);

    /* Active-section tracking */
    useEffect(() => {
        const sections = visibleLinks
            .map((link) => document.querySelector(link.href))
            .filter(Boolean) as Element[];

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible?.target.id) setActive(`#${visible.target.id}`);
            },
            { rootMargin: "-25% 0px -65%", threshold: [0.05, 0.25, 0.5] },
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    /* Scroll shadow */
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 32);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* Lock body scroll when mobile menu open */
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
            closeRef.current?.focus();
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
                <nav
                    className={cn(
                        "mx-auto max-w-6xl rounded-2xl border border-[var(--color-border)] px-4 py-2.5 transition-all duration-500 sm:px-5",
                        scrolled
                            ? "bg-[var(--color-surface)]/90 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
                            : "bg-[var(--color-surface)]/70 shadow-[0_4px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl",
                    )}
                    aria-label="Main navigation"
                >
                    <div className="flex min-h-[2.5rem] items-center justify-between gap-4">
                        {/* Logo */}
                        <a
                            href="#top"
                            onClick={() => setOpen(false)}
                            className="group shrink-0"
                        >
                            <span className="font-display text-sm font-semibold tracking-[-0.025em] text-ink transition-opacity hover:opacity-70">
                                {profile.name}                                <span className="text-violet">.</span>
                            </span>
                        </a>

                        {/* Desktop nav */}
                        <div className="hidden items-center gap-7 lg:flex">
                            {visibleLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "relative py-1 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-200",
                                        active === link.href
                                            ? "text-ink"
                                            : "text-muted hover:text-ink",
                                    )}
                                >
                                    {link.label}
                                    {active === link.href && (
                                        <motion.span
                                            layoutId="nav-indicator"
                                            className="absolute -bottom-0.5 left-0 right-0 h-px rounded-full bg-gradient-signature"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </a>
                            ))}
                        </div>

                        {/* Desktop right */}
                        <div className="hidden items-center gap-3 lg:flex">
                            {contactLink && (
                                <GradientButton href={contactLink.url} className="px-4 py-2 text-[12px] font-semibold">
                                    Let&apos;s talk
                                </GradientButton>
                            )}
                            <ThemeToggle />
                        </div>

                        {/* Mobile: theme + hamburger */}
                        <div className="flex items-center gap-2 lg:hidden">
                            <ThemeToggle />
                            <button
                                type="button"
                                aria-expanded={open}
                                aria-controls="mobile-navigation"
                                aria-label={open ? "Close menu" : "Open menu"}
                                onClick={() => setOpen((v) => !v)}
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] text-muted transition-colors hover:border-[var(--color-border-strong)] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.span
                                        key={open ? "x" : "menu"}
                                        initial={{ opacity: 0, rotate: open ? -45 : 45, scale: 0.6 }}
                                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                        exit={{ opacity: 0, rotate: open ? 45 : -45, scale: 0.6 }}
                                        transition={{ duration: 0.18, ease: "easeOut" }}
                                        className="flex items-center justify-center"
                                    >
                                        {open ? (
                                            <X size={16} strokeWidth={2} />
                                        ) : (
                                            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
                                                <rect width="16" height="1.5" rx="0.75" fill="currentColor" />
                                                <rect y="5.25" width="11" height="1.5" rx="0.75" fill="currentColor" />
                                                <rect y="10.5" width="14" height="1.5" rx="0.75" fill="currentColor" />
                                            </svg>
                                        )}
                                    </motion.span>
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile menu backdrop */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-30 bg-void/60 backdrop-blur-sm lg:hidden"
                        onClick={() => setOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Mobile menu panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="panel"
                        id="mobile-navigation"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-x-4 top-[4.75rem] z-40 overflow-hidden rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-[0_24px_64px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:inset-x-6 lg:hidden"
                    >
                        <div className="p-4">
                            {/* Nav links */}
                            <div className="grid gap-0.5">
                                {visibleLinks.map((link, i) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04 + 0.05, duration: 0.25, ease: "easeOut" }}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors",
                                            active === link.href
                                                ? "bg-[var(--color-surface-2)] text-ink"
                                                : "text-muted hover:bg-[var(--color-surface-2)] hover:text-ink",
                                        )}
                                    >
                                        {active === link.href && (
                                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-signature" />
                                        )}
                                        <span className={active !== link.href ? "pl-[18px]" : ""}>{link.label}</span>
                                    </motion.a>
                                ))}
                            </div>

                            {/* CTA */}
                            {contactLink && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.28, duration: 0.25 }}
                                    className="mt-3 border-t border-[var(--color-border)] pt-3"
                                >
                                    <GradientButton
                                        href={contactLink.url}
                                        className="w-full rounded-xl py-3 text-sm font-semibold"
                                        onClick={() => setOpen(false)}
                                    >
                                        Let&apos;s talk
                                    </GradientButton>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}