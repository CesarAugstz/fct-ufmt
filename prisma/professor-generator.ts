import Chance from 'chance'
import { Prisma, Role } from '@prisma/client'
import {
  ProfessorExtensionProject,
  ProfessorResearchProject,
  Publication,
} from '@zenstackhq/runtime/models'
import { InputJsonValue } from '@prisma/client/runtime/library'

const chance = new Chance()

const researchAreas = {
  'Ciência e Tecnologia': [
    'Inteligência Artificial',
    'Computação Quântica',
    'Nanotecnologia',
    'Biotecnologia',
    'Robótica',
    'Ciência de Dados',
    'Internet das Coisas',
    'Blockchain',
    'Realidade Virtual',
    'Sustentabilidade Tecnológica',
  ],
  'Engenharia de Software': [
    'Desenvolvimento Ágil',
    'Arquitetura de Software',
    'Qualidade de Software',
    'DevOps',
    'Microserviços',
    'Engenharia de Requisitos',
    'Testes de Software',
    'Gestão de Projetos',
    'UX/UI Design',
    'Segurança em Software',
  ],
  'Licenciatura em Ciências Naturais e Matemática': [
    'Didática da Matemática',
    'Ensino de Física',
    'Educação Ambiental',
    'Química Educacional',
    'Metodologias de Ensino',
    'Avaliação Educacional',
    'Tecnologias Educacionais',
    'Inclusão no Ensino',
    'Formação de Professores',
    'Educação Científica',
  ],
}

const specialties = {
  'Ciência e Tecnologia': [
    'Machine Learning',
    'Análise de Dados',
    'Sistemas Distribuídos',
    'Computação em Nuvem',
    'Cibersegurança',
    'Desenvolvimento Web',
    'Algoritmos',
    'Redes de Computadores',
    'Banco de Dados',
    'Programação',
  ],
  'Engenharia de Software': [
    'React/Next.js',
    'Node.js',
    'Python',
    'Java',
    'TypeScript',
    'Kubernetes',
    'Docker',
    'CI/CD',
    'APIs REST',
    'GraphQL',
  ],
  'Licenciatura em Ciências Naturais e Matemática': [
    'Cálculo',
    'Álgebra Linear',
    'Física Experimental',
    'Química Orgânica',
    'Biologia Molecular',
    'Estatística',
    'Geometria',
    'Laboratório de Ciências',
    'Pesquisa Educacional',
    'Educação Inclusiva',
  ],
}

export function generateProfessorData(courseName: string): {
  user: Prisma.UserCreateInput
  professor: Omit<Prisma.ProfessorCreateInput, 'user'>
} {
  const courseResearchAreas =
    researchAreas[courseName as keyof typeof researchAreas] || []
  const courseSpecialties =
    specialties[courseName as keyof typeof specialties] || []

  const firstName = chance.first()
  const lastName = chance.last()
  const fullName = `${firstName} ${lastName}`

  return {
    user: {
      name: fullName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@ufmt.br`,
      password: 'password123',
      role: chance.weighted([Role.PROFESSOR, Role.ADMIN_PROFESSOR], [80, 20]),
    },
    professor: {
      summary: chance.paragraph({ sentences: 3 }),
      specialties: chance.pickset(
        courseSpecialties,
        chance.integer({ min: 2, max: 5 }),
      ),
      researchAreas: chance.pickset(
        courseResearchAreas,
        chance.integer({ min: 2, max: 4 }),
      ),
      officeHours: generateOfficeHours(),
      lattes: `http://lattes.cnpq.br/${chance.string({ length: 16, pool: '0123456789' })}`,
      publications: generatePublications() as unknown as InputJsonValue,
      researchProjects: generateResearchProjects() as unknown as InputJsonValue,
      extensionProjects:
        generateExtensionProjects() as unknown as InputJsonValue,
    },
  }
}

function generateOfficeHours() {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta']
  const selectedDays = chance.pickset(days, chance.integer({ min: 2, max: 3 }))
  const startHour = chance.integer({ min: 8, max: 16 })
  const endHour = startHour + chance.integer({ min: 2, max: 4 })

  return `${selectedDays.join(', ')}: ${startHour}:00 - ${endHour}:00`
}

function generatePublications(): Publication[] {
  const publications = []
  const count = chance.integer({ min: 3, max: 8 })

  for (let i = 0; i < count; i++) {
    publications.push({
      title: chance.sentence({ words: chance.integer({ min: 5, max: 12 }) }),
      authors: generateAuthors(),
      date: new Date(
        parseInt(chance.year({ min: 2018, max: 2024 })),
        chance.integer({ min: 0, max: 11 }),
        chance.integer({ min: 1, max: 28 }),
      ),
      link: chance.bool({ likelihood: 70 })
        ? `https://doi.org/10.${chance.integer({ min: 1000, max: 9999 })}/${chance.string({ length: 8 })}`
        : null,
    })
  }

  return publications
}

function generateResearchProjects(): ProfessorResearchProject[] {
  const projects: ProfessorResearchProject[] = []
  const count = chance.integer({ min: 2, max: 5 })

  for (let i = 0; i < count; i++) {
    const startYear = chance.year({ min: 2020, max: 2023 })
    const endYear = chance.year({ min: parseInt(startYear), max: 2025 })
    const isOngoing = parseInt(endYear) >= 2024

    projects.push({
      title: chance.sentence({ words: chance.integer({ min: 4, max: 10 }) }),
      description: chance.paragraph({ sentences: 2 }),
      startDate: new Date(`${startYear}-01-01`),
      endDate: isOngoing ? null : new Date(`${endYear}-12-31`),
      status: isOngoing ? 'ONGOING' : 'FINISHED',
    })
  }

  return projects
}

function generateExtensionProjects(): ProfessorExtensionProject[] {
  const projects: ProfessorExtensionProject[] = []
  const count = chance.integer({ min: 1, max: 4 })

  for (let i = 0; i < count; i++) {
    const startYear = chance.year({ min: 2020, max: 2023 })
    const endYear = chance.year({ min: parseInt(startYear), max: 2025 })
    const isOngoing = parseInt(endYear) >= 2024

    projects.push({
      title: chance.sentence({ words: chance.integer({ min: 4, max: 8 }) }),
      description: chance.paragraph({ sentences: 2 }),
      startDate: new Date(`${startYear}-01-01`),
      endDate: isOngoing ? null : new Date(`${endYear}-12-31`),
      status: isOngoing ? 'ONGOING' : 'FINISHED',
    })
  }

  return projects
}

function generateAuthors() {
  const count = chance.integer({ min: 1, max: 5 })
  const authors = []

  for (let i = 0; i < count; i++) {
    authors.push(`${chance.first()} ${chance.last()}`)
  }

  return authors
}
