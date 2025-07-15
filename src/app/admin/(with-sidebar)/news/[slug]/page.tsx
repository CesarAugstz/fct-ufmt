import { NewsForm } from '@/components/admin/news/news-form'

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  console.log('params', slug)
  return <NewsForm id={slug} />
}
