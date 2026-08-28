"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
    useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", handleKeyDown);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = prev;
        };
    }, [open, onClose]);

    if (typeof document === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Backdrop */}
                    <motion.button
                        aria-label="Close modal"
                        className="absolute inset-0 cursor-default bg-void/75 backdrop-blur-md"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Panel */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? "modal-title" : undefined}
                        className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-[0_32px_80px_rgba(0,0,0,0.4)]"
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Gradient top accent */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-signature opacity-40" />

                        {/* Header */}
                        {title && (
                            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
                                <h2
                                    id="modal-title"
                                    className="font-display text-lg font-bold tracking-[-0.03em] text-ink"
                                >
                                    {title}
                                </h2>
                                <button
                                    type="button"
                                    aria-label="Close modal"
                                    onClick={onClose}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-muted transition-all hover:border-[var(--color-border-strong)] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                                >
                                    <X size={15} strokeWidth={2} />
                                </button>
                            </div>
                        )}

                        <div className="p-6">
                            {!title && (
                                <button
                                    type="button"
                                    aria-label="Close modal"
                                    onClick={onClose}
                                    className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-muted transition-all hover:text-ink"
                                >
                                    <X size={15} strokeWidth={2} />
                                </button>
                            )}
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}