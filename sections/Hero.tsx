"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import {
    ArrowUpRight,
    Download,
    ExternalLink,
    MapPin,
} from "lucide-react";

import { profile } from "@/data/profile";
import {
    fadeIn,
    fadeUp,
    scaleIn,
    staggerContainer,
    viewportOnce,
} from "@/lib/animations";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GradientButton } from "@/components/ui/GradientButton";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Modal } from "@/components/ui/Modal";

/* Tech labels placed to the left of the portrait */
const techAnnotations = [
    { label: "Next.js", position: "top-4 right-full mr-4", delay: 0.8 },
    { label: "TypeScript", position: "top-20 right-full mr-4", delay: 0.9 },
    { label: "Kotlin", position: "bottom-24 right-full mr-4", delay: 1.0 },
    { label: "Arduino", position: "bottom-10 right-full mr-4", delay: 1.1 },
];

export function Hero() {
    const contactLink = profile.socials.find((s) => s.label === "Email");

    const [photoSrc, setPhotoSrc] = useState(profile.photo);
    const [photoMissing, setPhotoMissing] = useState(false);

    const [resumeOpen, setResumeOpen] = useState(false);

    return (
        <>
            <section
                id="top"
                className="relative overflow-x-clip px-5 pb-16 pt-28 sm:pb-20 sm:pt-36 lg:px-10 lg:pb-24 lg:pt-35"
            >
                {/* Ambient background gradients */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />

                <div className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.08)_0%,transparent_70%)] blur-3xl" />

                <div className="relative mx-auto w-full min-w-0 max-w-6xl">

                    {/* ──────── MOBILE HERO (hidden lg+) ──────── */}
                    <motion.div
                        variants={staggerContainer(0.08)}
                        initial="hidden"
                        animate="show"
                        className="lg:hidden"
                    >
                        {/* Identity row: portrait + name + status */}
                        <motion.div
                            variants={fadeUp}
                            className="flex items-center gap-4"
                        >
                            {/* Portrait — compact on mobile */}
                            <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">

                                {/* Glow ring */}
                                <div className="absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,var(--color-violet),var(--color-cyan),var(--color-emerald),var(--color-violet))] opacity-50 blur-[3px]" />

                                <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-surface-2)]">
                                    {!photoMissing && (
                                        <Image
                                            src={photoSrc}
                                            alt={`${profile.name} profile photo`}
                                            fill
                                            sizes="64px"
                                            className="object-cover"
                                            priority
                                            onError={() =>
                                                photoSrc === profile.photo
                                                    ? setPhotoSrc("/photo.jpg")
                                                    : setPhotoMissing(true)
                                            }
                                        />
                                    )}

                                    {photoMissing && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface-2)]">
                                            <span className="font-mono text-[8px] uppercase tracking-widest text-muted">
                                                SD
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Name + location */}
                            <div className="min-w-0">
                                <p className="font-display text-[15px] font-semibold leading-tight tracking-[-0.02em] text-ink">
                                    {profile.name}
                                </p>

                                <div className="mt-1 flex items-center gap-1.5 text-muted">
                                    <MapPin
                                        size={10}
                                        strokeWidth={1.8}
                                        className="shrink-0"
                                    />

                                    <p className="truncate font-mono text-[10px] uppercase tracking-[0.1em]">
                                        {profile.location.split(",")[0]}
                                    </p>
                                </div>
                            </div>

                            {/* Status chip */}
                            <div className="ml-auto shrink-0">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-emerald">
                                    <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-emerald" />
                                    Open
                                </span>
                            </div>
                        </motion.div>

                        {/* Eyebrow */}
                        <motion.p
                            variants={fadeUp}
                            className="mt-7 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan/90"
                        >
                            Computer Science · Software · Education
                        </motion.p>

                        {/* Headline */}
                        <motion.h1
                            variants={fadeUp}
                            className="mt-3 min-w-0 break-words font-display text-[clamp(2.5rem,10vw,3.8rem)] font-bold leading-[0.96] tracking-[-0.05em] text-ink"
                        >
                            CS Educator
                            <br />
                            <span className="text-ink/60">&amp;</span>{" "}
                            <span className="bg-gradient-signature bg-clip-text text-transparent">
                                Full-Stack
                            </span>
                            <br />
                            Engineer<span className="text-cyan">.</span>
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            variants={fadeUp}
                            className="mt-5 max-w-sm font-display text-[15px] leading-7 text-ink/75"
                        >
                            {profile.tagline}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-7 flex flex-wrap items-center gap-3"
                        >
                            {contactLink && (
                                <MagneticButton
                                    type="button"
                                    strength={8}
                                    onClick={() => {
                                        window.location.href = contactLink.url;
                                    }}
                                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-void transition-all hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                                >
                                    Start a conversation
                                    <ArrowUpRight
                                        size={14}
                                        strokeWidth={2}
                                    />
                                </MagneticButton>
                            )}

                            {/* Mobile resume button */}
                            <button
                                type="button"
                                onClick={() => setResumeOpen(true)}
                                className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] px-5 py-3 text-sm font-semibold text-muted transition-all hover:border-cyan hover:bg-[var(--color-surface-2)] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                            >
                                View resume
                                <ExternalLink
                                    size={13}
                                    strokeWidth={1.8}
                                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                />
                            </button>
                        </motion.div>
                    </motion.div>


                    {/* ──────── DESKTOP HERO (hidden below lg) ──────── */}
                    <div className="hidden min-h-[36rem] items-start gap-16 lg:grid lg:grid-cols-[1fr_auto] xl:gap-20">

                        {/* Left: text */}
                        <motion.div
                            variants={staggerContainer(0.1)}
                            initial="hidden"
                            animate="show"
                            className="flex flex-col justify-center pt-0"
                        >
                            <motion.p
                                variants={fadeUp}
                                className="font-mono text-[10px] uppercase tracking-[0.26em] text-cyan/90"
                            >
                                Computer Science · Software · Education
                            </motion.p>

                            <motion.h1
                                variants={fadeUp}
                                className="mt-6 max-w-2xl font-display text-[clamp(3.5rem,5.5vw,5.5rem)] font-bold leading-[0.94] tracking-[-0.055em] text-ink"
                            >
                                Computer
                                <br />
                                Science
                                <br />
                                <span className="text-ink/50">
                                    Educator &
                                </span>
                                <br />
                                <span className="bg-gradient-signature bg-clip-text text-transparent">
                                    Full-Stack
                                </span>
                                <br />
                                Engineer<span className="text-cyan">.</span>
                            </motion.h1>

                            <motion.p
                                variants={fadeUp}
                                className="mt-8 max-w-xl font-display text-lg leading-8 text-ink/75 xl:text-xl xl:leading-9"
                            >
                                {profile.tagline}
                            </motion.p>

                            <motion.p
                                variants={fadeUp}
                                className="mt-3 max-w-xl text-[15px] leading-7 text-muted"
                            >
                                {profile.bio}
                            </motion.p>

                            <motion.div
                                variants={fadeUp}
                                className="mt-9 flex flex-wrap items-center gap-3"
                            >
                                {contactLink && (
                                    <MagneticButton
                                        type="button"
                                        strength={12}
                                        onClick={() => {
                                            window.location.href =
                                                contactLink.url;
                                        }}
                                        className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-void transition-all hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                                    >
                                        Start a conversation
                                        <ArrowUpRight
                                            size={15}
                                            strokeWidth={2}
                                        />
                                    </MagneticButton>
                                )}

                                {/* Desktop resume button */}
                                <button
                                    type="button"
                                    onClick={() => setResumeOpen(true)}
                                    className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] px-6 py-3.5 text-sm font-semibold text-muted transition-all hover:border-cyan hover:bg-[var(--color-surface-2)] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                                >
                                    View resume

                                    <ExternalLink
                                        size={14}
                                        strokeWidth={1.8}
                                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                </button>
                            </motion.div>
                        </motion.div>


                        {/* Right: portrait */}
                        <motion.div
                            variants={scaleIn}
                            initial="hidden"
                            animate="show"
                            className="relative flex-shrink-0 self-start pt-4"
                        >
                            {/* Outer glow */}
                            <div className="pointer-events-none absolute inset-0 rounded-[40%] bg-[radial-gradient(circle_at_50%_40%,rgba(167,139,250,0.22),rgba(34,211,238,0.08)_55%,transparent_75%)] blur-3xl" />

                            <div className="relative w-[21rem] xl:w-[25rem]">

                                {/* Ambient circular glow */}
                                <div className="pointer-events-none absolute inset-[-3rem] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.18)_0%,rgba(34,211,238,0.08)_45%,transparent_70%)] blur-3xl" />

                                {/* Outer orbit ring */}
                                <div className="pointer-events-none absolute inset-[-1.8rem] rounded-full border border-[var(--color-border)]" />

                                {/* Second orbit ring */}
                                <div className="pointer-events-none absolute inset-[-1rem] rounded-full border border-cyan/20" />

                                {/* Main circular portrait */}
                                <div className="relative aspect-square w-full">

                                    {/* Gradient ring */}
                                    <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,var(--color-violet),var(--color-cyan),var(--color-emerald),var(--color-violet))] p-[3px]">

                                        {/* Dark inner border */}
                                        <div className="h-full w-full rounded-full bg-[var(--color-void)] p-[6px]">

                                            {/* Actual photo */}
                                            <div className="relative h-full w-full overflow-hidden rounded-full bg-[var(--color-surface-2)]">

                                                {!photoMissing && (
                                                    <Image
                                                        src={photoSrc}
                                                        alt={`${profile.name} profile photo`}
                                                        fill
                                                        sizes="(max-width: 1280px) 336px, 400px"
                                                        className="object-cover object-top"
                                                        priority
                                                        onError={() =>
                                                            photoSrc ===
                                                                profile.photo
                                                                ? setPhotoSrc(
                                                                    "/photo.jpg",
                                                                )
                                                                : setPhotoMissing(
                                                                    true,
                                                                )
                                                        }
                                                    />
                                                )}

                                                {photoMissing && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface-2)]">
                                                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                                                            Portrait pending
                                                        </span>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </div>


                                    {/* Portrait info — below the ring */}
                                    <div className="absolute left-0 right-0 top-full z-20 mt-5 text-center">
                                        <p className="font-display text-base font-semibold tracking-[-0.02em] text-ink">
                                            {profile.name}
                                        </p>

                                        <div className="mt-1.5 flex items-center justify-center gap-1.5 text-cyan">
                                            <MapPin
                                                size={11}
                                                strokeWidth={1.8}
                                            />

                                            <p className="font-mono text-[9px] uppercase tracking-[0.12em]">
                                                {profile.location}
                                            </p>
                                        </div>
                                    </div>


                                    {/* Available badge */}
                                    <div className="absolute -right-3 top-4 z-10">
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-[var(--color-surface)]/90 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald shadow-sm backdrop-blur-sm">
                                            <span className="h-1.5 w-1.5 animate-pulse-slow rounded-full bg-emerald" />
                                            Available
                                        </span>
                                    </div>

                                    {/* Orbit dots */}
                                    <span className="absolute -left-5 top-[28%] h-2 w-2 rounded-full bg-cyan shadow-glow-cyan" />
                                    <span className="absolute right-[-1.2rem] top-[38%] h-2 w-2 rounded-full bg-violet shadow-glow-violet" />
                                    <span className="absolute bottom-[8%] right-[8%] h-2 w-2 rounded-full bg-cyan shadow-glow-cyan" />

                                </div>


                                {/* Tech labels */}
                                {techAnnotations.map((tech) => (
                                    <motion.span
                                        key={tech.label}
                                        variants={fadeIn}
                                        initial="hidden"
                                        animate="show"
                                        transition={{ delay: tech.delay }}
                                        className={`absolute ${tech.position} whitespace-nowrap rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)]/80 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted shadow-sm backdrop-blur-sm`}
                                    >
                                        {tech.label}
                                    </motion.span>
                                ))}

                            </div>
                        </motion.div>
                    </div>


                    {/* ──────── STATS BAR ──────── */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                        className="mt-16 grid grid-cols-2 divide-x divide-[var(--color-border)] border-y border-[var(--color-border)] md:grid-cols-4 lg:mt-20"
                    >
                        {profile.stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="group px-5 py-6 transition-colors hover:bg-[var(--color-surface)] first:pl-0 last:pr-0 sm:px-7"
                            >
                                <p className="font-display text-3xl font-bold tracking-[-0.04em] text-ink sm:text-4xl">
                                    <AnimatedCounter value={stat.value} />
                                </p>

                                <p className="mt-2 max-w-[8rem] text-xs leading-5 text-muted">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>


            {/* ─────────────────────────────────────────────
                PREMIUM RESUME MODAL
            ───────────────────────────────────────────── */}
            <Modal
                open={resumeOpen}
                onClose={() => setResumeOpen(false)}
                title="Resume"
                className="max-w-5xl"
            >
                <div className="space-y-4">

                    {/* Resume header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="font-display text-sm font-semibold tracking-[-0.02em] text-ink">
                                {profile.name}
                            </p>

                            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                                Computer Science Educator · Full-Stack Engineer
                            </p>
                        </div>


                        {/* Resume actions */}
                        <div className="flex items-center gap-2">

                            {/* Download */}
                            <a
                                href={profile.resumeFile}
                                download
                                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted transition-all hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)] hover:text-ink"
                            >
                                <Download size={13} />
                                Download
                            </a>


                            {/* Open full PDF */}
                            <a
                                href={profile.resumeFile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-void transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                            >
                                Open full
                                <ExternalLink size={13} />
                            </a>

                        </div>
                    </div>


                    {/* Resume viewer */}
                    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-black/5 shadow-inner">

                        <iframe
                            src={`${profile.resumeFile}#view=FitH`}
                            title={`${profile.name} Resume`}
                            className="h-[72vh] min-h-[520px] w-full bg-white"
                        />

                    </div>

                </div>
            </Modal>
        </>
    );
}