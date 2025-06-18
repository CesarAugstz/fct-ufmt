import Link from 'next/link'
import StepByStepTutorial, {
  TutorialStep,
  DocumentCard,
} from './components/step-by-step-tutorial'
import SocialMessageInstagram from '../components/social-message-instagram'

const steps: TutorialStep[] = [
  {
    number: 1,
    description: (
      <>
        Abra o SEI pelo link{' '}
        <Link
          href="https://sei.ufmt.br/sei/controlador_externo.php?acao=usuario_externo_logar&acao_origem=usuario_externo_enviar_cadastro&id_orgao_acesso_externo=0"
          className="text-primary hover:text-primary/80 underline"
          target="_blank"
        >
          SEI Acesso Externo
        </Link>
        , faça Login com seu e-mail e sua senha usada no portal acadêmico.
      </>
    ),
    image: {
      src: '/faq/aproveitamento-disciplinas/sei-login.png',
      alt: 'SEI Login Screen',
      width: 222,
      height: 287,
    },
    warning: (
      <>
        <strong>Atenção:</strong> Caso ainda não possua cadastro, clique no
        link:{' '}
        <Link
          href="https://sei.ufmt.br/sei/controlador_externo.php?acao=usuario_externo_avisar_cadastro&id_orgao_acesso_externo=0"
          className="text-primary hover:text-primary/80 underline"
          target="_blank"
        >
          Clique aqui para se cadastrar
        </Link>
      </>
    ),
  },
  {
    number: 2,
    description:
      'Com o Login concluído, clique em "Peticionamento" e depois em "Processo Novo".',
    image: {
      src: '/faq/aproveitamento-disciplinas/peticionamento-menu.png',
      alt: 'Peticionamento menu',
      width: 309,
      height: 325,
    },
  },
  {
    number: 3,
    description: 'Selecione o Tipo de Processo "APROVEITAMENTO DE ESTUDOS".',
    image: {
      src: '/faq/aproveitamento-disciplinas/aproveitamento-estudos-selection.png',
      alt: 'Aproveitamento de Estudos selection',
      width: 642,
      height: 327,
    },
  },
  {
    number: 4,
    description:
      'Na parte de especificação colocar o "Aproveitamento da Disciplina", preencher o Documento Principal de Identificação e selecionar o Nível de Acesso "Público".',
    image: {
      src: '/faq/aproveitamento-disciplinas/form-filling.png',
      alt: 'Form filling example',
      width: 642,
      height: 303,
    },
    warning: (
      <>
        <strong>Atenção:</strong> Ao preencher o Formulário: &quot;Estudante –
        Identificação Padrão (clique aqui para editar conteúdo)&quot;, é
        necessário clicar em &quot;Salvar&quot; no canto superior esquerdo antes
        de voltar à tela principal.
      </>
    ),
  },
  {
    number: 5,
    description:
      'Anexe ao processo os documentos essenciais contidos no campo "Orientações sobre o Tipo de Processo", na imagem do passo 4 e depois clique em "Peticionar".',
    image: {
      src: '/faq/aproveitamento-disciplinas/document-attachment.png',
      alt: 'Document attachment screen',
      width: 641,
      height: 261,
    },
  },
  {
    number: 6,
    description:
      'E lembre-se, para disciplinas cursadas fora da UFMT, o histórico deve conter as disciplinas cursadas com a nota e a carga horária respectiva. O documento oficial deve conter autenticação digital ou assinatura e carimbo do coordenador de curso ou do responsável.',
  },
]

const documents: DocumentCard[] = [
  {
    title: 'RESOLUÇÃO CONSEPE N.º 83',
    description:
      'Dispõe sobre aproveitamento de estudos nos cursos de graduação da Universidade Federal de Mato Grosso.',
    href: '/faq/aproveitamento-disciplinas/documents/resolucao_83_ap_estudos.pdf',
  },
  {
    title: 'DECISÃO DO COLEGIADO Nº 003',
    description:
      'Dispõe sobre as normas e procedimentos para solicitação de Aproveitamento de Estudos no Curso de Ciência e Tecnologia – CUVG.',
    href: '/faq/aproveitamento-disciplinas/documents/colegiado.pdf',
  },
  {
    title: 'PLANOS DE ENSINO',
    description:
      'Ciência e Tecnologia Bacharelado Interdisciplinar – Modalidade de Educação a Distância.',
    href: '/faq/aproveitamento-disciplinas/documents/plano-de-ensino_compressed.pdf',
  },
]

export default function AproveitamentoDisciplinas() {
  return (
    <StepByStepTutorial
      title="Aproveitamento de Disciplinas"
      subtitle="Processo completo para solicitar aproveitamento de estudos"
      steps={steps}
      videoUrl="https://www.youtube.com/embed/bOnyMYrLIU0?controls=1&rel=0"
      videoTitle="Processo no SEI Tutorial - Aproveitamento de disciplinas"
      documents={documents}
      socialMessage={<SocialMessageInstagram />}
    />
  )
}
