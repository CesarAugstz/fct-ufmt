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
} from 'lucide-react'

export default function QuickLinksSection() {
  const cardClassName = 'w-12 h-12'

  const cards: NavigationCardsProps['cards'] = [
    {
      id: 'portal-academico',
      icon: <MonitorCog className={cardClassName} />,
      title: 'Portal Acadêmico',
      description: 'Acesse o portal acadêmico da UFMT',
      href: 'https://portal.setec.ufmt.br/ufmt-setec-portal-academico/',
      color: 'blue',
    },
    {
      id: 'sei',
      href: 'https://sei.ufmt.br/sei/controlador_externo.php?acao=usuario_externo_logar&acao_origem=usuario_externo_enviar_cadastro&id_orgao_acesso_externo=0',
      icon: <SeiLogo className={cardClassName} />,
      title: 'Acessos SEI',
      description: 'Sistema Eletrônico de Informações',
      color: 'amber',
    },
    {
      id: 'reserva-salas',
      href: 'https://academico-siga.ufmt.br/ufmt.sirefi',
      icon: <Calendar className={cardClassName} />,
      title: 'Reserva de Salas',
      description: 'Agende salas e recursos',
      color: 'green',
    },
    {
      id: 'suporte',
      href: 'https://wa.me/556536158078',
      icon: <Settings className={cardClassName} />,
      title: 'Suporte',
      description: 'Entre em contato com o suporte',
      color: 'red',
    },
    {
      id: 'painel-indicadores',
      icon: <FileUser className={cardClassName} />,
      title: 'Painel de Indicadores',
      description: 'Visualize estatísticas e dados',
      color: 'purple',
    },
    {
      id: 'localizacao',
      icon: <Map className={cardClassName} />,
      title: 'Localização',
      description: 'Veja como chegar à FCT-UFMT',
      href: 'https://maps.app.goo.gl/Rvrw2gXvc3E65edu9',
      color: 'indigo',
    },
  ] as const

  return (
    <NavigationCards
      cards={cards}
      title="Links Rápidos"
      description="Acesse diretamente os sistemas e recursos mais utilizados"
    />
  )
}
