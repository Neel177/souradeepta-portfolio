import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { displayValue, linkValue } from "@/lib/content";
import { SectionReveal } from "@/components/SectionReveal";
import { GradientButton } from "@/components/ui/GradientButton";

const contactDetails = [
    { Icon: Mail, label: "Email", value: displayValue(profile.email), href: linkValue(profile.email), accent: "text-cyan" },
    { Icon: Phone, label: "Phone", value: profile.phone, href: undefined, accent: "text-violet" },
    { Icon: MapPin, label: "Location", value: profile.location, href: undefined, accent: "text-coral" },
];

export function Contact() {
    const email = profile.socials.find((s) => s.label === "Email");
    const github = profile.socials.find((s) => s.label === "GitHub");
    const linkedin = profile.socials.find((s) => s.label === "LinkedIn");

    return (
        <section
            id="contact"
            className="relative overflow-hidden px-5 py-28 sm:px-8 lg:px-10 lg:py-40"
        >
            {/* Ambient gradient background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[40rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.07)_0%,transparent_60%)] blur-3xl" />
                <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-violet/10 blur-3xl" />
                <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-cyan/6 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl">
                <SectionReveal>
                    <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-cyan/90">
                        Open to good questions
                    </p>
                    <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.8rem,7vw,5rem)] font-bold leading-[0.98] tracking-[-0.055em] text-ink">
                        Let&apos;s build something
                        <br />
                        <span className="bg-gradient-signature bg-clip-text text-transparent">meaningful</span>
                        <span className="text-cyan">.</span>
                    </h2>

                    <p className="mt-6 max-w-xl text-[15px] leading-7 text-muted">
                        Whether you have a project to build, a class to teach, or just a good question — reach out. I&apos;d love to hear from you.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-3">
                        <GradientButton href={email ? linkValue(email.url) : "#top"} className="px-6 py-3.5 text-sm">
                            Send an email
                            <ArrowUpRight size={15} strokeWidth={2} />
                        </GradientButton>
                        <GradientButton
                            href={profile.resumeFile}
                            variant="outline"
                            className="px-6 py-3.5 text-sm"
                        >
                            View resume
                        </GradientButton>
                    </div>
                </SectionReveal>

                {/* Contact details */}
                <SectionReveal className="mt-16 grid gap-0 border-y border-[var(--color-border)] sm:grid-cols-3">
                    {contactDetails.map(({ Icon, label, value, href, accent }) => (
                        <div
                            key={label}
                            className="flex gap-4 border-b border-[var(--color-border)] py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
                        >
                            <Icon size={16} strokeWidth={1.8} className={`mt-0.5 shrink-0 ${accent}`} />
                            <div className="min-w-0">
                                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                                    {label}
                                </p>
                                {href ? (
                                    <a href={href} className="mt-2 block break-all text-sm text-ink transition-colors hover:text-cyan">
                                        {value}
                                    </a>
                                ) : (
                                    <p className="mt-2 text-sm text-ink">{value}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </SectionReveal>

                {/* Social links */}
                <SectionReveal className="mt-6 flex items-center gap-5">
                    {github && (
                        <a
                            href={linkValue(github.url)}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] text-muted transition-all hover:border-[var(--color-border-strong)] hover:text-ink"
                        >
                            <Github size={17} />
                        </a>
                    )}
                    {linkedin && (
                        <a
                            href={linkValue(linkedin.url)}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] text-muted transition-all hover:border-[var(--color-border-strong)] hover:text-ink"
                        >
                            <Linkedin size={17} />
                        </a>
                    )}
                </SectionReveal>
            </div>
        </section>
    );
}