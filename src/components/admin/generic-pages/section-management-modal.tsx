'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import LoadingSpinner from '@/components/common/loading-spinner'
import SectionForm from './forms/section-form'
import { Plus, Edit, Trash2, FolderTree, Folder, File } from 'lucide-react'
import { useFindManySection, useDeleteSection } from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { Section } from '@zenstackhq/runtime/models'
import { revalidateSections } from '@/lib/cache-revalidation'

type SectionWithRelations = Section & {
  subSections?: SectionWithRelations[]
  pages?: Array<{ id: string; title: string; slug: string }>
  parentSection?: { id: string; title: string } | null
}

interface SectionManagementModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SectionManagementModal({
  isOpen,
  onClose,
}: SectionManagementModalProps) {
  const [isSectionFormOpen, setIsSectionFormOpen] = useState(false)
  const [editingSection, setEditingSection] = useState<Section | null>(null)
  const [deletingSection, setDeletingSection] = useState<Section | null>(null)
  const toast = useToast()

  const { mutate: deleteSection } = useDeleteSection()

  const { data: sections, isLoading } = useFindManySection({
    orderBy: { title: 'asc' },
    include: {
      subSections: {
        orderBy: { title: 'asc' },
        include: {
          subSections: {
            orderBy: { title: 'asc' },
            include: {
              pages: {
                select: { id: true, title: true, slug: true },
              },
            },
          },
          pages: {
            select: { id: true, title: true, slug: true },
          },
        },
      },
      pages: {
        select: { id: true, title: true, slug: true },
      },
      parentSection: {
        select: { id: true, title: true },
      },
    },
  })

  const rootSections =
    sections?.filter(section => !section.parentSectionId) || []

  const handleAddSection = () => {
    setEditingSection(null)
    setIsSectionFormOpen(true)
  }

  const handleEditSection = (section: Section) => {
    setEditingSection(section)
    setIsSectionFormOpen(true)
  }

  const handleDeleteSection = (section: Section) => {
    setDeletingSection(section)
  }

  const handleConfirmDeleteSection = () => {
    if (!deletingSection) return

    deleteSection(
      { where: { id: deletingSection.id } },
      {
        onSuccess: async () => {
          toast.success('Seção excluída com sucesso!')
          setDeletingSection(null)
          await revalidateSections()
        },
        onError: error => {
          console.error('Section delete error:', error)
          toast.error('Erro ao excluir seção')
        },
      },
    )
  }

  const handleFormSuccess = () => {
    setIsSectionFormOpen(false)
    setEditingSection(null)
  }

  const renderSectionLevel = (
    sectionList: SectionWithRelations[],
    level = 0,
  ) => {
    return sectionList.map(section => {
      const indentClass = level > 0 ? `ml-${level * 6}` : ''
      const hasSubSections = (section.subSections?.length ?? 0) > 0
      const hasPages = (section.pages?.length ?? 0) > 0

      return (
        <AccordionItem key={section.id} value={section.id}>
          <AccordionTrigger className="text-left">
            <div
              className={`flex justify-between items-center w-full mr-4 ${indentClass}`}
            >
              <div className="flex items-center gap-2">
                {hasSubSections ? (
                  <FolderTree className="h-4 w-4 text-primary" />
                ) : (
                  <Folder className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="font-medium">{section.title}</span>
                <div className="flex items-center gap-1">
                  {hasSubSections && (
                    <Badge variant="secondary" className="text-xs">
                      {section.subSections?.length ?? 0} subseções
                    </Badge>
                  )}
                  {hasPages && (
                    <Badge variant="outline" className="text-xs">
                      {section.pages?.length ?? 0} páginas
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={e => {
                    e.stopPropagation()
                    handleEditSection(section)
                  }}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={e => {
                    e.stopPropagation()
                    handleDeleteSection(section)
                  }}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className={`pt-2 space-y-2 ${indentClass}`}>
              {/* Show parent section info if exists */}
              {section.parentSection && (
                <p className="text-sm text-muted-foreground">
                  Seção pai:{' '}
                  <span className="font-medium">
                    {section.parentSection.title}
                  </span>
                </p>
              )}

              {/* Show pages in this section */}
              {hasPages && section.pages && (
                <div className="space-y-1">
                  <h6 className="text-sm font-medium text-muted-foreground">
                    Páginas:
                  </h6>
                  {section.pages.map(page => (
                    <div key={page.id} className="flex items-center gap-2 ml-4">
                      <File className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{page.title}</span>
                      <Badge variant="outline" className="text-xs">
                        /{page.slug}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}

              {/* Render subsections recursively */}
              {hasSubSections && section.subSections && (
                <div className="mt-4">
                  <h6 className="text-sm font-medium text-muted-foreground mb-2">
                    Subseções:
                  </h6>
                  <Accordion type="single" collapsible className="w-full">
                    {renderSectionLevel(section.subSections, level + 1)}
                  </Accordion>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      )
    })
  }

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Gerenciar Seções</DialogTitle>
            <DialogDescription>
              Organize suas seções e subseções hierarquicamente.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-8">
            <LoadingSpinner className="h-8 w-8" />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderTree className="h-5 w-5" />
              Gerenciar Seções
            </DialogTitle>
            <DialogDescription>
              Organize suas seções e subseções hierarquicamente. Use as seções
              para agrupar páginas relacionadas.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  {sections?.length || 0} seções totais, {rootSections.length}{' '}
                  seções raiz
                </p>
              </div>
              <Button onClick={handleAddSection}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Seção
              </Button>
            </div>

            {!rootSections.length ? (
              <div className="text-center py-12">
                <FolderTree className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Nenhuma seção encontrada
                </p>
                <p className="text-sm text-muted-foreground">
                  Clique em "Nova Seção" para começar
                </p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full space-y-2">
                {renderSectionLevel(rootSections)}
              </Accordion>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <SectionForm
        isOpen={isSectionFormOpen}
        onClose={() => setIsSectionFormOpen(false)}
        onSuccess={handleFormSuccess}
        section={editingSection}
      />

      <ConfirmDialog
        open={!!deletingSection}
        onOpenChange={() => setDeletingSection(null)}
        onConfirm={handleConfirmDeleteSection}
        title="Excluir Seção"
        description={`Tem certeza que deseja excluir a seção "${deletingSection?.title}"? Esta ação não pode ser desfeita e todas as subseções e páginas também serão excluídas.`}
      />
    </>
  )
}
