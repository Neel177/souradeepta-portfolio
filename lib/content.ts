export function displayValue(value: string) {
    return value.replace(/^\[([^\]]+)\]\([^)]*\)$/, "$1");
}

export function linkValue(value: string) {
    const match = value.match(/^\[[^\]]+\]\(([^)]+)\)$/);
    return match?.[1] ?? value;
}