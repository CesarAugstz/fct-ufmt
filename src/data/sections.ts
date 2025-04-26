export type Section = {
  name: string
  children?: Section[]
  href?: string
}

const sections: Section[] = [
  {
    name: 'O Instituto',
    href: '/home',
    children: [
      { name: 'História' },
      { name: 'Gestão' },
      { name: 'Docentes', href: '/home/professors' },
      { name: 'Técnicos' },
      { name: 'Contatos' },
      { name: 'Tour 360º' },
    ],
  },
  {
    name: 'Inovatec',
  },
  {
    name: 'Notícias',
    href: '/home/news',
  },
  {
    name: 'Estágios',
  },
  {
    name: 'Pós-Graduação',
    children: [{ name: 'Especialização em Agrocomputação' }],
  },
  {
    name: 'Graduação',
    children: [{ name: 'Bacharelado em Ciência e Tecnologia' }],
  },
  {
    name: 'Espaço Do Aluno',
    children: [
      { name: 'Perguntas Frequentes' },
      { name: 'Acesso ao AVA e PA' },
      { name: 'Polos' },
    ],
  },
  {
    name: 'Extensão',
  },
  {
    name: 'Pesquisa',
  },
  {
    name: 'Agendas',
  },
] as const

export const DataSections = {
  sections,
}
