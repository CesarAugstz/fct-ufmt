import { getRandomProfessorImage } from './mock-images'
import { ContentNature, BlockSize, GridSize, Alignment } from '@prisma/client'

export interface ContentBlockData {
  nature: ContentNature
  content?: string
  size?: BlockSize
  gridSize?: GridSize
  alignment?: Alignment
  withBorder?: boolean
  order?: number
  caption?: string
  accordionItems?: Array<{ title: string; content: string }>
  imageData?: {
    name: string
    dataUrl: string
    mimeType: string
    size: number
  }
}

export function generateFAQContentBlocks(): ContentBlockData[] {
  const imageData = getRandomProfessorImage()

  return [
    {
      nature: 'TEXT',
      content: `## Como me inscrever no curso?

Para se inscrever no curso, você deve acessar o portal do candidato no site da universidade e seguir os passos do processo seletivo vigente.

### Documentos Necessários

Para completar sua inscrição, você precisará dos seguintes documentos:

#### Documentos Obrigatórios
- **RG** ou **CNH** (cópia autenticada)
- **CPF** (cópia simples)
- **Certificado de Conclusão do Ensino Médio** (cópia autenticada)
- **Histórico Escolar do Ensino Médio** (cópia autenticada)

#### Documentos Opcionais
- Certificados de cursos complementares
- Comprovante de experiência profissional
- Carta de recomendação

> **Importante:** Todos os documentos devem estar em perfeita condição de legibilidade.`,
      size: 'LARGE',
      gridSize: 'FOUR',
      order: 0,
    },
    {
      nature: 'ACCORDION',
      accordionItems: [
        {
          title: 'Passo 1: Acesse o portal do candidato',
          content:
            'Entre no site da universidade e clique em "Portal do Candidato". Você será redirecionado para a plataforma de inscrições.',
        },
        {
          title: 'Passo 2: Preencha o formulário de inscrição',
          content:
            'Complete todos os campos obrigatórios com suas informações pessoais e acadêmicas.',
        },
        {
          title: 'Passo 3: Anexe os documentos necessários',
          content:
            'Faça upload de todos os documentos solicitados no formato PDF ou JPG.',
        },
        {
          title: 'Passo 4: Realize o pagamento da taxa',
          content:
            'Efetue o pagamento da taxa de inscrição através do boleto bancário ou cartão.',
        },
        {
          title: 'Passo 5: Acompanhe o processo',
          content:
            'Monitore o status da sua inscrição através do portal do candidato.',
        },
      ],
      size: 'LARGE',
      gridSize: 'FOUR',
      order: 1,
    },
    ...(imageData
      ? [
          {
            nature: 'IMAGE' as ContentNature,
            caption: 'Exemplo do portal de inscrições da universidade',
            size: 'MEDIUM' as BlockSize,
            gridSize: 'FOUR' as GridSize,
            alignment: 'CENTER' as Alignment,
            withBorder: true,
            order: 2,
            imageData: {
              name: 'portal-inscricoes.jpg',
              dataUrl: imageData,
              mimeType: 'image/jpeg',
              size: 1000,
            },
          },
        ]
      : []),
  ]
}

