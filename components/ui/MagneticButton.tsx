"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ComponentProps } from "react";

interface MagneticButtonProps extends ComponentProps<typeof motion.button> {
    strength?: number;
}

export function MagneticButton({ strength = 18, onMouseMove, onMouseLeave, ...props }: MagneticButtonProps) {
    const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
    const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });

    return (
        <motion.button
            {...props}
            style={{ ...props.style, x, y }}
            onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                x.set(((event.clientX - rect.left) / rect.width - 0.5) * strength);
                y.set(((event.clientY - rect.top) / rect.height - 0.5) * strength);
                onMouseMove?.(event);
            }}
            onMouseLeave={(event) => {
                x.set(0);
                y.set(0);
                onMouseLeave?.(event);
            }}
        />
    );
}