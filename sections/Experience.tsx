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
    const work = experience.filter((item) => item.type === "work");
    const higherEducation = experience.filter((item) => item.educationLevel === "higher");
    const schoolEducation = experience.filter((item) => item.educationLevel === "school");

    return (
        <section id="experience" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto max-w-6xl">
                <SectionHeading
                    eyebrow="The path so far"
                    title="Where teaching meets making."
                    description="An evolving practice built through classrooms, coursework, and software shipped for real people."
                />

                <div className="relative mt-10 space-y-0 sm:mt-12">
                    {/* Timeline line — gradient */}
                    <div className="absolute bottom-4 left-[1.35rem] top-4 w-px bg-gradient-to-b from-amber/60 via-violet/40 to-violet/20 sm:left-[1.85rem]" />

                    {work.map((item) => {
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
                                    className="rounded-[1.25rem] border border-[var(--color-border)] border-l-2 bg-[var(--color-surface)] p-5 transition-colors duration-200 hover:border-[var(--color-border-strong)] sm:p-6"
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

                <div className="mt-16 border-t border-[var(--color-border)] pt-10 sm:mt-20 sm:pt-12">
                    <div className="max-w-2xl">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet">Academic record</p>
                        <h3 className="mt-3 font-display text-2xl font-bold tracking-[-0.035em] text-ink sm:text-3xl">
                            Education &amp; Qualifications
                        </h3>
                    </div>

                    <div className="mt-9">
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Higher education</p>
                        <div className="grid gap-4 md:grid-cols-2">
                            {higherEducation.map((item) => (
                                <SectionReveal key={item.id} className="h-full">
                                    <article className="h-full rounded-2xl border border-[var(--color-border)] border-l-2 border-l-violet bg-[var(--color-surface)] p-5 sm:p-6">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h4 className="font-display text-base font-bold tracking-[-0.02em] text-ink sm:text-lg">{item.role}</h4>
                                                <p className="mt-1.5 text-sm leading-6 text-muted">{item.organization}</p>
                                            </div>
                                            <span className="shrink-0 rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[10px] text-muted">{item.period}</span>
                                        </div>
                                        {item.description && <p className="mt-3 text-[13px] leading-5 text-muted">{item.description}</p>}
                                        <p className="mt-4 border-t border-[var(--color-border)] pt-3 text-xs text-muted">
                                            Marks/CGPA: <span className="ml-2 font-semibold text-ink">{item.result}</span>
                                        </p>
                                    </article>
                                </SectionReveal>
                            ))}
                        </div>
                    </div>

                    <div className="mt-9">
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">School education</p>
                        <div className="grid gap-4 md:grid-cols-2">
                            {schoolEducation.map((item) => (
                                <SectionReveal key={item.id} className="h-full">
                                    <article className="h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)]/70 p-5 sm:p-6">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h4 className="font-display text-base font-bold tracking-[-0.02em] text-ink sm:text-lg">{item.role}</h4>
                                                <p className="mt-1.5 text-sm leading-6 text-muted">{item.organization}</p>
                                            </div>
                                            <span className="shrink-0 rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[10px] text-muted">{item.period}</span>
                                        </div>
                                        <p className="mt-4 border-t border-[var(--color-border)] pt-3 text-xs text-muted">
                                            Marks <span className="ml-2 font-semibold text-ink">{item.result}</span>
                                        </p>
                                    </article>
                                </SectionReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
