import { Role } from '@prisma/client'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().nonempty({ message: 'O nome é obrigatório.' }),
  email: z
    .string()
    .email({ message: 'Por favor, insira um endereço de email válido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
    .or(z.string().length(0))
    .optional(),
  role: z.enum(Object.values(Role) as [string, ...string[]]),
})

const adminFormSchema = z.object({
  name: z.string().nonempty({ message: 'O nome é obrigatório.' }),
  email: z
    .string()
    .email({ message: 'Por favor, insira um endereço de email válido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
    .or(z.string().length(0))
    .optional(),
  role: z.enum(Object.values(Role) as [string, ...string[]]),
})

export const UserSchema = {
  formSchema,
  adminFormSchema,
}
