import { Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { displayValue, linkValue } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionReveal } from "@/components/SectionReveal";

const contactDetails = [
    {
        Icon: MapPin,
        label: "Location",
        value: profile.location,
        href: undefined,
        accent: "text-coral",
        borderStyle: { borderLeftColor: "var(--color-coral)" },
    },
    {
        Icon: Mail,
        label: "Email",
        value: displayValue(profile.email),
        href: linkValue(profile.email),
        accent: "text-cyan",
        borderStyle: { borderLeftColor: "var(--color-cyan)" },
    },
    {
        Icon: Phone,
        label: "Phone",
        value: profile.phone,
        href: undefined,
        accent: "text-violet",
        borderStyle: { borderLeftColor: "var(--color-violet)" },
    },
];

export function About() {
    return (
        <section id="about" className="border-t border-[var(--color-border)] px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">

                    <SectionHeading
                        eyebrow="A little context"
                        title="Building with purpose, teaching with patience."
                    />

                    <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:gap-14">
                        <SectionReveal>
                            <p className="font-display text-xl leading-9 tracking-[-0.025em] text-ink/80 sm:text-2xl sm:leading-10">
                                {profile.bio}
                            </p>
                            <p className="mt-6 text-[15px] leading-7 text-muted">
                                Currently pursuing a B.Ed. alongside active software development — bringing the same rigour to pedagogy as to production code.
                            </p>
                        </SectionReveal>

                        {/* Contact details */}
                        <SectionReveal className="flex flex-col gap-0">
                            {contactDetails.map(({ Icon, label, value, href, accent, borderStyle }) => (
                                <div
                                    key={label}
                                    className="border-b border-[var(--color-border)] border-l-2 py-5 pl-4 last:border-b-0"
                                    style={borderStyle}
                                >
                                    <div className="flex items-start gap-3">
                                        <Icon size={15} strokeWidth={1.8} className={`mt-0.5 shrink-0 ${accent}`} />
                                        <div className="min-w-0">
                                            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                                                {label}
                                            </p>
                                            {href ? (
                                                <a
                                                    href={href}
                                                    className="mt-1.5 block break-all text-sm text-ink transition-colors hover:text-cyan"
                                                >
                                                    {value}
                                                </a>
                                            ) : (
                                                <p className="mt-1.5 text-sm text-ink">{value}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </SectionReveal>
                    </div>
                </div>
            </div>
        </section>
    );
}