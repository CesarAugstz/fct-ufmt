export interface ProfessorMock {
  id: string
  name: string
  email: string
  summary: string
  courses: { name: string }[]
  specialties: string[]
  image?: string
  researchAreas: string[]
  officeHours: string
  lattes: string
  publications?: {
    title: string
    authors?: string[]
    date: Date
    link?: string
  }[]
  researchProjects?: {
    title: string
    startDate: Date
    endDate?: Date
    status: 'finished' | 'ongoing'
    description?: string
  }[]
  extensionProjects?: {
    title: string
    startDate: Date
    status: 'finished' | 'ongoing'
    endDate?: Date
    description?: string
  }[]

  // TODO: ensino ??
}

export const professorsMock: ProfessorMock[] = [
  {
    id: '1',
    name: 'Dr. João Silva',
    email: 'joao.silva@fct.com',
    summary:
      'Especialista em Engenharia de Software com foco em arquitetura de sistemas distribuídos e computação em nuvem.',
    courses: [{ name: 'ENGENHARIA_SOFTWARE' }],
    specialties: ['Arquitetura de Software', 'Cloud Computing', 'DevOps'],
    image: '/example/profile.jpg',
    researchAreas: ['Sistemas Distribuídos', 'Microserviços', 'Containers'],
    officeHours: 'Segunda e Quarta, 14h-16h',
    lattes: 'http://lattes.cnpq.br/123456789',
    publications: [
      {
        title: 'Distributed Systems Architecture in Cloud Computing',
        authors: ['João Silva', 'Maria Santos'],
        date: new Date('2024-01-15'),
        link: 'https://example.com/paper1',
      },
    ],
    researchProjects: [
      {
        title: 'Cloud Native Applications',
        startDate: new Date('2023-01-01'),
        status: 'ongoing',
        description:
          'Research on modern cloud-native application architectures',
      },
    ],
    extensionProjects: [
      {
        title: 'DevOps Workshop Series',
        startDate: new Date('2023-06-01'),
        endDate: new Date('2023-12-01'),
        status: 'finished',
        description: 'Workshop series teaching DevOps practices to students',
      },
    ],
  },
  {
    id: '2',
    name: 'Dra. Maria Santos',
    email: 'maria.santos@fct.com',
    summary:
      'Pesquisadora na área de Ciências Naturais com ênfase em Biologia Molecular e Genética.',
    courses: [{ name: 'CIENCIA_NATURAL_MATEMATICA' }],
    specialties: ['Genética', 'Biologia Molecular', 'Biotecnologia'],
    image: '/example/profile-f.jpg',
    researchAreas: ['Genômica', 'Proteômica', 'Bioinformática'],
    officeHours: 'Terça e Quinta, 10h-12h',
    lattes: 'http://lattes.cnpq.br/987654321',
  },
  {
    id: '3',
    name: 'Dr. Carlos Oliveira',
    email: 'carlos.oliveira@fct.com',
    summary:
      'Especialista em Ciência e Tecnologia com foco em Física Aplicada e Matemática Computacional.',
    courses: [{ name: 'CIENCIA_TECNOLOGIA' }],
    specialties: [
      'Física Aplicada',
      'Matemática Computacional',
      'Modelagem Numérica',
    ],
    researchAreas: ['Física Computacional', 'Simulação Numérica', 'Otimização'],
    officeHours: 'Quarta e Sexta, 8h-10h',
    lattes: 'http://lattes.cnpq.br/456789123',
  },
]
