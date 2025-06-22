'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye, Edit } from 'lucide-react'
import { useMarkdown } from '@/lib/hooks/markdown'
import type { TextBlock, Block } from './types'

interface TextBlockComponentProps {
  block: TextBlock
  onUpdate: (id: string, updates: Partial<Block>) => void
}

export function TextBlockComponent({
  block,
  onUpdate,
}: TextBlockComponentProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const { markdownContent, loading, error } = useMarkdown(block.content)

  return (
    <div className="space-y-2">
      <Tabs
        value={activeTab}
        onValueChange={value => setActiveTab(value as 'edit' | 'preview')}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Editor
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Visualizar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="mt-2">
          <Textarea
            placeholder="Escreva seu conteúdo em Markdown..."
            value={block.content}
            onChange={e => onUpdate(block.id, { content: e.target.value })}
            className="font-mono min-h-[200px]"
          />
        </TabsContent>

        <TabsContent value="preview" className="mt-2">
          <div className="min-h-[200px] p-3 border rounded-md bg-background prose prose-slate prose-sm dark:prose-invert max-w-none">
            {loading && (
              <div className="text-muted-foreground">Carregando...</div>
            )}
            {!!error && (
              <div className="text-destructive">
                Erro ao renderizar o markdown
              </div>
            )}
            {!loading && !error && !block.content?.trim() && (
              <div className="text-muted-foreground">
                Nenhum conteúdo para visualizar
              </div>
            )}
            {!loading && !error && block.content?.trim() && markdownContent}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
