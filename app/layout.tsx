import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
    title: "Souradeepta Das — CS Educator & Full-Stack Engineer",
    description:
        "Portfolio of Souradeepta Das — full-stack engineer, computer science educator, and robotics builder. Live ERP platforms, Android apps, web development, and IoT projects from Midnapore, India.",
    keywords: [
        "Souradeepta Das",
        "full-stack engineer",
        "computer science educator",
        "Next.js",
        "React",
        "Android",
        "robotics",
        "ERP",
        "Midnapore",
    ],
    authors: [{ name: "Souradeepta Das" }],
    creator: "Souradeepta Das",
    openGraph: {
        title: "Souradeepta Das — CS Educator & Full-Stack Engineer",
        description:
            "Building production software and teaching the next generation to build it too.",
        type: "website",
        locale: "en_IN",
    },
    robots: "index, follow",
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.svg",
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="theme-color" content="#08080e" media="(prefers-color-scheme: dark)" />
                <meta name="theme-color" content="#f7f6f3" media="(prefers-color-scheme: light)" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}