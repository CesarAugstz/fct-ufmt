import { z } from 'zod'
import { UserSchema } from './user.schema'

const formSchema = UserSchema.formSchema.extend({
  courses: z.string().ulid().array(),
})

export const ProfessorSchema = {
  formSchema,
}
