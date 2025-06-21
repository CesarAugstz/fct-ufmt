export interface CourseDetailMock {
  id: string
  name: string
  slug: string
  nature: 'GRADUATION' | 'POST_GRADUATION'
  description: string
  aboutContent: string
  galleryImages: string[]
  admissionInfo: {
    enrollmentPeriod: {
      start: Date
      end: Date
    }
    vacancies: number
    requirements: string[]
    process: string
    qrCodeImage?: string
    websiteUrl?: string
  }
  poles: {
    name: string
    city: string
    address?: string
    contact?: string
  }[]
  seminars: {
    title: string
    description: string
    images: string[]
  }[]
  faq: {
    question: string
    answer: string
  }[]
  professors: {
    id: string
    name: string
    degrees: string[]
    lattes: string
    specialties: string[]
    image?: string
  }[]
}

export const courseDetailMock: CourseDetailMock[] = [
  {
    id: '1',
    name: 'Bacharelado em Ciência e Tecnologia',
    slug: 'ciencia-e-tecnologia',
    nature: 'GRADUATION',
    description:
      'Um curso inovador que combina ciência e tecnologia para formar profissionais preparados para os desafios do futuro.',
    aboutContent: `
      <p>O <strong>Bacharelado em Ciência e Tecnologia (BC&T)</strong> da Universidade Federal de Mato Grosso (UFMT) oferece uma formação única e inovadora, preparada para atender às demandas do mercado contemporâneo. Com o uso intensivo de <strong>Tecnologias da Informação e da Comunicação (TICs)</strong>, o curso, oferecido na modalidade de Ensino a Distância (EaD), proporciona flexibilidade para os alunos e possibilita a inserção no ensino superior de forma prática e acessível.</p>
      
      <p>O BC&T é uma excelente escolha para quem busca uma carreira sólida em áreas tecnológicas, onde a inovação e o conhecimento científico são a base para o sucesso profissional. O curso é voltado para quem deseja atuar em diversas áreas das ciências exatas e tecnologia, oferecendo uma formação interdisciplinar que abrange temas fundamentais como matemática, física, informática, engenharia, e mais.</p>
      
      <p>Com <strong>polos distribuídos estrategicamente</strong> por várias regiões do estado de Mato Grosso, o curso se adapta às diferentes realidades dos estudantes, permitindo que cada aluno tenha acesso a uma educação de qualidade, independente de sua localização geográfica.</p>
      
      <p>Além disso, o <strong>BC&T</strong> é totalmente gratuito, o que garante acesso igualitário ao ensino superior de qualidade para todos os interessados. O curso também oferece uma plataforma virtual moderna e dinâmica, onde os alunos podem interagir com professores e tutores capacitados.</p>
    `,
    galleryImages: [
      '/courses/bct/gallery1.jpg',
      '/courses/bct/gallery2.jpg',
      '/courses/bct/gallery3.jpg',
    ],
    admissionInfo: {
      enrollmentPeriod: {
        start: new Date('2024-09-30'),
        end: new Date('2024-10-16'),
      },
      vacancies: 253,
      requirements: [
        'Ensino médio completo',
        'Análise do histórico escolar ou notas do ENEM',
      ],
      process:
        'O processo seletivo será feito com base na análise do histórico escolar ou notas do ENEM, facilitando o acesso para estudantes de todo o Brasil.',
      qrCodeImage: '/courses/bct/qr-code.jpg',
      websiteUrl: 'http://www.ufmt.br/ingressoead',
    },
    poles: [
      {
        name: 'Polo Cuiabá',
        city: 'Cuiabá',
        address: 'Av. Fernando Corrêa da Costa, 2367 - Boa Esperança',
        contact: '(65) 3615-8000',
      },
      {
        name: 'Polo Chapada dos Guimarães',
        city: 'Chapada dos Guimarães',
      },
      {
        name: 'Polo Sorriso',
        city: 'Sorriso',
      },
      {
        name: 'Polo Primavera do Leste',
        city: 'Primavera do Leste',
      },
    ],
    seminars: [
      {
        title: 'Encontros Presenciais - Seminário Integrador',
        description:
          'Os encontros presenciais do Seminário Integrador são uma oportunidade única para você aplicar o que aprendeu durante o curso. Nestes encontros, os alunos trabalham em grupo para resolver problemas reais, desenvolver projetos práticos e trocar experiências, sempre com o acompanhamento de tutores e professores qualificados.',
        images: ['/courses/bct/seminar1.jpg', '/courses/bct/seminar2.jpg'],
      },
    ],
    faq: [
      {
        question: 'Qual a duração do curso?',
        answer:
          'O Bacharelado em Ciência e Tecnologia tem duração de 6 semestres (3 anos).',
      },
      {
        question: 'O diploma é reconhecido pelo MEC?',
        answer:
          'Sim, o curso é oferecido pela UFMT e o diploma tem validade nacional, sendo reconhecido pelo MEC.',
      },
      {
        question: 'Preciso ter conhecimentos prévios em tecnologia?',
        answer:
          'Não é necessário ter conhecimentos prévios. O curso foi desenvolvido para receber estudantes de diferentes backgrounds.',
      },
    ],
    professors: [
      {
        id: '1',
        name: 'Adriano Olímpio da Silva',
        degrees: ['Doutor em Química (UFMS)'],
        lattes: 'http://lattes.cnpq.br/7858828068079343',
        specialties: ['Química', 'Materiais'],
        image: '/professors/adriano.jpg',
      },
      {
        id: '2',
        name: 'Agnes Cristina Oliveira Mafra',
        degrees: ['Doutora em Engenharia Química (UFSCar)'],
        lattes: 'http://lattes.cnpq.br/6868423702339380',
        specialties: ['Engenharia Química', 'Processos'],
        image: '/professors/agnes.jpg',
      },
      {
        id: '3',
        name: 'Alexandre Martins dos Anjos',
        degrees: [
          'Doutor em Ciências – Área de concentração Engenharia de Computação (USP)',
        ],
        lattes: 'http://lattes.cnpq.br/0553455764192879',
        specialties: ['Engenharia de Computação', 'Sistemas'],
        image: '/professors/alexandre.jpg',
      },
    ],
  },
  {
    id: '2',
    name: 'Engenharia de Software',
    slug: 'engenharia-software',
    nature: 'GRADUATION',
    description:
      'Formação completa em desenvolvimento e arquitetura de software moderno.',
    aboutContent: `
      <p>O curso de <strong>Engenharia de Software</strong> da UFMT prepara profissionais para atuar no desenvolvimento, manutenção e evolução de sistemas de software complexos.</p>
      
      <p>Com foco em metodologias ágeis, arquitetura de software e tecnologias modernas, o curso oferece uma formação completa para o mercado de trabalho atual.</p>
    `,
    galleryImages: ['/courses/es/gallery1.jpg'],
    admissionInfo: {
      enrollmentPeriod: {
        start: new Date('2024-09-30'),
        end: new Date('2024-10-16'),
      },
      vacancies: 120,
      requirements: [
        'Ensino médio completo',
        'Conhecimentos básicos de lógica',
      ],
      process:
        'Processo seletivo baseado em análise de histórico escolar e prova específica.',
      websiteUrl: 'http://www.ufmt.br/ingressoead',
    },
    poles: [
      {
        name: 'Polo Cuiabá',
        city: 'Cuiabá',
      },
    ],
    seminars: [],
    faq: [],
    professors: [
      {
        id: '1',
        name: 'Dr. João Silva',
        degrees: [
          'Doutor em Engenharia de Software (USP)',
          'Mestre em Ciência da Computação (UFMG)',
        ],
        lattes: 'http://lattes.cnpq.br/123456789',
        specialties: ['Arquitetura de Software', 'Cloud Computing', 'DevOps'],
        image: '/professors/joao.jpg',
      },
    ],
  },
]
