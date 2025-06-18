import AproveitamentoDisciplinas from '@/components/home/faq/faq-items/aproveitamento-disciplinas'
import AtividadesComplementares from '@/components/home/faq/faq-items/atividades-complementares'
import BibliotecaVirtualUniversitariaDaPearson from '@/components/home/faq/faq-items/biblioteca-virtual-universitaria-da-pearson'
import { notFound } from 'next/navigation'

const faqPages = {
  'aproveitamento-de-disciplinas': AproveitamentoDisciplinas,
  'atividades-complementares': AtividadesComplementares,
  'biblioteca-virtual-universitaria-da-pearson':
    BibliotecaVirtualUniversitariaDaPearson,
}

export default async function Page({
  params,
}: {
  params: Promise<{ faqItem: string }>
}) {
  const { faqItem } = await params

  const Component = faqPages[faqItem as keyof typeof faqPages]

  if (!Component) return notFound()

  return <Component />
}
