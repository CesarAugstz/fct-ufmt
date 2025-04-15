import NavigationCards, {
  NavigationCardsProps,
} from '@/components/common/navigation-cards'
import { FileUser, MonitorCog } from 'lucide-react'

export default function QuickLinksSection() {
  const cards: NavigationCardsProps['cards'] = [
    {
      id: 'portal-sistemas',
      icon: <MonitorCog />,
      title: 'Portal de Sistemas',
    },
    {
      id: 'sei',
      href: 'https://sei.ufmt.br/sei/controlador_externo.php?acao=usuario_externo_logar&acao_origem=usuario_externo_enviar_cadastro&id_orgao_acesso_externo=0',
      icon: <FileUser />,
      title: 'Acessos SEI',
    },
  ]

  return <NavigationCards cards={cards} />
}
