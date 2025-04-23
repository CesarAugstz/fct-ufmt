import { z } from 'zod'

export const sectionFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  parentId: z.string().optional().nullable(),
  isVisible: z.boolean().default(true),
  order: z.number().int().default(0),
  href: z.string().optional().nullable(),
})

export type SectionFormValues = z.infer<typeof sectionFormSchema>
