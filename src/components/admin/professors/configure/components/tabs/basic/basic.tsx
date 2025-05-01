import { FormMultipleTags } from '@/components/common/form/form-multiple-tags'
import { Card, CardContent } from '@/components/ui/card'
import { FormText } from '@/components/ui/form-fields/form-text'
import { FormTextarea } from '@/components/ui/form-fields/form-textarea'
import { Separator } from '@/components/ui/separator'
import { Fragment } from 'react'

export default function BasicTab() {
  const sections = [
    {
      title: 'Informações Básicas',
      fields: [
        {
          getComponent: () => (
            <FormText name="name" label="Nome" placeholder="Dr. João Silva" />
          ),
        },
        {
          getComponent: () => (
            <FormText
              name="email"
              label="Email"
              placeholder="joao.silva@fct.com"
            />
          ),
        },
      ],
    },
    {
      title: 'Resumo Profissional',
      fields: [
        {
          getComponent: () => (
            <FormTextarea
              className="md:col-span-2"
              name="summary"
              label="Resumo"
              placeholder="Resumo profissional"
            />
          ),
        },
      ],
    },
    {
      title: 'Informações de Contato',
      fields: [
        {
          getComponent: () => (
            <FormText
              name="officeHours"
              label="Horário de Atendimento"
              placeholder="Segunda e Quarta, 14h-16h"
            />
          ),
        },
        {
          getComponent: () => (
            <FormText
              name="lattes"
              label="Currículo Lattes"
              placeholder="http://lattes.cnpq.br/123456789"
            />
          ),
        },
      ],
    },
    {
      title: 'Áreas de Atuação',
      fields: [
        {
          getComponent: () => (
            <FormMultipleTags name="expertise" label="Especialidades" />
          ),
        },
      ],
    },
  ]

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="grid  gap-8 gap-y-10">
          {sections.map(section => (
            <div key={section.title} className="grid ">
              <h3 className="text-lg font-medium">{section.title}</h3>
              <Separator className="mb-4" />
              <div className="gap-4 gap-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 ">
                {section.fields.map((field, index) => (
                  <Fragment key={index}>{field.getComponent()}</Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
