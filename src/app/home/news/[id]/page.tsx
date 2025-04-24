import NewsDetail from '@/components/home/news/news-detail'

export default async function NewsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // TODO: fetch news item from database
  const id = (await params).id
  return <NewsDetail id={id} />
}
