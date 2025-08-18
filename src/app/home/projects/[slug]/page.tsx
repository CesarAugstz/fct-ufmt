import HeaderMadrid from '@/components/common/header-madrid'
import { Block } from '@/components/ui/form-fields/blocks-field'
import { BlockContentRenderer } from '@/components/common/block-content-renderer'
import { getProjectData } from '@/lib/server-cached/project-data'
import NotFoundPage from '@/components/common/not-found-page'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const content = await getProjectData(slug)

  if (!content) {
    return (
      <NotFoundPage
        title="Projeto não encontrado"
        description="O projeto que você está procurando não existe ou pode ter sido removido. Verifique se o ID do projeto está correto."
        showHomeButton={true}
        showBackButton={true}
      />
    )
  }

  return (
    <>
      <HeaderMadrid
        title={content.title}
        subtitle={content.description}
        showBackButton
        backButtonLabel="Voltar para home"
        backButtonHref="/home"
        showShareButton
        shareData={{
          title: content.title,
          text: content.description || '',
        }}
      />
      <div className="container mx-auto py-12 px-4">
        <BlockContentRenderer blocks={content.contentBlocks as Block[]} />
      </div>
    </>
  )
}
