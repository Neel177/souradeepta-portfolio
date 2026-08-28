import type { Variants } from "framer-motion";

/** Standard fade + translate up — used for section reveals */
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

/** Subtle fade + translate — tighter movement, used for cards */
export const slideUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
};

/** Pure fade — used for overlays, images */
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

/** Scale from slightly below 1 — used for portrait, modal */
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.94 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

/** Stagger container — standard */
export const staggerContainer = (stagger = 0.1): Variants => ({
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: 0 } },
});

/** Stagger container — fast, for grid items */
export const staggerFast = (stagger = 0.07): Variants => ({
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
});

/** Viewport config — trigger once when element enters */
export const viewportOnce = { once: true, margin: "-80px" };

/** Viewport config — tighter trigger for above-fold content */
export const viewportEarly = { once: true, margin: "-20px" };