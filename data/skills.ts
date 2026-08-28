import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    icon: "Code2",
    skills: ["C", "C++", "Java", "Python", "Kotlin", "TypeScript"],
  },
  {
    name: "Web",
    icon: "Globe",
    skills: ["Next.js", "React", "HTML", "CSS", "JavaScript", "PHP", "Tailwind CSS"],
  },
  {
    name: "Data & Backend",
    icon: "Database",
    skills: ["MySQL", "Prisma ORM", "Supabase", "Firebase"],
  },
  {
    name: "Mobile",
    icon: "Smartphone",
    skills: ["Android (Kotlin)"],
  },
  {
    name: "Tools & Practice",
    icon: "Wrench",
    skills: ["Git", "Vercel", "Agile Development"],
  },
  {
    name: "Hardware & Robotics",
    icon: "Cpu",
    skills: ["Arduino", "ESP32", "IoT Fundamentals"],
  },
];