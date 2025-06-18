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
      src: '/faq/atividades-complementares/sei-login.png',
      alt: 'Interface gráfica do usuário, Aplicativo',
      width: 222,
      height: 287,
    },
    warning: (
      <>
        <strong>Atenção:</strong> Caso ainda não possua cadastro, clique no
        link: Clique aqui para se cadastrar.
      </>
    ),
  },
  {
    number: 2,
    description:
      'Com o Login concluído, clique em "Peticionamento" e depois em "Processo Novo".',
    image: {
      src: '/faq/atividades-complementares/peticionamento-menu.png',
      alt: 'Interface gráfica do usuário, Texto, Aplicativo',
      width: 309,
      height: 325,
    },
  },
  {
    number: 3,
    description: 'Selecione o Tipo de Processo "ATIVIDADES COMPLEMENTARES".',
    image: {
      src: '/faq/atividades-complementares/atividades-complementares-selection.png',
      alt: 'Seleção do tipo de processo Atividades Complementares',
      width: 643,
      height: 266,
    },
  },
  {
    number: 4,
    description:
      'Na parte de especificação colocar o "Aproveitamento de Atividades Complementares", preencher o Documento Principal de Identificação com os seus dados e as atividades que serão aproveitadas, e por último, selecionar o Nível de Acesso "Público".',
    image: {
      src: '/faq/atividades-complementares/form-filling.png',
      alt: 'Preenchimento do formulário de atividades complementares',
      width: 642,
      height: 351,
    },
    warning: (
      <>
        <strong>Atenção:</strong> Ao preencher o Formulário: &quot;Estudante –
        Identificação Padrão&quot;, é necessário clicar em &quot;Salvar&quot; no
        canto superior esquerdo antes de voltar à tela principal.
      </>
    ),
  },
  {
    number: 5,
    description:
      'Anexe ao processo os documentos essenciais contidos no campo "Orientações sobre o Tipo de Processo", na imagem do passo 4 e depois clique em "Peticionar".',
    image: {
      src: '/faq/atividades-complementares/document-attachment.png',
      alt: 'Tela de anexo de documentos',
      width: 641,
      height: 248,
    },
  },
]

export default function AtividadesComplementares() {
  return (
    <StepByStepTutorial
      title="Atividades Complementares"
      subtitle="Processo completo para solicitar aproveitamento de atividades complementares"
      steps={steps}
      socialMessage={<SocialMessageInstagram />}
    />
  )
}
