import { db } from '@/server/db'

const handler = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  console.log('searchParams', searchParams)
  const id = searchParams.get('id')

  if (!id) {
    return new Response('No id provided', { status: 400 })
  }

  const attachment = await db.attachment.findUniqueOrThrow({
    where: { id },
    select: { dataUrl: true, mimeType: true },
  })

  const base64Data = attachment.dataUrl.split(',')[1]
  const buffer = Buffer.from(base64Data, 'base64')

  return new Response(buffer, {
    status: 200,
    headers: { 'Content-Type': attachment.mimeType },
  })
}

export { handler as GET }
