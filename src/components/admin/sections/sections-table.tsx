'use client'

import { JSX, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ChevronRight, ChevronDown, Edit, Trash2 } from 'lucide-react'
import { Section } from '@/types/admin/section.types'
import { atom, useRecoilState } from 'recoil'

interface SectionsTableProps {
  sections: Section[]
  onEdit: (section: Section) => void
  onDelete: (id: string) => void
}

export function SectionsTable({
  sections,
  onEdit,
  onDelete,
}: SectionsTableProps) {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({})

  const toggleExpandSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Recursive function to render section rows
  const renderSectionRows = (sections: Section[], level = 0): JSX.Element[] => {
    return sections.map((section: Section) => (
      <>
        <TableRow key={section.id}>
          <TableCell className="font-medium">
            <div className="flex items-center">
              <div style={{ width: `${level * 20}px` }} />
              {(section?.children?.length ?? 0) > 0 && (
                <button
                  onClick={() => toggleExpandSection(section.id)}
                  className="mr-2"
                >
                  {expandedSections[section.id] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
              {section.name}
            </div>
          </TableCell>
          <TableCell>{section.slug}</TableCell>
          <TableCell>{section.isVisible ? 'Yes' : 'No'}</TableCell>
          <TableCell>{section.order}</TableCell>
          <TableCell>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(section)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(section.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
        {expandedSections[section.id] &&
          (section?.children?.length ?? 0) > 0 &&
          renderSectionRows(section.children!, level + 1)}
      </>
    ))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Visible</TableHead>
          <TableHead>Order</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderSectionRows(sections)}</TableBody>
    </Table>
  )
}
