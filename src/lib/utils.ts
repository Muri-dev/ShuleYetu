import { clsx, type ClassValue } from 'clsx';

/**
 * Merge class names with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format a date string for display
 */
export function formatDate(dateStr: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });
}

/**
 * Format a date-time string for display
 */
export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format currency (KES)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Get initials from a name
 */
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Truncate a string
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Generate a random color for avatars
 */
export function getAvatarColor(name: string): string {
  const colors = [
    'bg-primary-100 text-primary-700',
    'bg-accent-100 text-accent-700',
    'bg-success-100 text-success-700',
    'bg-danger-100 text-danger-700',
    'bg-purple-100 text-purple-700',
    'bg-cyan-100 text-cyan-700',
    'bg-orange-100 text-orange-700',
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
}

/**
 * Pluralize a word based on count
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural || `${singular}s`);
}

/**
 * Sleep helper for loading states
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Get ordinal suffix (1st, 2nd, 3rd, etc.)
 */
export function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * Grade calculation from percentage
 */
export function getGrade(percentage: number): { grade: string; points: number; remark: string } {
  if (percentage >= 80) return { grade: 'A', points: 12, remark: 'Excellent' };
  if (percentage >= 75) return { grade: 'A-', points: 11, remark: 'Very Good' };
  if (percentage >= 70) return { grade: 'B+', points: 10, remark: 'Good' };
  if (percentage >= 65) return { grade: 'B', points: 9, remark: 'Good' };
  if (percentage >= 60) return { grade: 'B-', points: 8, remark: 'Fairly Good' };
  if (percentage >= 55) return { grade: 'C+', points: 7, remark: 'Fair' };
  if (percentage >= 50) return { grade: 'C', points: 6, remark: 'Average' };
  if (percentage >= 45) return { grade: 'C-', points: 5, remark: 'Below Average' };
  if (percentage >= 40) return { grade: 'D+', points: 4, remark: 'Poor' };
  if (percentage >= 35) return { grade: 'D', points: 3, remark: 'Poor' };
  if (percentage >= 30) return { grade: 'D-', points: 2, remark: 'Very Poor' };
  return { grade: 'E', points: 1, remark: 'Fail' };
}

/**
 * Generate a unique reference number
 */
export function generateRefNumber(prefix: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}
