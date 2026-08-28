"use client";

import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { slideUp, viewportOnce } from "@/lib/animations";

export function SectionReveal({ children, ...props }: ComponentProps<typeof motion.div>) {
    return (
        <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            {...props}
        >
            {children}
        </motion.div>
    );
}