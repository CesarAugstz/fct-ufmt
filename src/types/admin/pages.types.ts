import { z } from 'zod';

export const pagesFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
});

export type PageFormType = z.infer<typeof pagesFormSchema>;
