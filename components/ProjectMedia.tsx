"use client";

import { useState } from "react";

interface ProjectMediaProps {
    src: string;
    alt: string;
}

export function ProjectMedia({ src, alt }: ProjectMediaProps) {
    const [failed, setFailed] = useState(false);

    return (
        <div className="relative aspect-video overflow-hidden rounded-xl bg-[var(--color-surface-2)]">
            {!failed && src && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover"
                    onError={() => setFailed(true)}
                />
            )}
            {(failed || !src) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-violet/15 via-[var(--color-surface-2)] to-cyan/10">
                    {/* Dot grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.025]"
                        style={{
                            backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                            backgroundSize: "24px 24px",
                        }}
                    />
                    <div className="relative">
                        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                            Project preview
                        </p>
                        <div className="mx-auto mt-3 h-px w-12 bg-gradient-signature opacity-60" />
                    </div>
                </div>
            )}
        </div>
    );
}