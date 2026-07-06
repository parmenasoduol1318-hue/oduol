// frontend/lib/formatter.ts

/**
 * Format number with commas (1,000,000)
 */
export function formatNumber(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) return "0";

  return new Intl.NumberFormat("en-KE").format(num);
}

/**
 * Format currency (KES by default)
 */
export function formatCurrency(
  value: number | string,
  currency: string = "KES"
): string {
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) return `${currency} 0`;

  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
  }).format(num);
}

/**
 * Format file size (bytes → KB, MB, GB)
 */
export function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return "0 B";

  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Shorten large numbers (e.g. 1500 → 1.5K)
 */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-KE", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}