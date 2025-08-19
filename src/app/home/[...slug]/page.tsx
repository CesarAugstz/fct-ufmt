import GenericPage from '@/components/home/generic/generic-page'
import { Block } from '@/components/ui/form-fields/blocks-field'
import { getGenericPageData } from '@/lib/server-cached/generic-page-data'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const page = await getGenericPageData(slug)

  return (
    <GenericPage
      content={page?.contentBlocks as Block[]}
      title={page?.title}
      subtitle={page?.description}
    />
  )
}
