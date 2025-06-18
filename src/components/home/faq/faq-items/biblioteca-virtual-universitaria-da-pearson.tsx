import Link from 'next/link'
import StepByStepTutorial, {
  TutorialStep,
} from './components/step-by-step-tutorial'
import SocialMessageInstagram from '../components/social-message-instagram'

const steps: TutorialStep[] = [
  {
    number: 1,
    description: (
      <>
        Acesse a página das bibliotecas da UFMT, pelo endereço eletrônico{' '}
        <Link
          href="https://www.biblioteca.ufmt.br"
          className="text-primary hover:text-primary/80 underline"
          target="_blank"
        >
          www.biblioteca.ufmt.br
        </Link>
        . A seguir, digite uma palavra ou expressão para busca, e, para se ter
        uma pesquisa mais específica, no menu Tipo de obra, escolha a opção
        E-book.
      </>
    ),
    image: {
      src: '/faq/biblioteca-virtual-universitaria-da-pearson/biblioteca-ufmt-homepage.png',
      alt: 'Página inicial da biblioteca UFMT',
      width: 643,
      height: 232,
    },
  },
  {
    number: 2,
    description: (
      <>
        Na sequência são apresentados os resultados da pesquisa. Note que os
        itens que possuem um ícone de um cadeado fechado ao lado esquerdo
        correspondem a E-books de acesso restrito, seja do acervo da Biblioteca
        Virtual da Pearson ou mesmo da Minha Biblioteca.
      </>
    ),
    image: {
      src: '/faq/biblioteca-virtual-universitaria-da-pearson/search-results-locked.png',
      alt: 'Resultados da pesquisa com ícone de cadeado',
      width: 643,
      height: 314,
    },
  },
  {
    number: 3,
    description: (
      <>
        Para acessar o E-book integralmente basta clicar sobre o{' '}
        <strong>cadeado</strong> na tela dos resultados de busca (acesso mais
        rápido). Ou então, basta acessar os dados da obra (clicando sobre seu
        título) e em seguida, clicar em <strong>Acesso restrito</strong>.
      </>
    ),
    image: {
      src: '/faq/biblioteca-virtual-universitaria-da-pearson/click-padlock-access.png',
      alt: 'Clicando no cadeado para acessar o e-book',
      width: 643,
      height: 313,
    },
  },
  {
    number: 4,
    description: (
      <>
        Assim, quando o usuário tentar acessar o e-book, o Sistema Pergamum
        solicitará o número de matrícula e senha na biblioteca. Basta preencher
        estes dados, além do captcha e clicar em Login.
      </>
    ),
    image: {
      src: '/faq/biblioteca-virtual-universitaria-da-pearson/pergamum-login.png',
      alt: 'Tela de login do Sistema Pergamum',
      width: 385,
      height: 362,
    },
  },
  {
    number: 5,
    description: (
      <>
        Ao efetuar o primeiro acesso na Biblioteca Virtual da Pearson, via
        Sistema Pergamum, o usuário precisará fornecer alguns dados pessoais,
        realizando seu cadastro na plataforma. Esse procedimento é realizado
        apenas em seu primeiro acesso e, com este perfil configurado, o usuário
        também poderá acessar a Biblioteca Virtual através do Aplicativo (App)
        ou da plataforma web.
      </>
    ),
    image: {
      src: '/faq/biblioteca-virtual-universitaria-da-pearson/pearson-registration-form.png',
      alt: 'Formulário de cadastro na Biblioteca Virtual da Pearson',
      width: 643,
      height: 311,
    },
  },
]

const documents = [
  {
    title: 'Tutorial em PDF',
    description: 'Guia completo para acessar a Biblioteca Virtual da Pearson',
    href: 'https://cms.ufmt.br/files/galleries/187/Documentos/Acessando%20a%20BV%20Pearson%20via%20Sistema%20Pergamum.pdf?_gl=1*1rqhc9w*_ga*MTU0MTE4NDUzOC4xNzE5NTE0MDM1*_ga_1BSMJE6838*MTcyMDAxNjk0My42LjEuMTcyMDAxODUyNi42MC4wLjA',
  },
]

export default function BibliotecaVirtualUniversitariaDaPearson() {
  return (
    <StepByStepTutorial
      title="Biblioteca Virtual Universitária da Pearson"
      subtitle="Para acessar a Biblioteca Virtual Universitária da Pearson, é necessário que o usuário tenha vínculo ativo com a UFMT (aluno, docente ou técnico administrativo), e esteja cadastrado no Sistema Pergamum e com o cadastro ativo."
      headerWarning={
        <>
          <strong>Importante:</strong> Caso seja necessário atualizar o
          cadastro, os usuários vinculados ao campus de Cuiabá deverão entrar em
          contato com a Supervisão de Serviços ao Leitor (SSL), pelo e-mail{' '}
          <Link
            href="mailto:ssleitor-bc@ufmt.br"
            className="text-primary hover:text-primary/80 underline"
          >
            ssleitor-bc@ufmt.br
          </Link>
        </>
      }
      icon={
        <svg
          className="w-8 h-8 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      }
      steps={steps}
      videoUrl="https://www.youtube.com/embed/j0q2bWBUoLw"
      videoTitle="Tutorial em Vídeo - Biblioteca Virtual da Pearson"
      documents={documents}
      socialMessage={<SocialMessageInstagram />}
    />
  )
}
