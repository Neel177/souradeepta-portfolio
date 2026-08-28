import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";

const typeStyles = {
    work: {
        icon: "text-amber bg-amber/10 border-amber/20",
        accentStyle: { borderLeftColor: "var(--color-amber)" },
        pill: "bg-amber/10 text-amber border-amber/20",
        bullet: "bg-amber",
    },
    education: {
        icon: "text-violet bg-violet/10 border-violet/20",
        accentStyle: { borderLeftColor: "var(--color-violet)" },
        pill: "bg-violet/10 text-violet border-violet/20",
        bullet: "bg-violet",
    },
};

export function Experience() {
    return (
        <section id="experience" className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
            <div className="mx-auto max-w-6xl">
                <SectionHeading
                    eyebrow="The path so far"
                    title="Where teaching meets making."
                    description="An evolving practice built through classrooms, coursework, and software shipped for real people."
                />

                <div className="relative mt-14 space-y-0">
                    {/* Timeline line — gradient */}
                    <div className="absolute bottom-4 left-[1.35rem] top-4 w-px bg-gradient-to-b from-amber/60 via-violet/40 to-violet/20 sm:left-[1.85rem]" />

                    {experience.map((item) => {
                        const style = typeStyles[item.type];
                        const Icon = item.type === "work" ? BriefcaseBusiness : GraduationCap;

                        return (
                            <SectionReveal key={item.id} className="relative pb-10 pl-12 last:pb-0 sm:pl-16">
                                {/* Icon node */}
                                <span className={`absolute left-0 top-0 flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-full border bg-[var(--color-surface)] ${style.icon}`}>
                                    <Icon size={14} strokeWidth={1.8} />
                                </span>

                                {/* Card */}
                                <div
                                    className="rounded-2xl border border-[var(--color-border)] border-l-2 bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-border-strong)] sm:p-6"
                                    style={style.accentStyle}
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <span className={`inline-block rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] ${style.pill}`}>
                                                {item.type}
                                            </span>
                                            <h3 className="mt-2 font-display text-lg font-bold tracking-[-0.025em] text-ink">
                                                {item.role}
                                            </h3>
                                            <p className="mt-1 text-sm text-muted">{item.organization}</p>
                                        </div>
                                        <span className="shrink-0 rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[10px] text-muted">
                                            {item.period}
                                        </span>
                                    </div>

                                    {item.description && (
                                        <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
                                    )}

                                    {item.bullets.length > 0 && (
                                        <ul className="mt-4 grid gap-2">
                                            {item.bullets.map((bullet) => (
                                                <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-ink/70">
                                                    <span className={`mt-[9px] h-1 w-1 shrink-0 rounded-full ${style.bullet}`} />
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </SectionReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}