'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Accordion,
  AccordionContent,
  AccordionItem as UIAccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Plus, Trash2 } from 'lucide-react'
import { MarkdownRenderer } from '@/components/common/markdown-renderer'
import type { AccordionBlock } from './types'

interface AccordionBlockComponentProps {
  block: AccordionBlock
  onUpdate: (id: string, updates: Partial<AccordionBlock>) => void
}

export function AccordionBlockComponent({
  block,
  onUpdate,
}: AccordionBlockComponentProps) {
  const [newItemTitle, setNewItemTitle] = useState('')
  const [newItemContent, setNewItemContent] = useState('')

  const addAccordionItem = () => {
    if (!newItemTitle.trim() || !newItemContent.trim()) return

    const newItem = {
      title: newItemTitle.trim(),
      content: newItemContent.trim(),
    }

    onUpdate(block.id, {
      accordionItems: [...block.accordionItems, newItem],
    })

    setNewItemTitle('')
    setNewItemContent('')
  }

  const updateAccordionItem = (
    index: number,
    field: 'title' | 'content',
    value: string,
  ) => {
    const updatedItems = block.accordionItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    )
    onUpdate(block.id, { accordionItems: updatedItems })
  }

  const removeAccordionItem = (index: number) => {
    const updatedItems = block.accordionItems.filter((_, i) => i !== index)
    onUpdate(block.id, { accordionItems: updatedItems })
  }

  return (
    <div className="space-y-4">
      {block.accordionItems.length > 0 && (
        <Accordion type="single" collapsible className="w-full">
          {block.accordionItems.map((item, index) => (
            <UIAccordionItem key={index} value={index.toString()}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                      Título
                    </label>
                    <Input
                      value={item.title}
                      onChange={e =>
                        updateAccordionItem(index, 'title', e.target.value)
                      }
                      placeholder="Título do item"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">
                      Conteúdo (Markdown)
                    </label>
                    <Textarea
                      value={item.content}
                      onChange={e =>
                        updateAccordionItem(index, 'content', e.target.value)
                      }
                      placeholder="Conteúdo do item em markdown..."
                      rows={4}
                    />
                  </div>

                  {item.content && (
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">
                        Preview
                      </label>
                      <div className="border border-border rounded-md p-3 bg-muted/30">
                        <MarkdownRenderer content={item.content} size="sm" />
                      </div>
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeAccordionItem(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remover item
                  </Button>
                </div>
              </AccordionContent>
            </UIAccordionItem>
          ))}
        </Accordion>
      )}

      <div className="border border-dashed border-border rounded-md p-4 space-y-3">
        <h4 className="text-sm font-medium">Adicionar novo item</h4>
        <div className="space-y-2">
          <Input
            value={newItemTitle}
            onChange={e => setNewItemTitle(e.target.value)}
            placeholder="Título do item"
          />
          <Textarea
            value={newItemContent}
            onChange={e => setNewItemContent(e.target.value)}
            placeholder="Conteúdo do item em markdown..."
            rows={4}
          />
          <Button
            type="button"
            onClick={addAccordionItem}
            disabled={!newItemTitle.trim() || !newItemContent.trim()}
            size="sm"
          >
            <Plus className="h-3 w-3 mr-1" />
            Adicionar item
          </Button>
        </div>
      </div>
    </div>
  )
}
