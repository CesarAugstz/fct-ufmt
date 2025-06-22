import { z } from '@/utils/zod'

export const loginFormSchema = z.object({
  email: z.string().email('Digite um email válido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  remember: z.boolean().optional(),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
