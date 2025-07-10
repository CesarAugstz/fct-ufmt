import { randomInt, randomBytes } from 'crypto'

export function generateOTP(): string {
  return randomInt(100000, 999999).toString()
}

export function getOTPExpiration(): Date {
  const expiration = new Date()
  expiration.setMinutes(expiration.getMinutes() + 15) // 15 minutes from now
  return expiration
}

export function isOTPExpired(expiration: Date): boolean {
  return new Date() > expiration
}

export function generatePasswordResetToken(): string {
  return randomBytes(32).toString('hex')
}

export function getPasswordResetExpiration(): Date {
  const expiration = new Date()
  expiration.setHours(expiration.getHours() + 1) // 1 hour from now
  return expiration
}
