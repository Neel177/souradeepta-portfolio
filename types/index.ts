export interface Project {
    slug: string;
    title: string;
    category: string;
    description: string;
    coverImage: string;
    screenshots: string[];
    highlights: string[];
    technologies: string[];
    github?: string;
    live?: string;
    featured?: boolean;
    year: string;
    problem: string;
    whatIBuilt: string;
    technicalImplementation: string;
    architectureOverview: string;
    challengesSolved: string[];
    features: string[];
}

export interface SkillCategory {
    name: string;
    icon: string;
    skills: string[];
}

export interface ExperienceItem {
    id: string;
    role: string;
    organization: string;
    period: string;
    description: string;
    bullets: string[];
    type: "work" | "education";
}

export interface Achievement {
    id: string;
    title: string;
    issuer: string;
    year: string;
    description?: string;
}

export interface SocialLink {
    label: string;
    url: string;
    icon: string;
}

export interface ProfileData {
    name: string;
    role: string;
    tagline: string;
    bio: string;
    location: string;
    email: string;
    phone: string;
    photo: string;
    resumeFile: string;
    socials: SocialLink[];
    orbitTech: string[];
    stats: Array<{ label: string; value: string }>;
}