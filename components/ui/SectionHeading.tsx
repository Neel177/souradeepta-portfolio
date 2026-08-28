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
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan">
                {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-0.04em] text-ink sm:text-4xl">
                {title}
            </h2>
            {description && (
                <p className="mt-4 text-[15px] leading-7 text-muted">
                    {description}
                </p>
            )}
        </motion.div>
    );
}