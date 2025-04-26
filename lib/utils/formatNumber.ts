export function formatNumber(
  value: number,
  locale = 'en-GB',
  maximumFractionDigits = 3
): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits,
  }).format(value)
}
