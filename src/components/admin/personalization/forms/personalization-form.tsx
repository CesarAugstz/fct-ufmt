'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from '@/utils/zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ColorPicker } from '@/components/ui/color-picker'
import { defaultColors } from '@/store/personalization-store'
import { PERSONALIZATION_FIELD_DEFINITIONS } from '@/utils/mappers/personalization-mapper'

const personalizationFormSchema = z.object({
  // Light theme colors - main ones
  lightPrimary: z.string().min(1, 'Cor primária do tema claro é obrigatória'),
  lightPrimaryForeground: z
    .string()
    .min(1, 'Cor de texto primária do tema claro é obrigatória'),
  lightPrimaryLight: z
    .string()
    .min(1, 'Cor primária clara do tema claro é obrigatória'),
  lightSecondary: z
    .string()
    .min(1, 'Cor secundária do tema claro é obrigatória'),
  lightSecondaryForeground: z
    .string()
    .min(1, 'Cor de texto secundária do tema claro é obrigatória'),
  lightBackground: z
    .string()
    .min(1, 'Cor de fundo do tema claro é obrigatória'),
  lightBackgroundHover: z
    .string()
    .min(1, 'Cor de fundo hover do tema claro é obrigatória'),
  lightForeground: z
    .string()
    .min(1, 'Cor de texto do tema claro é obrigatória'),
  lightCard: z.string().min(1, 'Cor de card do tema claro é obrigatória'),
  lightCardForeground: z
    .string()
    .min(1, 'Cor de texto do card do tema claro é obrigatória'),
  lightPopover: z.string().min(1, 'Cor de popover do tema claro é obrigatória'),
  lightPopoverForeground: z
    .string()
    .min(1, 'Cor de texto do popover do tema claro é obrigatória'),
  lightMuted: z.string().min(1, 'Cor muted do tema claro é obrigatória'),
  lightMutedForeground: z
    .string()
    .min(1, 'Cor de texto muted do tema claro é obrigatória'),
  lightAccent: z.string().min(1, 'Cor de destaque do tema claro é obrigatória'),
  lightAccentForeground: z
    .string()
    .min(1, 'Cor de texto de destaque do tema claro é obrigatória'),
  lightDestructive: z
    .string()
    .min(1, 'Cor destrutiva do tema claro é obrigatória'),
  lightDestructiveForeground: z
    .string()
    .min(1, 'Cor de texto destrutiva do tema claro é obrigatória'),
  lightWarning: z.string().min(1, 'Cor de aviso do tema claro é obrigatória'),
  lightWarningForeground: z
    .string()
    .min(1, 'Cor de texto de aviso do tema claro é obrigatória'),
  lightBorder: z.string().min(1, 'Cor da borda do tema claro é obrigatória'),
  lightInput: z.string().min(1, 'Cor de input do tema claro é obrigatória'),
  lightRing: z.string().min(1, 'Cor de foco do tema claro é obrigatória'),

  // Dark theme colors
  darkPrimary: z.string().min(1, 'Cor primária do tema escuro é obrigatória'),
  darkPrimaryForeground: z
    .string()
    .min(1, 'Cor de texto primária do tema escuro é obrigatória'),
  darkPrimaryLight: z
    .string()
    .min(1, 'Cor primária clara do tema escuro é obrigatória'),
  darkSecondary: z
    .string()
    .min(1, 'Cor secundária do tema escuro é obrigatória'),
  darkSecondaryForeground: z
    .string()
    .min(1, 'Cor de texto secundária do tema escuro é obrigatória'),
  darkBackground: z
    .string()
    .min(1, 'Cor de fundo do tema escuro é obrigatória'),
  darkBackgroundHover: z
    .string()
    .min(1, 'Cor de fundo hover do tema escuro é obrigatória'),
  darkForeground: z
    .string()
    .min(1, 'Cor de texto do tema escuro é obrigatória'),
  darkCard: z.string().min(1, 'Cor de card do tema escuro é obrigatória'),
  darkCardForeground: z
    .string()
    .min(1, 'Cor de texto do card do tema escuro é obrigatória'),
  darkPopover: z.string().min(1, 'Cor de popover do tema escuro é obrigatória'),
  darkPopoverForeground: z
    .string()
    .min(1, 'Cor de texto do popover do tema escuro é obrigatória'),
  darkMuted: z.string().min(1, 'Cor muted do tema escuro é obrigatória'),
  darkMutedForeground: z
    .string()
    .min(1, 'Cor de texto muted do tema escuro é obrigatória'),
  darkAccent: z.string().min(1, 'Cor de destaque do tema escuro é obrigatória'),
  darkAccentForeground: z
    .string()
    .min(1, 'Cor de texto de destaque do tema escuro é obrigatória'),
  darkDestructive: z
    .string()
    .min(1, 'Cor destrutiva do tema escuro é obrigatória'),
  darkDestructiveForeground: z
    .string()
    .min(1, 'Cor de texto destrutiva do tema escuro é obrigatória'),
  darkWarning: z.string().min(1, 'Cor de aviso do tema escuro é obrigatória'),
  darkWarningForeground: z
    .string()
    .min(1, 'Cor de texto de aviso do tema escuro é obrigatória'),
  darkBorder: z.string().min(1, 'Cor da borda do tema escuro é obrigatória'),
  darkInput: z.string().min(1, 'Cor de input do tema escuro é obrigatória'),
  darkRing: z.string().min(1, 'Cor de foco do tema escuro é obrigatória'),

  // Sidebar colors
  lightSidebarBackground: z
    .string()
    .min(1, 'Cor de fundo da sidebar no tema claro é obrigatória'),
  lightSidebarForeground: z
    .string()
    .min(1, 'Cor de texto da sidebar no tema claro é obrigatória'),
  lightSidebarPrimary: z
    .string()
    .min(1, 'Cor primária da sidebar no tema claro é obrigatória'),
  lightSidebarPrimaryForeground: z
    .string()
    .min(1, 'Cor de texto primária da sidebar no tema claro é obrigatória'),
  lightSidebarAccent: z
    .string()
    .min(1, 'Cor de destaque da sidebar no tema claro é obrigatória'),
  lightSidebarAccentForeground: z
    .string()
    .min(1, 'Cor de texto de destaque da sidebar no tema claro é obrigatória'),
  lightSidebarBorder: z
    .string()
    .min(1, 'Cor da borda da sidebar no tema claro é obrigatória'),
  lightSidebarRing: z
    .string()
    .min(1, 'Cor de foco da sidebar no tema claro é obrigatória'),

  darkSidebarBackground: z
    .string()
    .min(1, 'Cor de fundo da sidebar no tema escuro é obrigatória'),
  darkSidebarForeground: z
    .string()
    .min(1, 'Cor de texto da sidebar no tema escuro é obrigatória'),
  darkSidebarPrimary: z
    .string()
    .min(1, 'Cor primária da sidebar no tema escuro é obrigatória'),
  darkSidebarPrimaryForeground: z
    .string()
    .min(1, 'Cor de texto primária da sidebar no tema escuro é obrigatória'),
  darkSidebarAccent: z
    .string()
    .min(1, 'Cor de destaque da sidebar no tema escuro é obrigatória'),
  darkSidebarAccentForeground: z
    .string()
    .min(1, 'Cor de texto de destaque da sidebar no tema escuro é obrigatória'),
  darkSidebarBorder: z
    .string()
    .min(1, 'Cor da borda da sidebar no tema escuro é obrigatória'),
  darkSidebarRing: z
    .string()
    .min(1, 'Cor de foco da sidebar no tema escuro é obrigatória'),

  // Chart colors
  chartColor1: z.string().min(1, 'Cor 1 do gráfico é obrigatória'),
  chartColor2: z.string().min(1, 'Cor 2 do gráfico é obrigatória'),
  chartColor3: z.string().min(1, 'Cor 3 do gráfico é obrigatória'),
  chartColor4: z.string().min(1, 'Cor 4 do gráfico é obrigatória'),
  chartColor5: z.string().min(1, 'Cor 5 do gráfico é obrigatória'),
})

