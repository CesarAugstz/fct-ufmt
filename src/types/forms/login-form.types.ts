import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email('Digite um email válido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  remember: z.boolean().optional().default(false),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
