import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isEqualJson(objA: any, objB: any): boolean {
  return JSON.stringify(objA) === JSON.stringify(objB)
}

export function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function searchContains(searchTerm: string, searchIn: string): boolean {
  return removeAccents(searchIn)
    .toLowerCase()
    .includes(removeAccents(searchTerm).toLowerCase())
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}
