import NavigationCards from '@/components/common/navigation-cards'
import SeiLogo from '@/components/logos/sei.logo'
import { Icon } from '@/components/ui/icon'
import { QuickLink } from '@zenstackhq/runtime/models'
import { Calendar, FileUser, Map, MonitorCog, Settings } from 'lucide-react'

interface QuickLinksSectionProps {
  quickLinks?: QuickLink[]
}

export default function QuickLinksSection({
  quickLinks,
}: QuickLinksSectionProps) {
  const cardClassName = 'size-8 md:size-12'

  // TODO: put generic icon component
  const iconMap = {
    MonitorCog: <MonitorCog className={cardClassName} />,
    SeiLogo: <SeiLogo className={cardClassName} />,
    Calendar: <Calendar className={cardClassName} />,
    Settings: <Settings className={cardClassName} />,
    FileUser: <FileUser className={cardClassName} />,
    Map: <Map className={cardClassName} />,
  }

  const cards = quickLinks?.map(link => ({
    id: link.title,
    icon: <Icon name={link.icon ?? ''} className={cardClassName} />,
    title: link.title,
    description: link.subtitle,
    href: link.url,
    color: 'blue' as const,
  }))

  if (!cards || cards.length === 0) {
    return null
  }

  return (
    <NavigationCards
      cards={cards || []}
      title="Links Rápidos"
      description="Acesse diretamente os sistemas e recursos mais utilizados"
    />
  )
}
