import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, ExternalLink, Users, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCourseAdmission } from '../hooks/use-course-data'
import { dayJs } from '@/utils/dayjs'

interface CourseAdmissionTabProps {
  courseSlug: string
}

export default function CourseAdmissionTab({
  courseSlug,
}: CourseAdmissionTabProps) {
  const { admissionInfo } = useCourseAdmission(courseSlug)

  if (!admissionInfo) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Informações sobre ingresso em breve...
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Período de Inscrições
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Início:</p>
              <p className="font-medium">
                {dayJs(admissionInfo.enrollmentPeriod.start).format(
                  'DD/MM/YYYY',
                )}
              </p>
              <p className="text-sm text-muted-foreground mt-4">Fim:</p>
              <p className="font-medium">
                {dayJs(admissionInfo.enrollmentPeriod.end).format('DD/MM/YYYY')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Vagas Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {admissionInfo.vacancies}
              </div>
              <Badge variant="outline">vagas oferecidas</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Processo Seletivo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{admissionInfo.process}</p>

          <div>
            <h4 className="font-medium mb-3">Requisitos:</h4>
            <ul className="space-y-2">
              {admissionInfo.requirements.map((requirement, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {admissionInfo.websiteUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Como se inscrever</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Para se inscrever, acesse o site oficial do processo seletivo:
            </p>

            <Button asChild>
              <Link
                href={admissionInfo.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Acessar site de inscrições
              </Link>
            </Button>

            {admissionInfo.qrCodeImage && (
              <div className="flex justify-center mt-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Ou escaneie o QR Code:
                  </p>
                  <Image
                    src={admissionInfo.qrCodeImage}
                    alt="QR Code para inscrições"
                    width={150}
                    height={150}
                    className="mx-auto"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
