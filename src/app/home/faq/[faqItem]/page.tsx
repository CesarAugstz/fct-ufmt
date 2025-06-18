import AproveitamentoDisciplinas from '@/components/home/faq/faq-items/aproveitamento-disciplinas'
import AtividadesComplementares from '@/components/home/faq/faq-items/atividades-complementares'
import { redirect } from 'next/navigation'

const faqPages = {
  'aproveitamento-de-disciplinas': AproveitamentoDisciplinas,
  'atividades-complementares': AtividadesComplementares,
}

export default async function Page({
  params,
}: {
  params: Promise<{ faqItem: string }>
}) {
  const { faqItem } = await params

  const Component = faqPages[faqItem as keyof typeof faqPages]

  if (!Component) return redirect('/home/faq')

  return <Component />
}
