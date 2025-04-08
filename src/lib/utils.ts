import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isEqualJson(objA: any, objB: any): boolean {
  return JSON.stringify(objA) === JSON.stringify(objB)
}
