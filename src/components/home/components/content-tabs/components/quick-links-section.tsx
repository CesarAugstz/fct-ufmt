import NavigationCards from '@/components/common/navigation-cards'
import { Icon } from '@/components/ui/icon'
import { QuickLink } from '@zenstackhq/runtime/models'

interface QuickLinksSectionProps {
  quickLinks?: QuickLink[]
}

export default function QuickLinksSection({
  quickLinks,
}: QuickLinksSectionProps) {
  const cardClassName = 'size-8 md:size-12'

  const cards = quickLinks?.map(link => ({
    id: link.title,
    icon: <Icon name={link.icon ?? ''} className={cardClassName} />,
    title: link.title,
    description: link.subtitle,
    href: link.url,
    color: link.color ?? 'indigo',
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
