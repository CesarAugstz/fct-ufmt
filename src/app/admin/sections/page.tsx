'use client'

import { useState, useEffect } from 'react'
import { BaseCard } from '@/components/ui/base-card'
import { SectionDialog } from '@/components/admin/sections/section-dialog'
import { Section } from '@/types/admin/section.types'
import { useToast } from '@/lib/hooks/toast'
import { SectionAccordion } from '@/components/admin/sections/section-accordion'
import {
  useDeleteSection,
  useFindManySection,
  useFindUniqueSection,
} from '@/lib/zenstack-hooks'

export default function SectionsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState<Section | null>(null)
  const [parentForNewSection, setParentForNewSection] = useState<string | null>(
    null,
  )
  const toast = useToast()

  // queries
  const {
    data: sections,
    isLoading,
    refetch: refetchSections,
  } = useFindManySection()

  const organizeIntoHierarchy = (flatSections: Section[]): Section[] => {
    const sectionMap = new Map<string, Section>()
    const rootSections: Section[] = []

    flatSections.forEach(section => {
      sectionMap.set(section.id, { ...section, children: [] })
    })

    flatSections.forEach(section => {
      const sectionWithChildren = sectionMap.get(section.id)!

      if (section.parentId && sectionMap.has(section.parentId)) {
        const parent = sectionMap.get(section.parentId)!
        parent.children = [...(parent.children || []), sectionWithChildren]
      } else {
        rootSections.push(sectionWithChildren)
      }
    })

    return rootSections.sort((a, b) => a.order - b.order)
  }

  const handleDeleteSection = async (id: string) => {
    if (
      !confirm(
        'Are you sure you want to delete this section? This will also delete all child sections.',
      )
    ) {
      return
    }

    try {
      const { mutateAsync: deleteSection } = useDeleteSection()

      await deleteSection({ where: { id } })

      toast.success('Section deleted successfully')
    } catch (error) {
      toast.error('Failed to delete section')
    }
  }

  const handleAddSubsection = (parentId: string) => {
    setParentForNewSection(parentId)
    setIsAddDialogOpen(true)
  }

  const handleEditClick = (section: Section) => {
    setCurrentSection(section)
    setIsEditDialogOpen(true)
  }

  return (
    <>
      <BaseCard
        title="Sections Management"
        onAdd={() => {
          setParentForNewSection(null)
          setIsAddDialogOpen(true)
        }}
        addButtonText="Add Top-Level Section"
        onUpdate={refetchSections}
        updateButtonText="Refresh"
        showEmptyState={!sections?.length && !isLoading}
        emptyStateMessage="No sections have been created yet. Click 'Add Top-Level Section' to create your first section."
      >
        {isLoading ? (
          <div className="flex justify-center py-8">
            <p>Loading sections...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sections?.map(section => (
              <SectionAccordion
                key={section.id}
                section={section}
                onAddSubsection={handleAddSubsection}
                onEdit={handleEditClick}
                onDelete={handleDeleteSection}
              />
            ))}
          </div>
        )}
      </BaseCard>

      <SectionDialog
        type="add"
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        parentId={parentForNewSection}
      />

      <SectionDialog
        type="edit"
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        sectionId={currentSection?.id}
      />
    </>
  )
}
