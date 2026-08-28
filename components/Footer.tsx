import { ArrowUp, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/profile";
import { linkValue } from "@/lib/content";

export function Footer() {
    const socials = profile.socials.filter((s) => s.label !== "Email");

    return (
        <footer className="relative border-t border-[var(--color-border)] px-5 py-10 sm:px-8 lg:px-10">
            {/* Gradient top border */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-signature opacity-30" />

            <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                {/* Left: identity */}
                <div>
                    <p className="font-display text-sm font-semibold tracking-[-0.02em] text-ink">
                        {profile.name}
                        <span className="text-violet">.</span>
                    </p>
                    <p className="mt-1 text-xs text-muted">{profile.role}</p>
                </div>

                {/* Center: copyright */}
                <p className="order-last text-xs text-muted sm:order-none">
                    © {new Date().getFullYear()} {profile.name}
                </p>

                {/* Right: socials + back to top */}
                <div className="flex items-center gap-4">
                    {socials.map((social) => {
                        const Icon = social.label === "GitHub" ? Github : Linkedin;
                        return (
                            <a
                                key={social.label}
                                href={linkValue(social.url)}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={social.label}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-muted transition-all hover:border-[var(--color-border-strong)] hover:text-ink"
                            >
                                <Icon size={14} />
                            </a>
                        );
                    })}
                    <a
                        href="#top"
                        aria-label="Back to top"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-muted transition-all hover:border-[var(--color-border-strong)] hover:text-ink"
                    >
                        <ArrowUp size={14} />
                    </a>
                </div>
            </div>
        </footer>
    );
}