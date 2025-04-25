import { z } from 'zod'
import { UserSchema } from './user.schema'
import { Course } from '@prisma/client'

const formSchema = UserSchema.formSchema.extend({
  courses: z.array(z.enum(Object.values(Course) as [string, ...string[]])),
})

export const ProfessorSchema = {
  formSchema,
}
