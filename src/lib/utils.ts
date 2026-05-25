import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

export const clamp = (n: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, n));

export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number => ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

export const isClient = (): boolean => typeof window !== 'undefined';

export const prefersReducedMotion = (): boolean => {
  if (!isClient()) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
