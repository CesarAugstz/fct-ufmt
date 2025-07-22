import { BlockContentRenderer } from '@/components/common/block-content-renderer'
import HeaderMadrid from '@/components/common/header-madrid'
import { Block } from '@/components/ui/form-fields/blocks-field'
import { getManagementData } from '@/lib/server-cached/management-data'

export default async function Management() {
  const content = await getManagementData()

  if (!content) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Conteúdo em breve...</p>
      </div>
    )
  }

  return (
    <>
      <HeaderMadrid
        title="Gestão"
        subtitle="Conheça a gestão da FCT"
        showBackButton
        backButtonLabel="Voltar para home"
        backButtonHref="/home"
        showShareButton
        shareData={{
          title: 'Gestão da FCT',
          text: 'Conheça a gestão da FCT',
        }}
      />
      <div className="container mx-auto py-12 px-4">
        <BlockContentRenderer blocks={content.contentBlocks as Block[]} />
      </div>
    </>
  )
}
