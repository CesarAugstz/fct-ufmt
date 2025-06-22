import { dayJs } from '@/utils/dayjs'
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
  if (!date) return ''
  const dayjsDate = dayJs(date)
  if (!dayjsDate.isValid()) {
    console.error('Invalid date:', date)
    return ''
  }
  return dayjsDate.format('DD/MM/YYYY')
}
