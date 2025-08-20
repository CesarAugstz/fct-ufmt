'use client'

import { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from '@/utils/zod'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { BaseCard } from '@/components/ui/base-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { FileWarning } from 'lucide-react'
import { FormText, FormTextarea } from '@/components/ui/form-fields'
import { FormFile } from '@/components/ui/form-fields/form-file'
import FormGrid from '@/components/ui/form-fields/form-grid'
import { FormMultipleTags } from '@/components/common/form/form-multiple-tags'
import { QuickLinksForm } from './components/quick-links-form'
import { BannerNumbersForm } from './components/banner-numbers-form'
import { UsefulLinksForm } from './components/useful-links-form'
import {
  useFindFirstCollegeData,
  useUpdateCollegeData,
  useCreateCollegeData,
  useUpsertAttachment,
} from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { revalidateCollegeData } from '@/lib/cache-revalidation'
import LoadingSpinner from '@/components/common/loading-spinner'

const collegeDataSchema = z.object({
  name: z.string().optional(),
  acronym: z.string().optional(),
  description: z.string().optional(),
  logo: z
    .object({
      id: z.string(),
      name: z.string(),
      dataUrl: z.string(),
      mimeType: z.string(),
      size: z.number(),
    })
    .optional(),
  bannerTitle: z.string().optional(),
  bannerSubtitle: z.string().optional(),
  bannerButtonLabel: z.string().optional(),
  bannerImage: z
    .object({
      id: z.string(),
      name: z.string(),
      dataUrl: z.string(),
      mimeType: z.string(),
      size: z.number(),
    })
    .optional(),
  secondBannerTitle: z.string().optional(),
  secondBannerSubtitle: z.string().optional(),
  secondBannerButtonLabel: z.string().optional(),
  secondBannerImages: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        dataUrl: z.string(),
        mimeType: z.string(),
        size: z.number(),
      }),
    )
    .optional(),
  quickLinks: z
    .array(
      z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        icon: z.string().optional(),
        url: z.string(),
        color: z.string().optional(),
      }),
    )
    .optional(),
  bannerNumbersTitle: z.string().optional(),
  bannerNumbersSubtitle: z.string().optional(),
  bannerNumbersItems: z
    .array(
      z.object({
        title: z.string(),
        value: z.number(),
        suffix: z.string().optional(),
      }),
    )
    .optional(),
  locationItems: z.array(z.string()).optional(),
  contactItems: z.array(z.string()).optional(),
  usefulLinksItems: z
    .array(
      z.object({
        title: z.string(),
        url: z.string().optional(),
      }),
    )
    .optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
})

type CollegeDataFormValues = z.infer<typeof collegeDataSchema>

interface CollegeDataProps {
  className?: string
}

