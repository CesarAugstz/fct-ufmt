interface NewsItem {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  image?: string
  isPinned?: boolean
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Inscrições para o Semestre de Outono Abertas',
    excerpt:
      'As inscrições para as disciplinas do próximo semestre estão abertas. Recomendamos que os estudantes se inscrevam com antecedência para garantir seus horários preferidos.',
    date: '2025-04-10',
    category: 'Avisos',

    isPinned: true,
  },
  {
    id: 2,
    title: 'Palestra: Avanços em Inteligência Artificial',
    excerpt:
      'Participe de uma palestra instigante com a Dra. Camila Santos sobre os recentes avanços em inteligência artificial e suas aplicações em diversos setores.',
    date: '2025-04-15',
    category: 'Eventos',

    isPinned: false,
  },
  {
    id: 3,
    title:
      'Prazo para Submissões do Simpósio de Pesquisa Termina na Próxima Semana',
    excerpt:
      'O prazo para a submissão de artigos científicos para o simpósio anual está se aproximando. Certifique-se de finalizar suas submissões até 25 de abril.',
    date: '2025-04-12',
    category: 'Pesquisa',

    isPinned: false,
  },
  {
    id: 4,
    title: 'Novos Materiais Didáticos Disponíveis Online',
    excerpt:
      'Materiais atualizados para a disciplina ENG305 foram disponibilizados no sistema de gestão de aprendizagem. Os alunos já podem acessá-los.',
    date: '2025-04-08',
    category: 'Recursos',

    isPinned: false,
  },
  {
    id: 5,
    title: 'Atualização dos Horários de Atendimento dos Professores',
    excerpt:
      'O Professor Silva atualizou seus horários de atendimento para o restante do semestre. Confira a agenda para verificar a disponibilidade.',
    date: '2025-04-05',
    category: 'Avisos',

    isPinned: false,
  },
  {
    id: 6,
    title: 'Mostra de Projetos Estudantis no Próximo Mês',
    excerpt:
      'A mostra anual de projetos estudantis será realizada no próximo mês. As inscrições para apresentação de projetos já estão abertas.',
    date: '2025-04-03',
    category: 'Eventos',

    isPinned: false,
  },
  {
    id: 7,
    title: 'Programa de Iniciação Científica: Inscrições Abertas',
    excerpt:
      'A FCT está com inscrições abertas para o programa de iniciação científica 2025. Estudantes interessados devem enviar seus projetos até dia 30 de abril.',
    date: '2025-04-02',
    category: 'Pesquisa',

    isPinned: false,
  },
  {
    id: 8,
    title: 'Semana de Tecnologia FCT 2025',
    excerpt:
      'A Semana de Tecnologia da FCT acontecerá entre os dias 10 e 14 de maio, com palestras, workshops e exposições. Confira a programação completa no site.',
    date: '2025-04-01',
    category: 'Eventos',

    isPinned: true,
  },
  {
    id: 9,
    title: 'Novo Laboratório de Robótica Inaugurado',
    excerpt:
      'A FCT inaugurou seu novo laboratório de robótica com equipamentos de última geração. Agende uma visita com seu professor para conhecer o espaço.',
    date: '2025-03-30',
    category: 'Infraestrutura',

    isPinned: false,
  },
  {
    id: 10,
    title: 'Processo Seletivo para Monitoria',
    excerpt:
      'Estão abertas as inscrições para o processo seletivo de monitores nas disciplinas de Cálculo, Física e Programação. Confira os requisitos no edital.',
    date: '2025-03-28',
    category: 'Avisos',

    isPinned: false,
  },
]
