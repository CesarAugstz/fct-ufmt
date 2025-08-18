import HeaderMadrid from '@/components/common/header-madrid'
import { Block } from '@/components/ui/form-fields/blocks-field'
import { BlockContentRenderer } from '@/components/common/block-content-renderer'
import NotFoundPage from '@/components/common/not-found-page'

export default async function GenericPage({
  content,
  title,
  subtitle,
}: {
  content: Block[]
  title: string
  subtitle?: string
}) {
  if (!content) {
    return (
      <NotFoundPage
        title="Página não encontrada"
        description="A página que você está procurando não foi encontrada."
        showHomeButton={true}
        showBackButton={true}
      />
    )
  }

  return (
    <>
      <HeaderMadrid
        title={title}
        subtitle={subtitle}
        showBackButton
        backButtonLabel="Voltar para home"
        backButtonHref="/home"
        showShareButton
        shareData={{
          title: title,
          text: subtitle || '',
        }}
      />
      <div className="container mx-auto py-12 px-4">
        <BlockContentRenderer blocks={content as Block[]} />
      </div>
    </>
  )
}

