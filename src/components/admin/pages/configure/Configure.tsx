'use client'

import { ActionButton } from '@/components/ui/action-button'
import { BaseCard } from '@/components/ui/base-card'
import { Button } from '@/components/ui/button'
import { useDragDrop } from '@/hooks/useDragDrop'
import { useToast } from '@/lib/hooks/toast'
import { useFindUniquePage, useUpdatePage } from '@/lib/zenstack-hooks'
import { getDefaultContentForBlockType } from '@/types/admin/block-components.types'
import { BlockType } from '@prisma/client'
import { ArrowLeft, Save, PlusCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useEffect, useCallback } from 'react'
import { invalidatePagesCache } from '@/app/admin/pages/actions'
import { ulid } from 'ulidx'
import { SortableBlockItem } from './block-components/sortable-block-item'
import { blocksAtom } from './state/blocks.state'
import { useAtom } from 'jotai'
import { isEqualJson } from '@/lib/utils'

export function Configure({ id }: { id: string }) {
  console.log('COMPONENT', 'Configure', id)
  const router = useRouter()
  const toast = useToast()
  const {
    data: page,
    isLoading,
    isSuccess,
  } = useFindUniquePage({
    where: { id },
    include: { blockComponents: true },
  })

  console.log('page', page?.blockComponents)
  const [blocks, setBlocks] = useAtom(blocksAtom)

  const updatePageMutation = useUpdatePage({
    onSettled: () => invalidatePagesCache(),
  })

  const { DndContextComponent } = useDragDrop(blocks, setBlocks)

  useEffect(() => {
    console.log('useEffect page', page?.blockComponents)
    if (!page?.blockComponents) return
    const clonePage = structuredClone(page)

    const orderedBlocks = clonePage.blockComponents.sort(
      (a, b) => a.order - b.order,
    )

    setBlocks(_ => [...orderedBlocks])
  }, [page?.blockComponents, setBlocks])

  const handleAddBlock = useCallback(
    (blockType: BlockType) => {
      setBlocks(prevBlocks => [
        ...prevBlocks,
        {
          id: ulid(),
          blockType,
          content: getDefaultContentForBlockType(blockType),
          order: prevBlocks.length,
        },
      ])
    },
    [setBlocks],
  )

  const saveChanges = useCallback(async () => {
    try {
      const orderedBlocks = blocks.map((block, index) => ({
        id: block.id,
        blockType: block.blockType,
        content: block.content,
        order: index,
      }))

      console.log('orderedBlocks', orderedBlocks, page?.blockComponents)

      const blocksToUpdate = orderedBlocks.filter(block =>
        page?.blockComponents?.some(
          initialBlock =>
            initialBlock.id === block.id &&
            (!isEqualJson(block.content, initialBlock.content) ||
              !isEqualJson(block.order, initialBlock.order)),
        ),
      )

      const blocksToCreate = orderedBlocks.filter(
        block =>
          !page?.blockComponents?.some(
            initialBlock => initialBlock.id === block.id,
          ),
      )
      const blocksToDelete = page?.blockComponents?.filter(
        block => !blocks.some(updatedBlock => updatedBlock.id === block.id),
      )

      console.log('blocks', {
        blocksToUpdate,
        blocksToCreate,
        blocksToDelete,
      })

      await updatePageMutation.mutateAsync({
        where: { id },
        data: {
          blockComponents: {
            create: blocksToCreate?.map(block => ({
              ...block,
              content: block.content as any,
            })),
            update: blocksToUpdate?.map(block => ({
              where: { id: block.id },
              data: {
                content: block.content as any,
                order: block.order,
              },
            })),
            deleteMany: { id: { in: blocksToDelete?.map(block => block.id) } },
          },
        },
      })

      toast.success('Page configuration saved successfully')
    } catch (error) {
      console.error('Error saving page:', error)
      toast.exception(error)
    }
  }, [blocks, id, toast, updatePageMutation, page?.blockComponents])

  if (!page && !isLoading) return <div>Page not found</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => router.push('/admin/pages')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Pages
        </Button>

        <ActionButton
          variant="default"
          mutations={[updatePageMutation]}
          onClick={saveChanges}
        >
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </ActionButton>
      </div>

      <BaseCard
        title={`Configuring Page: ${page?.name ?? '...'}`}
        description={`Slug: ${page?.slug ?? '...'}`}
        loading={isLoading}
      >
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => handleAddBlock(BlockType.TITLE)}
            >
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
                  <motion.div
                    key={block.id}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout
                    className="space-y-4"
                  >
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

export default function ConfigureWrapped(props: { id: string }) {
  return <Configure {...props} />
}
