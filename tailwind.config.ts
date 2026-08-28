import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./sections/**/*.{ts,tsx}",
        "./data/**/*.{ts,tsx}",
        "./ui/**/*.{ts,tsx}",
        "./lib/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                void: "var(--color-void)",
                surface: "var(--color-surface)",
                surface2: "var(--color-surface-2)",
                border: "var(--color-border)",
                borderStrong: "var(--color-border-strong)",
                ink: "var(--color-ink)",
                muted: "var(--color-muted)",
                cyan: "var(--color-cyan)",
                violet: "var(--color-violet)",
                rose: "var(--color-rose)",
                amber: "var(--color-amber)",
                coral: "var(--color-coral)",
                emerald: "var(--color-emerald)",
                indigo: "var(--color-indigo)",
            },
            fontFamily: {
                display: ["var(--font-display)", "sans-serif"],
                body: ["var(--font-body)", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
            backgroundImage: {
                "gradient-signature": "linear-gradient(135deg, #a78bfa 0%, #22d3ee 50%, #34d399 100%)",
                "gradient-signature-2": "linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)",
                "gradient-radial-glow": "radial-gradient(circle at center, rgba(167,139,250,0.2) 0%, rgba(34,211,238,0.06) 45%, transparent 70%)",
                "gradient-hero": "var(--gradient-hero-night)",
            },
            boxShadow: {
                glow: "0 0 40px rgba(167,139,250,0.3)",
                "glow-cyan": "0 0 32px rgba(34,211,238,0.2)",
                "glow-violet": "0 0 32px rgba(167,139,250,0.25)",
                "glow-amber": "0 0 32px rgba(251,191,36,0.2)",
                "card": "0 1px 3px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)",
                "card-hover": "0 4px 24px rgba(0,0,0,0.22), 0 1px 4px rgba(0,0,0,0.1)",
            },
            animation: {
                "trace-draw": "traceDraw 2.4s ease-out forwards",
                float: "float 6s ease-in-out infinite",
                "shimmer": "shimmer 2s linear infinite",
                "pulse-slow": "pulse 4s ease-in-out infinite",
                "spin-slow": "spin 12s linear infinite",
            },
            keyframes: {
                traceDraw: {
                    from: { strokeDashoffset: "1" },
                    to: { strokeDashoffset: "0" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-8px)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
            },
            transitionTimingFunction: {
                "spring": "cubic-bezier(0.22, 1, 0.36, 1)",
                "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
            },
        },
    },
    plugins: [],
};

export default config;