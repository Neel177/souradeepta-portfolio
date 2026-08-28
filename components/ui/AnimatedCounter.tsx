"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
    value: string;
    className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [display, setDisplay] = useState("0");

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
        if (!match) {
            setDisplay(value);
            return;
        }
        const [, prefix, numeric, suffix] = match;
        const target = Number(numeric);
        const decimals = numeric.includes(".") ? numeric.split(".")[1].length : 0;
        let frame = 0;
        let start = 0;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            start = performance.now();
            const tick = (time: number) => {
                const progress = Math.min((time - start) / 1200, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
                if (progress < 1) frame = requestAnimationFrame(tick);
            };
            frame = requestAnimationFrame(tick);
            observer.disconnect();
        });
        observer.observe(element);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, [value]);

    return <span ref={ref} className={className}>{display}</span>;
}