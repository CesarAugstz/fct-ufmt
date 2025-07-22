import { z } from '@/utils/zod'
import { Alignment, BlockSize, ContentNature, GridSize } from '@prisma/client'

export const getBlockSchema = () => {
  return z.object({
    id: z.string(),
    nature: z.enum(ContentNature),
    content: z.string().nullish(),
    caption: z.string().nullish(),
    size: z.enum(BlockSize).nullish(),
    alignment: z.enum(Alignment).nullish(),
    order: z.number().nullish(),
    withBorder: z.boolean(),
    gridSize: z.enum(GridSize),
    accordionItems: z
      .array(
        z.object({
          title: z.string(),
          content: z.string(),
        }),
      )
      .nullish(),
    file: z
      .object({
        id: z.ulid(),
        name: z.string(),
        dataUrl: z.string(),
        mimeType: z.string(),
        size: z.number(),
      })
      .nullish(),
  })
}

export type BlockSchema = z.infer<ReturnType<typeof getBlockSchema>>
