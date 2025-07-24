export const contentBlocksPrismaSelection = {
  orderBy: { order: 'asc' },
  select: {
    id: true,
    nature: true,
    content: true,
    caption: true,
    size: true,
    alignment: true,
    fileId: true,
    order: true,
    withBorder: true,
    accordionItems: true,
    gridSize: true,
    file: {
      select: {
        id: true,
        name: true,
        dataUrl: true,
        mimeType: true,
        size: true,
      },
    },
  },
} as const
