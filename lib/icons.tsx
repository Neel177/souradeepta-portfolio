import {
    Code2,
    Cpu,
    Database,
    Globe,
    Github,
    Linkedin,
    Mail,
    Smartphone,
    Wrench,
    type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
    Code2,
    Globe,
    Database,
    Smartphone,
    Wrench,
    Cpu,
    Mail,
    Github,
    Linkedin,
};

export function resolveIcon(name: string): LucideIcon {
    return ICON_MAP[name] ?? Code2;
}