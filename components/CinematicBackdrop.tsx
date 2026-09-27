"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const CinematicWorld = dynamic(() => import("@/components/CinematicWorld").then((module) => module.CinematicWorld), { ssr: false });
const CinematicCursor = dynamic(() => import("@/components/CinematicCursor").then((module) => module.CinematicCursor), { ssr: false });

/** One passive scroll driver updates CSS variables; visuals remain CSS-only for low-end devices. */
export function CinematicBackdrop() {
    const ref = useRef<HTMLDivElement>(null);
    const [enhanced, setEnhanced] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const touch = window.matchMedia("(pointer: coarse)").matches;
        const cores = navigator.hardwareConcurrency || 4;
        const lowPower = cores <= 4 || touch;
        if (reduced || lowPower) element.dataset.quality = "low";
        // Skip even downloading Three.js on touch, reduced-motion, and very low-core devices.
        if (!reduced && !touch && cores > 2) setEnhanced(true);

        let frame = 0;
        const update = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const max = document.documentElement.scrollHeight - window.innerHeight;
                const progress = max > 0 ? String(window.scrollY / max) : "0";
                const offset = reduced ? "0px" : `${window.scrollY * 0.08}px`;
                element.style.setProperty("--scroll-progress", progress);
                element.style.setProperty("--scroll-y", offset);
                document.documentElement.style.setProperty("--cinematic-progress", progress);
                document.documentElement.style.setProperty("--cinematic-scroll-y", offset);
                document.documentElement.style.setProperty("--cinematic-depth", reduced ? "0px" : `${Math.max(-3, -window.scrollY * 0.002)}px`);
            });
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    return (
        <>
        <div ref={ref} className="cinematic-backdrop" aria-hidden="true">
            <div className="cinematic-backdrop__field" />
            <div className="cinematic-backdrop__orb" />
            <div className="cinematic-backdrop__grid" />
            <div className="cinematic-backdrop__beam" />
        </div>
        {enhanced && <CinematicWorld />}
        {enhanced && <CinematicCursor />}
        </>
    );
}
