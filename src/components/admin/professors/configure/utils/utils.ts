import { ProfessorWithUser } from '@/app/admin/(without-sidebar)/professors-configure/page'

export function formatFormToBack(values: ProfessorWithUser) {
  return {
    extensionProjects: values.extensionProjects,
    publications: values.publications,
    researchProjects: values.researchProjects,

    image: values.image,
    lattes: values.lattes,
    officeHours: values.officeHours,
    researchAreas: values.researchAreas,
    specialties: values.specialties,
    summary: values.summary,
    user: {
      update: {
        name: values.user.name,
        email: values.user.email,
      },
    },
  }
}

export function hasChangedData(
  values: ProfessorWithUser,
  professor: ProfessorWithUser,
) {
  return JSON.stringify(values) !== JSON.stringify(professor)
}
