import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Phone } from 'lucide-react'
import { useCoursePoles } from '../hooks/use-course-data'

interface CouCoursePolesSectionProps {
  courseSlug: string
}

export default function CoursePolesSection({
  courseSlug,
}: CouCoursePolesSectionProps) {
  const { poles } = useCoursePoles(courseSlug)

  if (!poles.length) {
    return null
  }

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Conheça os polos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                Com polos estrategicamente distribuídos em várias cidades, o
                curso facilita o acesso à educação de qualidade em diferentes
                regiões.
              </p>
              <ul>
                <li>
                  Cada polo oferece suporte presencial para que os alunos possam
                  participar de atividades práticas, como os encontros do
                  Projeto Integrador, e ter contato direto com professores e
                  tutores.
                </li>
                <li>
                  Explore os polos e descubra como eles podem contribuir para
                  sua jornada acadêmica e profissional.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Polos Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {poles.map((pole, index) => (
                <AccordionItem key={index} value={`pole-${index}`}>
                  <AccordionTrigger className="text-left">
                    {pole.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{pole.city}</span>
                      </div>

                      {pole.address && (
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5" />
                          <span>{pole.address}</span>
                        </div>
                      )}

                      {pole.contact && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{pole.contact}</span>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
