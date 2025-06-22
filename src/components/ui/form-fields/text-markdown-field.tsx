'use client'

import { TextareaHTMLAttributes, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye, Edit } from 'lucide-react'
import { useMarkdown } from '@/lib/hooks/markdown'

interface TextMarkdownFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string
  preview?: boolean
}

export function TextMarkdownField({
  placeholder,
  preview = true,
  value = '',
  onChange,
  ...props
}: TextMarkdownFieldProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  const { markdownContent, loading, error } = useMarkdown(value as string)

  if (!preview) {
    return (
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
        className="font-mono"
      />
    )
  }

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
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
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
            {!loading && !error && !(value as string)?.trim() && (
              <div className="text-muted-foreground">
                Nenhum conteúdo para visualizar
              </div>
            )}
            {!loading && !error && (value as string)?.trim() && markdownContent}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
