"use client";

import { useEffect, useRef } from "react";

/** Small desktop-only accent cursor; native focus and touch interactions remain unchanged. */
export function CinematicCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const cursor = cursorRef.current;
        if (!cursor) return;
        document.body.classList.add("has-cinematic-cursor");
        let x = -100;
        let y = -100;
        let frame = 0;
        const move = (event: PointerEvent) => {
            x = event.clientX;
            y = event.clientY;
            if (!frame) frame = requestAnimationFrame(() => {
                cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                frame = 0;
            });
        };
        const over = (event: PointerEvent) => {
            if ((event.target as Element | null)?.closest("a, button, [role=button]")) cursor.dataset.active = "true";
            else delete cursor.dataset.active;
        };
        window.addEventListener("pointermove", move, { passive: true });
        window.addEventListener("pointerover", over, { passive: true });
        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerover", over);
            document.body.classList.remove("has-cinematic-cursor");
        };
    }, []);
    return <div ref={cursorRef} className="cinematic-cursor" aria-hidden="true"><span /></div>;
}
