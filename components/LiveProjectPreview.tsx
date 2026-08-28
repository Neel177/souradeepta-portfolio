"use client";

import { ExternalLink, Radio } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { linkValue } from "@/lib/content";

interface LiveProjectPreviewProps {
    live?: string;
    fallbackSrc?: string;
    alt: string;
    gradientClass?: string;
}

type PreviewState = "gradient" | "loading" | "live" | "blocked";

export function LiveProjectPreview({
    live,
    fallbackSrc,
    alt,
    gradientClass = "from-violet/20 via-surface to-cyan/10",
}: LiveProjectPreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const [state, setState] = useState<PreviewState>(
        live ? "loading" : "gradient"
    );

    const [fallbackFailed, setFallbackFailed] = useState(false);

    const liveHref = live ? linkValue(live) : undefined;

    useEffect(() => {
        if (!live) {
            setState("gradient");
            return;
        }

        // Start loading the live project.
        // No timeout — the preview will remain available.
        setState("loading");
    }, [live]);

    return (
        <div
            ref={containerRef}
            className="group relative aspect-video overflow-hidden bg-[var(--color-surface-2)]"
        >
            {/* Beautiful fallback/background */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${gradientClass} transition-opacity duration-700 ${state === "live" ? "opacity-0" : "opacity-100"
                    }`}
            >
                {/* Tech pattern */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                        backgroundSize: "28px 28px",
                    }}
                />

                {/* Ambient glow */}
                <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-violet/20 blur-2xl" />
                <div className="absolute bottom-1/4 right-1/4 h-24 w-24 rounded-full bg-cyan/15 blur-2xl" />

                {/* Project name */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-display text-2xl font-bold tracking-[-0.04em] text-ink/[0.08] sm:text-3xl">
                        {alt.replace(" preview", "")}
                    </p>
                </div>
            </div>

            {/* Live project */}
            {liveHref && (
                <iframe
                    src={liveHref}
                    title={`${alt} live preview`}
                    className={`absolute inset-0 h-full w-full border-0 bg-white transition-opacity duration-700 ${state === "live"
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                    loading="eager"
                    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                    onLoad={() => setState("live")}
                    onError={() => setState("blocked")}
                />
            )}

            {/* Loading indicator */}
            {state === "loading" && (
                <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-[var(--color-void)]/80 to-transparent px-4 pb-4 pt-8">
                    <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
                        Loading live preview
                    </span>
                </div>
            )}

            {/* Live badge */}
            {state === "live" && (
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-[var(--color-surface)]/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald backdrop-blur-sm">
                    <Radio size={10} />
                    Live
                </span>
            )}

            {/* If the external site refuses iframe */}
            {state === "blocked" && liveHref && (
                <a
                    href={liveHref}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-[var(--color-void)]/90 to-transparent px-5 pb-5 pt-10 text-[12px] font-medium text-ink transition-colors hover:text-cyan"
                >
                    <ExternalLink size={13} strokeWidth={1.8} />
                    <span>Open live site</span>
                </a>
            )}

            {/* Open project button */}
            {liveHref && (
                <a
                    href={liveHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${alt} in new tab`}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)]/80 text-muted opacity-0 shadow-sm backdrop-blur-sm transition-all duration-200 hover:text-ink group-hover:opacity-100 focus-visible:opacity-100"
                >
                    <ExternalLink size={13} strokeWidth={1.8} />
                </a>
            )}

            {/* Optional fallback image */}
            {fallbackSrc && !fallbackFailed && (
                <Image
                    src={fallbackSrc}
                    alt={alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`relative z-[1] h-full w-full object-cover transition-opacity duration-700 ${state === "live"
                            ? "opacity-0"
                            : "opacity-100"
                        }`}
                    onError={() => setFallbackFailed(true)}
                />
            )}
        </div>
    );
}