interface AnimatedCounterProps {
    value: string;
    className?: string;
}

/** Stats are known portfolio data; render them directly so they never flash a misleading zero. */
export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
    return <span className={className}>{value}</span>;
}
