import Configure from '@/components/admin/pages/configure/Configure'


export default async function PageConfigure({ params }: { params: Promise<{ id: string }> }) {
  const { id }  = await params
  console.log('COMPONENT', 'PageConfigure', id)
  return (
    <Configure id={id} />
  )
}