type PersonalizationFormData = z.infer<typeof personalizationFormSchema>

interface PersonalizationFormProps {
  onSuccess: (data: PersonalizationFormData) => void
  personalization?: Partial<PersonalizationFormData>
}

export default function PersonalizationForm({
  onSuccess,
  personalization,
}: PersonalizationFormProps) {
  const form = useForm<PersonalizationFormData>({
    resolver: zodResolver(personalizationFormSchema),
    values: { ...defaultColors, ...personalization },
  })

  const onSubmit = async (data: PersonalizationFormData) => {
    try {
      console.log('Personalization data:', data)
      onSuccess(data)
    } catch (error) {
      console.error('Erro ao salvar personalização:', error)
    }
  }

  const resetToDefaults = () => {
    form.reset(defaultColors)
  }

  const ColorField = ({
    name,
    label,
    value,
  }: {
    name: keyof PersonalizationFormData
    label: string
    value: string
  }) => (
    <ColorPicker
      value={value}
      onChange={newValue => form.setValue(name, newValue)}
      label={label}
    />
  )

  const renderFieldsByCategory = (category: string) => {
    return PERSONALIZATION_FIELD_DEFINITIONS.filter(
      field => field.category === category,
    ).map(field => (
      <ColorField
        key={field.key}
        name={field.key as keyof PersonalizationFormData}
        label={field.label}
        value={watchedValues[field.key as keyof PersonalizationFormData]}
      />
    ))
  }

  const watchedValues = form.watch()

  return (
    <div className="space-y-6">
      {/* Live Preview Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Pré-visualização em Tempo Real</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Light Theme Preview */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Tema Claro</h4>
              <div
                className="p-4 rounded-lg border-2 space-y-3"
                style={{
                  backgroundColor: watchedValues.lightBackground,
                  borderColor: watchedValues.lightBorder,
                  color: watchedValues.lightForeground,
                }}
              >
                <div
                  className="px-3 py-2 rounded text-sm font-medium"
                  style={{
                    backgroundColor: watchedValues.lightPrimary,
                    color: watchedValues.lightPrimaryForeground,
                  }}
                >
                  Botão Primário
                </div>
                <div
                  className="px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: watchedValues.lightCard,
                    color: watchedValues.lightCardForeground,
                    border: `1px solid ${watchedValues.lightBorder}`,
                  }}
                >
                  Card de Exemplo
                </div>
                <div
                  className="px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: watchedValues.lightSecondary,
                    color: watchedValues.lightSecondaryForeground,
                  }}
                >
                  Botão Secundário
                </div>
              </div>
            </div>

            {/* Dark Theme Preview */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Tema Escuro</h4>
              <div
                className="p-4 rounded-lg border-2 space-y-3"
                style={{
                  backgroundColor: watchedValues.darkBackground,
                  borderColor: watchedValues.darkBorder,
                  color: watchedValues.darkForeground,
                }}
              >
                <div
                  className="px-3 py-2 rounded text-sm font-medium"
                  style={{
                    backgroundColor: watchedValues.darkPrimary,
                    color: watchedValues.darkPrimaryForeground,
                  }}
                >
                  Botão Primário
                </div>
                <div
                  className="px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: watchedValues.darkCard,
                    color: watchedValues.darkCardForeground,
                    border: `1px solid ${watchedValues.darkBorder}`,
                  }}
                >
                  Card de Exemplo
                </div>
                <div
                  className="px-3 py-2 rounded text-sm"
                  style={{
                    backgroundColor: watchedValues.darkSecondary,
                    color: watchedValues.darkSecondaryForeground,
                  }}
                >
                  Botão Secundário
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {personalization ? 'Editar Personalização' : 'Nova Personalização'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="light" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="light">Tema Claro</TabsTrigger>
                  <TabsTrigger value="dark">Tema Escuro</TabsTrigger>
                  <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
                  <TabsTrigger value="charts">Gráficos</TabsTrigger>
                </TabsList>

                <TabsContent value="light" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cores do Tema Claro</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {renderFieldsByCategory('light')}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="dark" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cores do Tema Escuro</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {renderFieldsByCategory('dark')}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="sidebar" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Sidebar - Tema Claro</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {renderFieldsByCategory('sidebar-light')}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Sidebar - Tema Escuro</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {renderFieldsByCategory('sidebar-dark')}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="charts" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cores dos Gráficos</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {renderFieldsByCategory('chart')}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetToDefaults}
                >
                  Resetar Padrões
                </Button>

                <Button type="submit">
                  {personalization
                    ? 'Salvar Alterações'
                    : 'Criar Personalização'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
