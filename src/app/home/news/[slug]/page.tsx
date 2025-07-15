import NewsDetail from '@/components/home/news/news-detail'

export default async function NewsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  console.log(slug)
  return <NewsDetail slug={slug} />
}
