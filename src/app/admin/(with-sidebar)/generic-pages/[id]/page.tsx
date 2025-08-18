import PageDetail from '@/components/admin/generic-pages/page-detail'

interface PageProps {
  params: {
    id: string
  }
}

export default function GenericPageDetailPage({ params }: PageProps) {
  return <PageDetail pageId={params.id} />
}
