import NewsDetail from '@/components/home/news/news-detail'

export default async function NewsPage({ params }: { params: { id: string } }) {
  // TODO: fetch news item from database
  return <NewsDetail id={params.id} />
}
