'use client'

import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, PlusCircle } from 'lucide-react'
import { Prisma, Section } from '@prisma/client'
import { SectionWithChildren } from '@/app/admin/sections/page'

interface SectionAccordionProps {
  section: SectionWithChildren
  onAddSubsection: (parentId: string) => void
  onEdit: (section: Section) => void
  onDelete: (id: string) => void
  level?: number
}

export function SectionAccordion({
  section,
  onAddSubsection,
  onEdit,
  onDelete,
  level = 0,
}: SectionAccordionProps) {
  const accordionId = `section-${section.id}`

  return (
    <Accordion
      type="multiple"
      value={undefined}
      className={`border rounded-lg ${level > 0 ? 'ml-6' : ''}`}
    >
      <AccordionItem value={accordionId} className="border-none">
        <div className="flex items-center justify-between px-4">
          <AccordionTrigger  className="py-2 flex-1 cursor-pointer">
            <div className="flex items-center gap-2 text-left">
              <span>{section.name}</span>
              {!section.isVisible && (
                <Badge variant="outline" className="text-xs">
                  Hidden
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <div className="flex items-center gap-2 py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={e => {
                e.stopPropagation()
                onAddSubsection(section.id)
              }}
              title="Add Subsection"
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={e => {
                e.stopPropagation()
                onEdit(section)
              }}
              title="Edit Section"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={e => {
                e.stopPropagation()
                onDelete(section.id)
              }}
              title="Delete Section"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <AccordionContent className="pb-2 pt-0">
          <div className="px-4 py-2 space-y-1">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Slug:</span> {section.slug}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Order:</span> {section.order}
            </div>
          </div>

          {section.children && section.children.length > 0 ? (
            <div className="pt-4 space-y-4">
              <div className="px-4 text-sm font-medium">Subsections:</div>
              {section.children.map(childSection => (
                <SectionAccordion
                  key={childSection.id}
                  section={childSection}
                  onAddSubsection={onAddSubsection}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  level={level + 1}
                />
              ))}
            </div>
          ) : (
            <div className="px-4 py-2 text-sm text-muted-foreground">
              No subsections. Click the + button to add one.
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