export default function CollegeData({ className }: CollegeDataProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const toast = useToast()

  const { data: collegeData, isLoading: isLoadingCollegeData } =
    useFindFirstCollegeData({
      include: {
        logo: true,
        bannerImage: true,
        secondBannerImages: true,
      },
    })

  const { mutateAsync: updateCollegeData } = useUpdateCollegeData()
  const { mutateAsync: createCollegeData } = useCreateCollegeData()
  const { mutateAsync: upsertAttachment } = useUpsertAttachment()

  const methods = useForm<CollegeDataFormValues>({
    resolver: zodResolver(collegeDataSchema),
    values: {
      name: collegeData?.name || '',
      acronym: collegeData?.acronym || '',
      description: collegeData?.description || '',
      logo: collegeData?.logo || undefined,
      bannerTitle: collegeData?.bannerTitle || '',
      bannerSubtitle: collegeData?.bannerSubtitle || '',
      bannerButtonLabel: collegeData?.bannerButtonLabel || '',
      bannerImage: collegeData?.bannerImage || undefined,
      secondBannerTitle: collegeData?.secondBannerTitle || '',
      secondBannerSubtitle: collegeData?.secondBannerSubtitle || '',
      secondBannerButtonLabel: collegeData?.secondBannerButtonLabel || '',
      secondBannerImages: collegeData?.secondBannerImages || [],
      quickLinks:
        (collegeData?.quickLinks as Array<{
          title: string
          subtitle?: string
          icon?: string
          url: string
          color?: string
        }>) || [],
      bannerNumbersTitle: collegeData?.bannerNumbersTitle || '',
      bannerNumbersSubtitle: collegeData?.bannerNumbersSubtitle || '',
      bannerNumbersItems:
        (collegeData?.bannerNumbersItems as Array<{
          title: string
          value: number
          suffix?: string
        }>) || [],
      locationItems: collegeData?.locationItems || [],
      contactItems: collegeData?.contactItems || [],
      usefulLinksItems:
        (collegeData?.usefulLinksItems as Array<{
          title: string
          url?: string
        }>) || [],
      instagram: collegeData?.instagram || '',
      youtube: collegeData?.youtube || '',
    },
  })

  const handleSubmit = useCallback(
    async (values: CollegeDataFormValues) => {
      setIsSubmitting(true)
      try {
        const filesToCreate = []

        if (values.logo) {
          filesToCreate.push(values.logo)
        }

        if (values.bannerImage) {
          filesToCreate.push(values.bannerImage)
        }

        if (values.secondBannerImages?.length) {
          filesToCreate.push(...values.secondBannerImages)
        }

        await Promise.all(
          filesToCreate.map(file =>
            upsertAttachment({
              where: { id: file.id },
              update: {},
              create: file,
            }),
          ),
        )

        const dataToSave = {
          name: values.name,
          acronym: values.acronym,
          description: values.description,
          bannerTitle: values.bannerTitle,
          bannerSubtitle: values.bannerSubtitle,
          bannerButtonLabel: values.bannerButtonLabel,
          secondBannerTitle: values.secondBannerTitle,
          secondBannerSubtitle: values.secondBannerSubtitle,
          secondBannerButtonLabel: values.secondBannerButtonLabel,
          quickLinks: values.quickLinks || [],
          bannerNumbersTitle: values.bannerNumbersTitle,
          bannerNumbersSubtitle: values.bannerNumbersSubtitle,
          bannerNumbersItems: values.bannerNumbersItems || [],
          locationItems: values.locationItems || [],
          contactItems: values.contactItems || [],
          usefulLinksItems: values.usefulLinksItems || [],
          instagram: values.instagram,
          youtube: values.youtube,
          ...(values.logo && { logo: { connect: { id: values.logo.id } } }),
          ...(values.bannerImage && {
            bannerImage: { connect: { id: values.bannerImage.id } },
          }),
          ...(values.secondBannerImages?.length && {
            secondBannerImages: {
              connect: values.secondBannerImages.map(img => ({ id: img.id })),
            },
          }),
        }

        if (collegeData) {
          await updateCollegeData({
            where: { id: collegeData.id },
            data: dataToSave,
          })
        } else {
          await createCollegeData({
            data: dataToSave,
          })
        }

        await revalidateCollegeData()
        toast.success('Dados da faculdade salvos com sucesso!')
      } catch (error) {
        console.error('Error saving college data:', error)
        toast.error('Erro ao salvar dados da faculdade')
      } finally {
        setIsSubmitting(false)
      }
    },
    [
      collegeData,
      createCollegeData,
      toast,
      updateCollegeData,
      upsertAttachment,
    ],
  )

  const tabs = [
    {
      id: 'basic',
      label: 'Dados Básicos',
      content: () => (
        <FormGrid>
          <FormText
            name="name"
            label="Nome da Faculdade"
            placeholder="Ex: Faculdade de Ciências e Tecnologia"
            span={2}
          />
          <FormText
            span={2}
            name="acronym"
            label="Sigla"
            placeholder="Ex: FCT"
          />
          <FormFile name="logo" label="Logo" accept="image/*" span={2} />
          <FormTextarea
            name="description"
            label="Descrição"
            placeholder="Descrição da faculdade que aparecerá na página inicial..."
            rows={3}
            span={4}
          />
        </FormGrid>
      ),
    },
    {
      id: 'banner',
      label: 'Banner Principal',
      content: () => (
        <FormGrid>
          <FormText
            name="bannerTitle"
            label="Título do Banner"
            placeholder="Ex: Educação que transforma o futuro"
            span={2}
          />
          <FormText
            name="bannerSubtitle"
            label="Subtítulo"
            placeholder="Ex: Inovação e excelência acadêmica"
            span={2}
          />
          <FormText
            name="bannerButtonLabel"
            label="Texto do Botão"
            placeholder="Ex: Conheça nossos cursos"
            span={2}
          />
          <FormFile
            name="bannerImage"
            label="Imagem do Banner"
            accept="image/*"
            span={2}
          />
        </FormGrid>
      ),
    },
    {
      id: 'secondBanner',
      label: 'Banner Secundário',
      content: () => (
        <FormGrid>
          <FormText
            name="secondBannerTitle"
            label="Título"
            placeholder="Ex: Nossa História"
            span={2}
          />
          <FormText
            name="secondBannerSubtitle"
            label="Subtítulo"
            placeholder="Ex: Décadas de tradição em ensino superior"
            span={2}
          />
          <FormText
            name="secondBannerButtonLabel"
            label="Texto do Botão"
            placeholder="Ex: Saiba mais"
            span={2}
          />
          <FormFile
            name="secondBannerImages"
            label="Imagens do carousel"
            accept="image/*"
            multiple
            span={2}
          />
        </FormGrid>
      ),
    },
    {
      id: 'quickLinks',
      label: 'Links Rápidos',
      content: () => <QuickLinksForm />,
    },
    {
      id: 'stats',
      label: 'Estatísticas',
      content: () => (
        <div className="space-y-6">
          <FormGrid>
            <FormText
              name="bannerNumbersTitle"
              label="Título da Seção"
              placeholder="Ex: FCT em Números"
              span={2}
            />
            <FormText
              name="bannerNumbersSubtitle"
              label="Subtítulo"
              placeholder="Ex: Dados que demonstram nossa excelência"
              span={2}
            />
          </FormGrid>
          <BannerNumbersForm />
        </div>
      ),
    },
    {
      id: 'contact',
      label: 'Contato e Localização',
      content: () => (
        <div className="space-y-6">
          <FormGrid>
            <FormMultipleTags
              name="locationItems"
              label="Itens de Localização"
              placeholder="Digite um item de localização e pressione Enter..."
            />
            <FormMultipleTags
              name="contactItems"
              label="Itens de Contato"
              placeholder="Digite um item de contato e pressione Enter..."
            />
            <FormText
              name="instagram"
              label="Instagram"
              placeholder="Ex: @fct_ufmt"
              span={2}
            />
            <FormText
              name="youtube"
              label="YouTube"
              placeholder="Ex: FCT UFMT"
              span={2}
            />
          </FormGrid>
          <UsefulLinksForm />
        </div>
      ),
    },
  ]

  return (
    <BaseCard
      title="Dados da Faculdade"
      loading={isLoadingCollegeData}
      rightButtons={
        <Alert variant="default">
          <FileWarning color="orange" />
          <AlertTitle>Atenção</AlertTitle>
          <AlertDescription>
            Lembre-se de salvar as alterações em cada aba.
          </AlertDescription>
        </Alert>
      }
      className={className}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="border-b">
              <div className="flex overflow-x-auto py-2 px-0">
                <TabsList className="w-full flex flex-wrap flex-col sm:flex-row h-auto p-0 bg-transparent gap-2">
                  {tabs.map(tab => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="w-full flex items-center gap-2 px-4 py-2 rounded-md data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:shadow-sm"
                    >
                      <span>{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
            <div className="mt-6">
              {tabs.map(tab => (
                <TabsContent
                  key={tab.id}
                  value={tab.id}
                  className="space-y-6 mt-0"
                >
                  <tab.content />
                </TabsContent>
              ))}
            </div>
          </Tabs>

          <div className="flex justify-end mt-8">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <LoadingSpinner className="mr-2 h-4 w-4" />}
              Salvar Alterações
            </Button>
          </div>
        </form>
      </FormProvider>
    </BaseCard>
  )
}
