import { Card, CardContent } from '@/components/ui/card'
import {
  FormFieldSection,
  useRenderFormSections,
} from '@/lib/hooks/form/render-form-fields'
import { useEffect, useState } from 'react'

export default function BasicTab() {
  const sections: FormFieldSection[] = [
    {
      title: 'Informações Básicas',
      fields: [
        {
          type: 'text',
          getProps: () => ({
            name: 'user.name',
            label: 'Nome',
            placeholder: 'Dr. João Silva',
            required: true,
          }),
        },
        {
          type: 'text',
          getProps: () => ({
            name: 'user.email',
            label: 'Email',
            placeholder: 'joao.silva@fct.com',
            required: true,
          }),
        },
      ],
    },
    {
      title: 'Resumo Profissional',
      fields: [
        {
          type: 'textarea',
          getProps: () => ({
            name: 'summary',
            label: 'Resumo',
            placeholder: 'Resumo profissional',
            className: 'md:col-span-2',
          }),
        },
      ],
    },
    {
      title: 'Informações de Contato',
      fields: [
        {
          type: 'text',
          getProps: () => ({
            name: 'officeHours',
            label: 'Horário de Atendimento',
            placeholder: 'Segunda e Quarta, 14h-16h',
          }),
        },
        {
          type: 'text',
          getProps: () => ({
            name: 'lattes',
            label: 'Currículo Lattes',
            placeholder: 'http://lattes.cnpq.br/123456789',
          }),
        },
      ],
    },
    {
      title: 'Áreas de Atuação',
      fields: [
        {
          type: 'multiple-tags',
          getProps: () => ({
            name: 'specialties',
            label: 'Especialidades',
            className: 'md:col-span-2',
          }),
        },
      ],
    },
  ]

  const [canRender, setCanRender] = useState(false)

  // FIX: something is wrong on formcontext render
  useEffect(() => {
    setTimeout(() => {
      setCanRender(true)
    }, 100)
  }, [])

  const sectionsComponent = useRenderFormSections(sections)

  if (!canRender) {
    return null
  }

  return (
    <Card>
      <CardContent className="p-6">{sectionsComponent}</CardContent>
    </Card>
  )
}
