import { Project } from "@/types";

export const projects: Project[] = [
    {
        slug: "cgc-erp-platform",
        title: "CGC ERP Platform",
        category: "Full Stack Web Application",
        description:
            "Production-grade ERP for student management, fee tracking, and administrative analytics — live at cgcmid.in.",
        coverImage: "/projects/cgc-erp/cover.png",
        screenshots: ["/projects/cgc-erp/1.png", "/projects/cgc-erp/2.png"],
        highlights: [
            "Secure authentication with role-based access control",
            "Automated fee management workflows",
            "Responsive glassmorphism UI with Framer Motion",
            "Administrative analytics dashboard",
        ],
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Supabase", "Vercel"],
        github: "",
        live: "[https://cgcmid.in](https://cgcmid.in/)",
        featured: true,
        year: "2026",
        problem:
            "Computer Guide Center managed student records, fee collection, and batch scheduling manually, with no unified system for owners, faculty, or students to track academic and financial data.",
        whatIBuilt:
            "A full-stack, live production ERP platform serving three distinct roles — owners, faculty, and students — with real-time fee tracking, student record management, and administrative analytics, all wrapped in a premium, animated interface.",
        technicalImplementation:
            "Built on Next.js App Router with TypeScript for type safety across the data layer. Prisma ORM models the relational schema (students, fees, batches, exams) against a Supabase Postgres database. Role-based access control gates every route and API call by user type. Framer Motion drives staggered dashboard reveals, animated counters, and ambient gradient backgrounds without touching business logic.",
        architectureOverview:
            "Server components handle data-heavy pages for fast initial loads; client components take over for interactive dashboards and forms. Supabase provides auth and Postgres; Prisma sits between the app and the database as the typed query layer. Deployed and continuously shipped on Vercel.",
        challengesSolved: [
            "Balancing Next.js server/client component boundaries while keeping animations smooth",
            "Designing a fee-automation workflow that stays accurate across partial payments and batch changes",
            "Building role-based access that scales cleanly as new roles were added",
        ],
        features: [
            "Owner, faculty, and student dashboards",
            "Fee tracking and automated reminders",
            "Batch and exam management",
            "Analytics overview for administrators",
        ],
    },
    {
        slug: "hari-bhanga",
        title: "Hari Bhanga",
        category: "Full Stack Web Application",
        description: "Multi-user mess management platform with role-based access and live sync.",
        coverImage: "/projects/hari-bhanga/cover.png",
        screenshots: ["/projects/hari-bhanga/1.png", "/projects/hari-bhanga/2.png"],
        highlights: [
            "Authentication system",
            "Role-based permissions",
            "Firestore security rules",
            "Invite-based onboarding",
            "Persistent user sessions",
        ],
        technologies: ["React", "Firebase", "Firestore"],
        github: "",
        live: "https://bit.ly/3UHNFWd",
        featured: false,
        year: "2025",
        problem:
            "Shared mess/meal management among multiple residents typically runs on manual ledgers, with no clear record of who owes what or who has access to modify shared data.",
        whatIBuilt:
            "A multi-user platform where residents are invited into a shared mess space, each governed by role-based permissions, with all shared data kept in sync in real time.",
        technicalImplementation:
            "React front end backed by Firebase Authentication and Firestore. Firestore security rules enforce per-role read/write access directly at the database layer rather than trusting the client. An invite-based onboarding flow issues scoped access without requiring an admin to manually provision every user.",
        architectureOverview:
            "Firestore acts as both the real-time data store and the access-control boundary via security rules, keeping the client thin and the permission logic centralized and auditable.",
        challengesSolved: [
            "Designing Firestore security rules that correctly enforce role boundaries without over-restricting legitimate access",
            "Keeping user sessions persistent across visits without compromising security",
            "Building an invite flow that onboards new users without manual admin steps",
        ],
        features: [
            "Multi-user mess management",
            "Role-based dashboards",
            "Invite-based onboarding",
            "Persistent sessions",
        ],
    },
    {
        slug: "android-mock-test-app",
        title: "Mock Test Learning App",
        category: "Android Application",
        description: "Android app for structured exam prep with practice sets and progress tracking.",
        coverImage: "/projects/mock-test-app/cover.png",
        screenshots: ["/projects/mock-test-app/1.png"],
        highlights: [
            "Real-time data handling with Firebase",
            "Structured question-set practice",
            "Self-assessment and progress tracking",
        ],
        technologies: ["Kotlin", "Firebase", "Android"],
        github: "",
        live: "",
        featured: false,
        year: "2024",
        problem:
            "Students preparing for exams needed a structured way to practice question sets and take mock tests outside of a fixed classroom schedule.",
        whatIBuilt:
            "A native Android application that lets students practice curated question sets and take full mock tests, with results tracked over time for self-assessment.",
        technicalImplementation:
            "Built natively in Kotlin with Firebase powering real-time data handling — question banks, test attempts, and score history sync as the student progresses.",
        architectureOverview:
            "Android client communicates directly with Firebase for both data storage and real-time updates, keeping the architecture lightweight for a single-purpose learning tool.",
        challengesSolved: [
            "Structuring question data so new mock tests can be added without app updates",
            "Tracking progress in a way that's meaningful for self-assessment, not just a raw score",
        ],
        features: [
            "Practice question sets",
            "Timed mock tests",
            "Progress tracking",
            "Firebase-backed sync",
        ],
    },
    {
        slug: "college-admission-portal",
        title: "College Admission Web Portal",
        category: "Web Application",
        description: "Web portal managing the end-to-end student admission process.",
        coverImage: "/projects/admission-portal/cover.png",
        screenshots: ["/profile/college_admission_html_php_project_ss.png"],
        highlights: [
            "End-to-end admission workflow",
            "Organized, reliable data storage",
            "Structured retrieval for administrative use",
        ],
        technologies: ["HTML", "CSS", "JavaScript", "MySQL"],
        github: "",
        live: "",
        featured: false,
        year: "2024",
        problem:
            "Managing student admissions on paper or spreadsheets made it hard to track applicant status and retrieve records reliably.",
        whatIBuilt:
            "A web portal covering the full admission process from application to record storage, backed by a relational database for reliable retrieval.",
        technicalImplementation:
            "Front end built with vanilla HTML, CSS, and JavaScript; MySQL handles structured storage of applicant and admission data.",
        architectureOverview:
            "A classic client-server structure where the front end submits and queries admission records directly against a MySQL-backed data layer.",
        challengesSolved: [
            "Designing a relational schema that keeps admission records organized and easy to query",
            "Building a form-driven workflow reliable enough for administrative use",
        ],
        features: [
            "Application submission",
            "Admission record management",
            "Structured data retrieval",
        ],
    },
];

export const getProjectBySlug = (slug: string) =>
    projects.find((p) => p.slug === slug);

export const featuredFirst = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
);