'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Photo from './components/photo'
import CompletitionStatus from './components/completition-status'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  activeTabAtom,
  formMethodsAtom,
  nextTabAtom,
  prevTabAtom,
  professorAtom,
  TabId,
  tabsAtom,
} from './configure.store'
import { useGreeting } from '@/lib/hooks/greeting'
import { useCallback, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedTextParts from '@/components/common/animated-text-parts'
import { ProfessorWithRelations } from '@/app/admin/(without-sidebar)/professors-configure/page'
import { useOnMount } from '@/lib/hooks/on-mount'
import { useDeleteAttachment, useUpdateProfessor } from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { formatFormToBack } from './utils/utils'

export default function Configure({
  professor,
}: {
  professor: ProfessorWithRelations
}) {
  const tabs = useAtomValue(tabsAtom)
  const [activeTab, setActiveTab] = useAtom(activeTabAtom)
  const greeting = useGreeting()
  const nextTab = useAtomValue(nextTabAtom)
  const prevTab = useAtomValue(prevTabAtom)
  const setProfessor = useSetAtom(professorAtom)
  const setFormMethods = useSetAtom(formMethodsAtom)
  const updateProfessorMutation = useUpdateProfessor()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const { mutateAsync: deleteAttachment } = useDeleteAttachment()

  const onTabChange = useCallback(
    (tab: string) => {
      setActiveTab(tab as TabId)
    },
    [setActiveTab],
  )

  const form = useForm<ProfessorWithRelations>({
    values: professor ?? ({} as ProfessorWithRelations),
  })

  setFormMethods(form)

  useOnMount(() => setProfessor(professor))

  const greetingParts = useMemo(() => {
    if (!professor?.user?.name) return []
    const greetingParts = (greeting + ',').split(' ')
    const professorNameParts = professor?.user?.name?.split(' ') ?? []
    return [...greetingParts, ...professorNameParts]
  }, [greeting, professor?.user?.name])

  const updateProfessor = useCallback(() => {
    if (!professor) return
    setProfessor(form.getValues() as typeof professor)
  }, [form, professor, setProfessor])

  const goNextTab = useCallback(() => {
    if (!nextTab) return
    setActiveTab(nextTab.id)
    updateProfessor()
  }, [nextTab, setActiveTab, updateProfessor])

  const goPrevTab = useCallback(() => {
    if (!prevTab) return
    setActiveTab(prevTab.id)

    updateProfessor()
  }, [prevTab, setActiveTab, updateProfessor])

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    try {
      const values = form.getValues()

      const formattedValues = formatFormToBack(values)

      await updateProfessorMutation.mutateAsync({
        where: { id: values.id },
        data: {
          ...formattedValues,
          ...(values.image
            ? {
                image: {
                  upsert: {
                    where: { id: values.image.id },
                    update: {},
                    create: {
                      ...values.image,
                      contentBlocks: undefined,
                    },
                  },
                },
              }
            : { image: undefined }),
        },
      })
      toast.success('Informações atualizadas com sucesso')
    } catch (error) {
      console.error('Error updating professor:', error)
      toast.exception(error)
    } finally {
      setIsSubmitting(false)
    }
  }, [form, toast, updateProfessorMutation])

  return (
    <div className="container mx-auto px-4 scroll-smooth">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          <AnimatedTextParts duration={2.5} textParts={greetingParts} />
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Complete suas informações para melhorar sua visibilidade.
        </p>
      </div>

      <div className="grid gap-8">
        <Photo onClickSave={handleSubmit} isSubmitting={isSubmitting} />

        <CompletitionStatus />

        <Tabs
          defaultValue="basic"
          className="w-full"
          onValueChange={onTabChange}
          value={activeTab}
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
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
          <div className="mt-6">
            <FormProvider {...form}>
              <AnimatePresence mode="sync">
                {tabs.map(tab => (
                  <TabsContent
                    key={tab.id}
                    value={tab.id}
                    className="space-y-6 mt-0"
                  >
                    <motion.div
                      key={tab.id}
                      initial={{
                        opacity: 0,
                        y: 100,
                      }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 1, y: 200 }}
                      transition={{
                        ease: 'easeInOut',
                        duration: 0.7,
                      }}
                    >
                      <tab.component />
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </FormProvider>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2">
            {prevTab && (
              <Button
                onClick={goPrevTab}
                variant="outline"
                className="col-start-1 justify-self-start w-fit"
              >
                Etapa anterior
              </Button>
            )}
            {nextTab && (
              <Button
                className="col-start-2 justify-self-end w-fit"
                onClick={goNextTab}
              >
                Próxima etapa
              </Button>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  )
}
