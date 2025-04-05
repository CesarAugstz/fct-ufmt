'use client'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { PlusCircle, Save, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BaseCard } from '@/components/ui/base-card'
import {
  useCreateBlockComponent,
  useDeleteBlockComponent,
  useDeleteManyBlockComponent,
  useFindUniquePage,
  useUpdatePage,
} from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { ActionButton } from '@/components/ui/action-button'
import { BlockType } from '@prisma/client'
import { useDragDrop } from '@/hooks/useDragDrop'
import { SortableBlockItem } from '@/components/admin/block-components/sortable-block-item'
import { getDefaultContentForBlockType } from '@/types/admin/block-components.types'
import { BlocksProvider, useBlocks } from '@/contexts/BlocksContext'

function PageConfigureContent({ id }: { id: string }) {
  const router = useRouter()
  const toast = useToast()
  const { data: page, isLoading } = useFindUniquePage({
    where: { id },
    include: { blockComponents: true },
  })
  const updatePageMutation = useUpdatePage({})
  const createBlockMutation = useCreateBlockComponent()
  const deleteManyBlockMutation = useDeleteManyBlockComponent()

  const { blocks, setBlocks, addBlock } = useBlocks()

  const { DndContextComponent } = useDragDrop(blocks, setBlocks)

  useEffect(() => {
    if (page?.blockComponents) {
      setBlocks(
        page.blockComponents.map(block => ({
          id: block.id,
          type: block.blockType,
          content: block.content,
        })),
      )
    }
  }, [page, setBlocks])

  const handleAddBlock = (type: BlockType) => {
    addBlock(type, getDefaultContentForBlockType(type))
  }

  const saveChanges = async () => {
    try {
      await deleteManyBlockMutation.mutateAsync({
        where: { pageId: id },
      })
      
      await Promise.all(
        blocks.map(block =>
          createBlockMutation.mutateAsync({
            data: {
              pageId: id,
              blockType: block.type,
              content: block.content,
            },
          }),
        ),
      )
      toast.success('Page configuration saved successfully')
    } catch (error) {
      console.error('Error saving page:', error)
      toast.exception(error)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (!page) return <div>Page not found</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => router.push('/admin/pages')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Pages
        </Button>

        <ActionButton mutations={[updatePageMutation]} onClick={saveChanges}>
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </ActionButton>
      </div>

      <BaseCard
        title={`Configuring Page: ${page.name}`}
        description={`Slug: ${page.slug}`}
      >
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button onClick={() => handleAddBlock(BlockType.TITLE)}>
              <PlusCircle className="h-4 w-4 mr-2" /> Add Title Block
            </Button>
            <Button onClick={() => handleAddBlock(BlockType.MARKDOWN)}>
              <PlusCircle className="h-4 w-4 mr-2" /> Add Markdown Block
            </Button>
          </div>

          {blocks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No blocks added yet. Use the buttons above to add content blocks.
            </div>
          ) : (
            <DndContextComponent>
              <AnimatePresence>
                {blocks.map(block => (
                  <motion.div key={block.id} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layout className="space-y-4">
                    <SortableBlockItem
                      key={block.id}
                      id={block.id}
                      block={block}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </DndContextComponent>
          )}
        </div>
      </BaseCard>
    </div>
  )
}

export default function PageConfigure({ params }: { params: { id: string } }) {
  return (
    <BlocksProvider>
      <PageConfigureContent id={params.id} />
    </BlocksProvider>
  )
}
