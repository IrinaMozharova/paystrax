export function priceTextToCents(priceText: string): number {
    const normalizedPrice = priceText.replace(/[^\d.]/g, '');

    return Math.round(Number(normalizedPrice) * 100);
}

export function formatCentsAsPrice(priceInCents: number): string {
    return `$${(priceInCents / 100).toFixed(2)}`;
}