export function generateCourseAboutContentBlocks(): ContentBlockData[] {
  const imageData = getRandomProfessorImage()

  return [
    {
      nature: 'TEXT',
      content: `## Sobre o Curso

Nosso curso oferece uma formação completa e atualizada, preparando profissionais qualificados para o mercado de trabalho atual.

### Objetivos do Curso

O curso tem como principais objetivos:

#### Formação Técnica
- Desenvolver competências técnicas específicas da área
- Proporcionar conhecimentos teóricos sólidos
- Oferecer experiência prática através de laboratórios

#### Formação Humana
- Desenvolver pensamento crítico
- Estimular a criatividade e inovação
- Promover valores éticos e cidadania

#### Preparação Profissional
- Preparar para o mercado de trabalho
- Desenvolver habilidades de liderança
- Estimular o empreendedorismo`,
      size: 'LARGE',
      gridSize: 'FOUR',
      order: 0,
    },
    {
      nature: 'ACCORDION',
      accordionItems: [
        {
          title: 'Laboratórios modernos e equipados',
          content:
            'Nossos laboratórios possuem equipamentos de última geração para proporcionar experiência prática de qualidade.',
        },
        {
          title: 'Corpo docente qualificado',
          content:
            'Professores com titulação adequada e experiência tanto acadêmica quanto profissional.',
        },
        {
          title: 'Projetos de extensão e pesquisa',
          content:
            'Oportunidades de participar em projetos que conectam teoria e prática, beneficiando a comunidade.',
        },
        {
          title: 'Parcerias com empresas do setor',
          content:
            'Convênios que garantem estágios e oportunidades de emprego para nossos estudantes.',
        },
        {
          title: 'Intercâmbios internacionais',
          content:
            'Programas de mobilidade acadêmica com universidades parceiras no exterior.',
        },
      ],
      size: 'LARGE',
      gridSize: 'FOUR',
      order: 1,
    },
    ...(imageData
      ? [
          {
            nature: 'IMAGE' as ContentNature,
            caption: 'Nossos laboratórios oferecem infraestrutura de ponta',
            size: 'MEDIUM' as BlockSize,
            gridSize: 'FOUR' as GridSize,
            alignment: 'CENTER' as Alignment,
            withBorder: true,
            order: 2,
            imageData: {
              name: 'laboratorio.jpg',
              dataUrl: imageData,
              mimeType: 'image/jpeg',
              size: 1000,
            },
          },
        ]
      : []),
  ]
}

export function generateNewsContentBlocks(): ContentBlockData[] {
  const imageData = getRandomProfessorImage()

  return [
    {
      nature: 'TEXT',
      content: `## Últimas Atualizações sobre o Curso

Compartilhamos as principais novidades e atualizações relacionadas ao nosso programa acadêmico.

### Novidades Recentes

#### Novas Parcerias
Firmamos parceria com **empresas líderes do setor** para oferecer:
- Estágios remunerados
- Projetos de pesquisa aplicada
- Palestras com profissionais experientes

#### Infraestrutura Atualizada
- Novos equipamentos nos laboratórios
- Biblioteca digital expandida
- Salas de aula com tecnologia avançada

#### Programa de Mentoria
Lançamos um programa onde **alunos veteranos** orientam **calouros** em:
1. Adaptação à vida universitária
2. Técnicas de estudo
3. Planejamento de carreira`,
      size: 'LARGE',
      gridSize: 'FOUR',
      order: 0,
    },
    {
      nature: 'ACCORDION',
      accordionItems: [
        {
          title: 'Aumento de 30% nas vagas de estágio',
          content:
            'Novas parcerias permitiram ampliar significativamente as oportunidades de estágio para nossos estudantes.',
        },
        {
          title: 'Programa de intercâmbio com universidades europeias',
          content:
            'Estabelecemos convênios com instituições de ensino na Europa para mobilidade acadêmica.',
        },
        {
          title: 'Núcleo de inovação e empreendedorismo',
          content:
            'Criação de espaço dedicado ao desenvolvimento de projetos inovadores e startups.',
        },
        {
          title: 'Metodologias ativas de ensino',
          content:
            'Implementação de novas abordagens pedagógicas que colocam o estudante no centro do aprendizado.',
        },
      ],
      size: 'LARGE',
      gridSize: 'FOUR',
      order: 1,
    },
    ...(imageData
      ? [
          {
            nature: 'IMAGE' as ContentNature,
            caption: 'Inauguração dos novos laboratórios em 2024',
            size: 'MEDIUM' as BlockSize,
            gridSize: 'FOUR' as GridSize,
            alignment: 'CENTER' as Alignment,
            withBorder: true,
            order: 2,
            imageData: {
              name: 'novos-laboratorios.jpg',
              dataUrl: imageData,
              mimeType: 'image/jpeg',
              size: 1000,
            },
          },
        ]
      : []),
  ]
}

export function generateRandomContentBlocks(
  type: 'faq' | 'about' | 'news' = 'faq',
): ContentBlockData[] {
  switch (type) {
    case 'about':
      return generateCourseAboutContentBlocks()
    case 'news':
      return generateNewsContentBlocks()
    case 'faq':
    default:
      return generateFAQContentBlocks()
  }
}
