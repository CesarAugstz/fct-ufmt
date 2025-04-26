import { Course } from '@prisma/client'

export interface ProfessorMock {
  id: string
  name: string
  email: string
  summary: string
  courses: Course[]
  specialties: string[]
  image: string
  researchAreas: string[]
  officeHours: string
  lattes: string
  publications: number
}

export const professorsMock: ProfessorMock[] = [
  {
    id: '1',
    name: 'Dr. João Silva',
    email: 'joao.silva@fct.com',
    summary:
      'Especialista em Engenharia de Software com foco em arquitetura de sistemas distribuídos e computação em nuvem.',
    courses: ['ENGENHARIA_SOFTWARE'],
    specialties: ['Arquitetura de Software', 'Cloud Computing', 'DevOps'],
    image: '/placeholder.svg?height=400&width=400',
    researchAreas: ['Sistemas Distribuídos', 'Microserviços', 'Containers'],
    officeHours: 'Segunda e Quarta, 14h-16h',
    lattes: 'http://lattes.cnpq.br/123456789',
    publications: 45,
  },
  {
    id: '2',
    name: 'Dra. Maria Santos',
    email: 'maria.santos@fct.com',
    summary:
      'Pesquisadora na área de Ciências Naturais com ênfase em Biologia Molecular e Genética.',
    courses: ['CIENCIA_NATURAL_MATEMATICA'],
    specialties: ['Genética', 'Biologia Molecular', 'Biotecnologia'],
    image: '/placeholder.svg?height=400&width=400',
    researchAreas: ['Genômica', 'Proteômica', 'Bioinformática'],
    officeHours: 'Terça e Quinta, 10h-12h',
    lattes: 'http://lattes.cnpq.br/987654321',
    publications: 32,
  },
  {
    id: '3',
    name: 'Dr. Carlos Oliveira',
    email: 'carlos.oliveira@fct.com',
    summary:
      'Especialista em Ciência e Tecnologia com foco em Física Aplicada e Matemática Computacional.',
    courses: ['CIENCIA_TECNOLOGIA'],
    specialties: [
      'Física Aplicada',
      'Matemática Computacional',
      'Modelagem Numérica',
    ],
    image: '/placeholder.svg?height=400&width=400',
    researchAreas: ['Física Computacional', 'Simulação Numérica', 'Otimização'],
    officeHours: 'Quarta e Sexta, 8h-10h',
    lattes: 'http://lattes.cnpq.br/456789123',
    publications: 28,
  },
]
