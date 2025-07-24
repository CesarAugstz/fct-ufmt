import {
  useDeleteManyContentBlock,
  useUpsertContentBlock,
} from '../zenstack-hooks'
import { BlockSchema } from '@/components/ui/form-fields/blocks/blocks.schema'
import { ulid } from 'ulidx'

interface UpdateContentBlocksParams {
  managementId?: string
  projectId?: string
}

export function useUpdateContentBlocks({
  managementId,
  projectId,
}: UpdateContentBlocksParams = {}) {
  const upsertMutation = useUpsertContentBlock()
  const deleteMutation = useDeleteManyContentBlock()

  const updateContentBlocks = async (
    blocks: BlockSchema[],
    oldBlocks?: BlockSchema[],
  ) => {
    if (!managementId && !projectId) throw new Error('No relation id provided')

    const blocksToDelete = oldBlocks
      ?.filter(block => !blocks.find(b => b.id === block.id))
      .map(block => block.id)
      .filter(Boolean) as string[] | undefined

    const upsertPromises = blocks
      .map((block, index) => ({ ...block, order: index }))
      .map(block =>
        upsertMutation.mutateAsync({
          where: { id: block.id },
          update: {
            ...block,
            ...(managementId
              ? { management: { connect: { id: managementId } } }
              : {}),
            ...(projectId ? { project: { connect: { id: projectId } } } : {}),
            accordionItems: block.accordionItems || [],
            file: {
              upsert: {
                where: { id: block.file?.id ?? ulid() },
                update: {},
                create: {
                  ...block.file,
                  name: block.file?.name ?? '',
                  dataUrl: block.file?.dataUrl ?? '',
                  mimeType: block.file?.mimeType ?? '',
                  size: block.file?.size ?? 0,
                },
              },
            },
          },
          create: {
            ...block,
            ...(projectId ? { project: { connect: { id: projectId } } } : {}),
            ...(managementId
              ? { management: { connect: { id: managementId } } }
              : {}),
            accordionItems: block.accordionItems || [],
            file: block.file ? { create: block.file } : undefined,
          },
        }),
      )

    const deletePromise = blocksToDelete?.length
      ? deleteMutation.mutateAsync({
          where: { id: { in: blocksToDelete } },
        })
      : Promise.resolve()

    await Promise.all([deletePromise, ...upsertPromises])
  }

  return {
    updateContentBlocks,
    deleteMutation,
    upsertMutation,
    isLoading: upsertMutation.isPending || deleteMutation.isPending,
  }
}
