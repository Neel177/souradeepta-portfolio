"use client";

import { ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { featuredFirst } from "@/data/projects";
import type { Project } from "@/types";
import { linkValue } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectDetail } from "@/components/ProjectDetail";
import { LiveProjectPreview } from "@/components/LiveProjectPreview";
import { staggerFast, slideUp, viewportOnce } from "@/lib/animations";

/* Per-project gradient covers and accent colors */
const projectStyles: Record<string, { gradient: string; accent: string; tech: string; bullet: string }> = {
    "cgc-erp-platform": {
        gradient: "from-violet/25 via-[var(--color-surface-2)] to-indigo/15",
        accent: "text-violet",
        tech: "bg-violet/10 text-violet border-violet/20",
        bullet: "bg-violet",
    },
    "hari-bhanga": {
        gradient: "from-cyan/25 via-[var(--color-surface-2)] to-emerald/15",
        accent: "text-cyan",
        tech: "bg-cyan/10 text-cyan border-cyan/20",
        bullet: "bg-cyan",
    },
    "android-mock-test-app": {
        gradient: "from-coral/20 via-[var(--color-surface-2)] to-amber/15",
        accent: "text-coral",
        tech: "bg-coral/10 text-coral border-coral/20",
        bullet: "bg-coral",
    },
    "college-admission-portal": {
        gradient: "from-indigo/20 via-[var(--color-surface-2)] to-violet/10",
        accent: "text-indigo",
        tech: "bg-indigo/10 text-indigo border-indigo/20",
        bullet: "bg-indigo",
    },
};

const fallbackStyle = {
    gradient: "from-violet/20 via-[var(--color-surface-2)] to-cyan/10",
    accent: "text-violet",
    tech: "bg-violet/10 text-violet border-violet/20",
    bullet: "bg-violet",
};

export function Projects() {
    const [selected, setSelected] = useState<Project | null>(null);

    return (
        <section id="projects" className="border-t border-[var(--color-border)] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
            <div className="mx-auto max-w-6xl">
                <SectionHeading
                    eyebrow="Selected work"
                    title="Software that earns its place."
                    description="A body of production-minded work across education, administration, mobile learning, and shared living."
                />

                <motion.div
                    variants={staggerFast(0.1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportOnce}
                    className="mt-12 grid gap-5 lg:grid-cols-2"
                >
                    {featuredFirst.map((project) => {
                        const style = projectStyles[project.slug] ?? fallbackStyle;

                        return (
                            <motion.article
                                key={project.slug}
                                variants={slideUp}
                                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:shadow-card-hover"
                            >
                                {/* Preview */}
                                <div className="relative overflow-hidden">
                                    <LiveProjectPreview
                                        live={project.live}
                                        fallbackSrc={project.coverImage || project.screenshots[0]}
                                        alt={`${project.title} preview`}
                                        gradientClass={style.gradient}
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-1 flex-col p-6 sm:p-7">
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className={`font-mono text-[9px] uppercase tracking-[0.18em] ${style.accent}`}>
                                                {project.category}
                                            </p>
                                            <h3 className="mt-2 font-display text-xl font-bold tracking-[-0.03em] text-ink sm:text-2xl">
                                                {project.title}
                                            </h3>
                                        </div>
                                        <span className="shrink-0 font-mono text-xs text-muted">{project.year}</span>
                                    </div>

                                    {/* Description */}
                                    <p className="mt-3 text-[14px] leading-6 text-muted sm:text-sm sm:leading-7">
                                        {project.description}
                                    </p>

                                    {/* Tech stack */}
                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${style.tech}`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Highlights */}
                                    <div className="mt-5 border-t border-[var(--color-border)] pt-4">
                                        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                                            Engineering highlights
                                        </p>
                                        <ul className="mt-2.5 grid gap-1.5">
                                            {project.highlights.slice(0, 2).map((h) => (
                                                <li key={h} className="flex items-start gap-2 text-[13px] leading-5 text-ink/70">
                                                    <span className={`mt-[5px] h-1 w-1 shrink-0 rounded-full ${style.bullet}`} />
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-auto flex flex-wrap items-center gap-4 pt-5">
                                        <button
                                            type="button"
                                            onClick={() => setSelected(project)}
                                            className={`inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors ${style.accent} hover:opacity-75 focus-visible:outline-none`}
                                        >
                                            Case study
                                            <ArrowUpRight size={14} strokeWidth={2} />
                                        </button>
                                        {project.live && (
                                            <a
                                                href={linkValue(project.live)}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
                                            >
                                                View live
                                                <ArrowUpRight size={12} strokeWidth={1.8} />
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={linkValue(project.github)}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label={`${project.title} GitHub`}
                                                className="text-muted transition-colors hover:text-ink"
                                            >
                                                <Github size={15} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </div>

            <ProjectDetail project={selected} onClose={() => setSelected(null)} />
        </section>
    );
}