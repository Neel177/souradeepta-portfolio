import { Award, Code2, GraduationCap, Rocket } from "lucide-react";
import { achievements } from "@/data/achievements";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";

/* Per-achievement styling */
const achievementStyles: Record<string, {
    Icon: typeof Award;
    iconClass: string;
    bg: string;
    border: string;
    year: string;
}> = {
    "agile-cert": {
        Icon: Award,
        iconClass: "text-violet",
        bg: "bg-violet/10",
        border: "border-violet/20",
        year: "bg-violet/10 text-violet border-violet/20",
    },
    "cgc-erp-live": {
        Icon: Rocket,
        iconClass: "text-cyan",
        bg: "bg-cyan/10",
        border: "border-cyan/20",
        year: "bg-cyan/10 text-cyan border-cyan/20",
    },
    "msc-cgpa": {
        Icon: GraduationCap,
        iconClass: "text-emerald",
        bg: "bg-emerald/10",
        border: "border-emerald/20",
        year: "bg-emerald/10 text-emerald border-emerald/20",
    },
    "bsc-cgpa": {
        Icon: Code2,
        iconClass: "text-amber",
        bg: "bg-amber/10",
        border: "border-amber/20",
        year: "bg-amber/10 text-amber border-amber/20",
    },
};

const fallbackStyle = {
    Icon: Award,
    iconClass: "text-rose",
    bg: "bg-rose/10",
    border: "border-rose/20",
    year: "bg-rose/10 text-rose border-rose/20",
};

export function Achievements() {
    return (
        <section
            id="achievements"
            className="border-t border-[var(--color-border)] px-5 py-24 sm:px-8 lg:px-10 lg:py-32"
        >
            <div className="mx-auto max-w-6xl">
                <SectionHeading
                    eyebrow="Milestones"
                    title="Small markers of meaningful progress."
                />

                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                    {achievements.map((achievement) => {
                        const s = achievementStyles[achievement.id] ?? fallbackStyle;
                        const Icon = s.Icon;

                        return (
                            <SectionReveal key={achievement.id}>
                                <div
                                    className={`group flex gap-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:shadow-card sm:p-6 ${s.border} bg-[var(--color-surface)]`}
                                >
                                    {/* Icon */}
                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.bg}`}>
                                        <Icon size={18} strokeWidth={1.6} className={s.iconClass} />
                                    </div>

                                    {/* Content */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="font-display text-[15px] font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-base">
                                                {achievement.title}
                                            </h3>
                                            <span className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] ${s.year}`}>
                                                {achievement.year}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs text-muted">{achievement.issuer}</p>
                                        {achievement.description && (
                                            <p className="mt-2 text-[13px] leading-5 text-ink/60">
                                                {achievement.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </SectionReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}