import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";
type GradientButtonProps = {
    variant?: Variant;
    children: ReactNode;
    className?: string;
} & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>);

export function GradientButton({ variant = "solid", className, children, ...props }: GradientButtonProps) {
    const classes = cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-[-0.01em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void",
        variant === "solid" && "bg-gradient-signature text-void shadow-sm hover:shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98]",
        variant === "outline" && "border border-[var(--color-border-strong)] text-ink hover:border-cyan hover:text-cyan",
        variant === "ghost" && "text-muted hover:bg-[var(--color-surface-2)] hover:text-ink",
        className,
    );

    if ("href" in props && props.href) {
        const { href: anchorHref, ...anchorProps } = props as AnchorHTMLAttributes<HTMLAnchorElement>;
        return (
            <Link href={anchorHref as string} className={classes} {...anchorProps}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
            {children}
        </button>
    );
}