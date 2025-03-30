import { z } from 'zod';

export const sectionFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  parentId: z.string().optional().nullable(),
  isVisible: z.boolean().default(true),
  order: z.number().int().default(0),
});

export type SectionFormValues = z.infer<typeof sectionFormSchema>;
