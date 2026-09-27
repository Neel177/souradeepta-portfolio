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
    const videoRef = useRef<HTMLVideoElement>(null);
    const [near, setNear] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);
    const [reduced, setReduced] = useState(true);
    const [touch, setTouch] = useState(true);

    useEffect(() => {
        setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
        setTouch(window.matchMedia("(pointer: coarse)").matches);
        const element = ref.current;
        if (!element || !src || !("IntersectionObserver" in window)) return;
        const observer = new IntersectionObserver(([entry]) => {
            setNear(entry.isIntersecting);
            if (entry.isIntersecting) setLoaded(true);
        }, { rootMargin: "320px 0px" });
        observer.observe(element);
        return () => observer.disconnect();
    }, [src]);

    const allowed = !reduced && !(mobileFallback && touch);
    const play = Boolean(src && loaded && near && !failed && allowed);
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (play) void video.play().catch(() => undefined);
        else video.pause();
    }, [play]);
    return (
        <div ref={ref} className={`cinematic-video ${className}`}>
            {poster && <Image className="cinematic-video__poster" src={poster} alt="" fill sizes="100vw" />}
            <div className="cinematic-video__fallback" aria-hidden="true">{children}</div>
            {loaded && src && !failed && allowed && (
                <video
                    ref={videoRef}
                    className="cinematic-video__media"
                    src={src}
                    poster={poster}
                    autoPlay={play}
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
