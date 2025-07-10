import { z } from 'zod'

export const requestOTPSchema = z.object({
  email: z.string().email('Email inválido'),
})

export const verifyOTPSchema = z
  .object({
    email: z.string().email('Email inválido'),
    otpCode: z
      .string()
      .min(6, 'Código deve ter 6 dígitos')
      .max(6, 'Código deve ter 6 dígitos')
      .regex(/^\d+$/, 'Código deve conter apenas números'),
    newPassword: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  })

export type RequestOTPFormValues = z.infer<typeof requestOTPSchema>
export type VerifyOTPFormValues = z.infer<typeof verifyOTPSchema>
