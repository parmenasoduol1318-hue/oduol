// frontend/lib/helpers.ts

/**
 * Format a date into a readable string
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format time (HH:MM)
 */
export function formatTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleTimeString("en-KE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Capitalize first letter of a string
 */
export function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Safe JSON parse
 */
export function safeJsonParse<T = any>(value: string | null): T | null {
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

/**
 * Generate random ID (simple client-side use only)
 */
export function generateId(prefix = ""): string {
  return (
    prefix +
    Math.random().toString(36).substring(2, 10) +
    Date.now().toString(36)
  );
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay = 300
) {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Clamp number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Check if object is empty
 */
export function isEmpty(obj: Record<string, any> | null | undefined): boolean {
  return !obj || Object.keys(obj).length === 0;
}