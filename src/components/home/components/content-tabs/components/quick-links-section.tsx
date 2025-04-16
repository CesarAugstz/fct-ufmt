import NavigationCards, {
  NavigationCardsProps,
} from '@/components/common/navigation-cards'
import SeiLogo from '@/components/logos/sei.logo'
import {
  Calendar,
  FileUser,
  Map,
  MonitorCog,
  Settings,
  Smartphone,
} from 'lucide-react'

export default function QuickLinksSection() {
  const cardClassName = 'w-full h-full'

  const cards: NavigationCardsProps['cards'] = [
    {
      id: 'portal-academico',
      icon: <MonitorCog className={cardClassName} />,
      title: 'Portal Acadêmico',
      href: 'https://portal.setec.ufmt.br/ufmt-setec-portal-academico/',
    },
    {
      id: 'sei',
      href: 'https://sei.ufmt.br/sei/controlador_externo.php?acao=usuario_externo_logar&acao_origem=usuario_externo_enviar_cadastro&id_orgao_acesso_externo=0',
      icon: <SeiLogo className={cardClassName} />,
      title: 'Acessos SEI',
    },
    {
      id: 'reserva-salas',
      href: 'https://academico-siga.ufmt.br/ufmt.sirefi',
      icon: <Calendar className={cardClassName} />,
      title: 'Reserva de Salas',
    },
    {
      id: 'suporte',
      href: 'https://wa.me/556536158078',
      icon: <Settings className={cardClassName} />,
      title: 'Suporte',
    },
    {
      id: 'painel-indicadores',
      icon: <FileUser className={cardClassName} />,
      title: 'Painel de Indicadores',
    },
    {
      id: 'localizacao',
      icon: <Map className={cardClassName} />,
      title: 'Localização',
      href: 'https://maps.app.goo.gl/Rvrw2gXvc3E65edu9',
    },

  ] as const

  return <NavigationCards cards={cards} />
}
