import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useCourseFAQ } from '../hooks/use-course-data'

interface CourseFAQTabProps {
  courseSlug: string
}

export default function CourseFAQTab({ courseSlug }: CourseFAQTabProps) {
  const { faq } = useCourseFAQ(courseSlug)

  if (!faq.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Dúvidas frequentes em construção...
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        {faq.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
