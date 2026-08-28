import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
}

export function GlassCard({ className, hover = false, children, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-border bg-surface/60 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(245,245,250,0.06)]",
                hover && "transition duration-300 hover:-translate-y-1 hover:border-borderStrong hover:shadow-glow",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}