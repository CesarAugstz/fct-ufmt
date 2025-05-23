import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('Digite um email válido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  remember: z.boolean().optional().default(false),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
