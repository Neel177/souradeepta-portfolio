"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";
import { resolveIcon } from "@/lib/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerFast, slideUp, viewportOnce } from "@/lib/animations";

/* Per-category accent colors */
const categoryAccents = [
    {
        icon: "text-cyan",
        bar: "from-cyan/40 to-transparent",
        chip: "border-cyan/20 hover:border-cyan/50 hover:text-cyan",
        glow: "hover:shadow-glow-cyan",
    },
    {
        icon: "text-violet",
        bar: "from-violet/40 to-transparent",
        chip: "border-violet/20 hover:border-violet/50 hover:text-violet",
        glow: "hover:shadow-glow-violet",
    },
    {
        icon: "text-indigo",
        bar: "from-indigo/40 to-transparent",
        chip: "border-indigo/20 hover:border-indigo/50 hover:text-indigo",
        glow: "hover:shadow-glow-violet",
    },
    {
        icon: "text-coral",
        bar: "from-coral/40 to-transparent",
        chip: "border-coral/20 hover:border-coral/50 hover:text-coral",
        glow: "",
    },
    {
        icon: "text-amber",
        bar: "from-amber/40 to-transparent",
        chip: "border-amber/20 hover:border-amber/50 hover:text-amber",
        glow: "hover:shadow-glow-amber",
    },
    {
        icon: "text-emerald",
        bar: "from-emerald/40 to-transparent",
        chip: "border-emerald/20 hover:border-emerald/50 hover:text-emerald",
        glow: "",
    },
];

export function Skills() {
    return (
        <section id="skills" className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
            <div className="mx-auto max-w-6xl">
                <SectionHeading
                    eyebrow="The toolkit"
                    title="Curious by nature. Precise by practice."
                    description="A working set of languages, platforms, and physical systems used to turn ideas into useful things."
                />

                <motion.div
                    variants={staggerFast()}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportOnce}
                    className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {skillCategories.map((category, index) => {
                        const Icon = resolveIcon(category.icon);
                        const accent = categoryAccents[index % categoryAccents.length];

                        return (
                            <motion.div
                                key={category.name}
                                variants={slideUp}
                                className={`group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-border-strong)] sm:p-7 ${accent.glow}`}
                            >
                                {/* Gradient accent bar */}
                                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent.bar}`} />

                                {/* Header */}
                                <div className="flex items-center justify-between">
                                    <Icon size={22} strokeWidth={1.5} className={accent.icon} />
                                    <span className="font-mono text-[10px] tracking-[0.12em] text-muted">
                                        0{index + 1}
                                    </span>
                                </div>

                                <h3 className="mt-8 font-display text-lg font-semibold tracking-[-0.025em] text-ink">
                                    {category.name}
                                </h3>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className={`rounded-full border px-2.5 py-1 text-xs text-muted transition-all duration-200 ${accent.chip}`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}