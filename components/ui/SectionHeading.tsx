"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
    eyebrow: string;
    title: string;
    description?: string;
    align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
    return (
        <motion.div
            className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
        >
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-cyan sm:text-[11px] sm:tracking-[0.22em]">
                {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.85rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.045em] text-ink">
                {title}
            </h2>
            {description && (
                <p className="mt-4 max-w-[60ch] text-[15px] leading-7 text-muted sm:text-base sm:leading-[1.8]">
                    {description}
                </p>
            )}
        </motion.div>
    );
}
