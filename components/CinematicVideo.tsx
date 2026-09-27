"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";

interface CinematicVideoProps {
    src?: string;
    poster?: string;
    className?: string;
    mobileFallback?: boolean;
    children?: ReactNode;
}

/** Optional media slot: fallback is immediate; video downloads only near view and stays off on reduced motion/touch. */
export function CinematicVideo({ src, poster, className = "", mobileFallback = true, children }: CinematicVideoProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [near, setNear] = useState(false);
    const [failed, setFailed] = useState(false);
    const [reduced, setReduced] = useState(true);
    const [touch, setTouch] = useState(true);

    useEffect(() => {
        setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
        setTouch(window.matchMedia("(pointer: coarse)").matches);
        const element = ref.current;
        if (!element || !src || !("IntersectionObserver" in window)) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setNear(true); observer.disconnect(); }
        }, { rootMargin: "320px 0px" });
        observer.observe(element);
        return () => observer.disconnect();
    }, [src]);

    const play = Boolean(src && near && !failed && !reduced && !(mobileFallback && touch));
    return (
        <div ref={ref} className={`cinematic-video ${className}`}>
            {poster && <Image className="cinematic-video__poster" src={poster} alt="" fill sizes="100vw" />}
            <div className="cinematic-video__fallback" aria-hidden="true">{children}</div>
            {play && (
                <video
                    className="cinematic-video__media"
                    src={src}
                    poster={poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    onError={() => setFailed(true)}
                />
            )}
        </div>
    );
}
