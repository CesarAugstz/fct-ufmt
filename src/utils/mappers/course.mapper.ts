import { Course } from '@prisma/client'

const courseMap: { [key in Course]: string } = {
  CIENCIA_TECNOLOGIA: 'Ciência e Tecnologia',
  ENGENHARIA_SOFTWARE: 'Engenharia de Software',
  CIENCIA_NATURAL_MATEMATICA: 'Ciência Natural e Matemática',
} as const

const courseMapReverse: { [key in string]: Course } = Object.fromEntries(
  Object.entries(courseMap).map(([key, value]) => [value, key]),
) as { [key in string]: Course }

const courseOptions = Object.entries(courseMap).map(([value, label]) => ({
  value,
  label,
}))

function getCourseLabel(course: Course) {
  switch (course) {
    case 'CIENCIA_TECNOLOGIA':
      return 'Ciência e Tecnologia'
    case 'ENGENHARIA_SOFTWARE':
      return 'Engenharia de Software'
    case 'CIENCIA_NATURAL_MATEMATICA':
      return 'Ciência Natural e Matemática'
    default:
      return 'Outro'
  }
}

export const CourseMapper = {
  getCourseLabel,
  courseMap,
  courseMapReverse,
  courseOptions,
}
