import FaqItemPage from '@/components/home/courses/course-detail/components/faq-item-page'

export default async function CourseFaqItemPage({
  params,
}: {
  params: Promise<{ slug: string; faqSlug: string }>
}) {
  const { slug, faqSlug } = await params

  return <FaqItemPage courseSlug={slug} faqSlug={faqSlug} />
}
