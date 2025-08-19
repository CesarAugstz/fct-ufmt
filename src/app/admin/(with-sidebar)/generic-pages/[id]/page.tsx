import PageDetail from '@/components/admin/generic-pages/page-detail'

export default async function GenericPageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <PageDetail pageId={id} />
}
