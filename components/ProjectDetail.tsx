"use client";

import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";
import { linkValue } from "@/lib/content";
import { Modal } from "@/components/ui/Modal";
import { ProjectMedia } from "@/components/ProjectMedia";

interface ProjectDetailProps {
    project: Project | null;
    onClose: () => void;
}

const sections: Array<[string, keyof Project]> = [
    ["The problem", "problem"],
    ["What I built", "whatIBuilt"],
    ["Technical implementation", "technicalImplementation"],
    ["Architecture", "architectureOverview"],
];

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
    return (
        <Modal open={Boolean(project)} onClose={onClose} title={project?.title}>
            {project && (
                <div className="max-h-[65vh] overflow-y-auto pr-1 no-scrollbar">
                    <ProjectMedia src={project.coverImage} alt={`${project.title} preview`} />

                    {/* Meta row */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                            {project.category}
                        </span>
                        <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                            {project.year}
                        </span>
                    </div>

                    <p className="mt-4 text-[14px] leading-6 text-muted">{project.description}</p>

                    {/* Technologies */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-cyan/20 bg-cyan/10 px-2 py-0.5 text-[11px] font-medium text-cyan"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Detail sections */}
                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        {sections.map(([label, key]) => (
                            <div key={label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4">
                                <h3 className="font-mono text-[9px] uppercase tracking-[0.18em] text-cyan">
                                    {label}
                                </h3>
                                <p className="mt-2 text-[13px] leading-5 text-ink/75">
                                    {project[key] as string}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Capabilities */}
                    <div className="mt-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4">
                        <h3 className="font-mono text-[9px] uppercase tracking-[0.18em] text-violet">
                            Capabilities
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {project.features.map((feature) => (
                                <span
                                    key={feature}
                                    className="rounded-full border border-violet/20 bg-violet/10 px-2.5 py-1 text-xs text-violet/90"
                                >
                                    {feature}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    {(project.live || project.github) && (
                        <div className="mt-5 flex flex-wrap gap-3">
                            {project.live && (
                                <a
                                    href={linkValue(project.live)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-void transition-opacity hover:opacity-80"
                                >
                                    Open live site
                                    <ExternalLink size={12} strokeWidth={2} />
                                </a>
                            )}
                            {project.github && (
                                <a
                                    href={linkValue(project.github)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-xs text-ink transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)]"
                                >
                                    <Github size={12} />
                                    GitHub
                                </a>
                            )}
                        </div>
                    )}
                </div>
            )}
        </Modal>
    );
}