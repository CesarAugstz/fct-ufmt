'use client'
import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Markdown from '@/components/common/blocks/markdown'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  MarkdownBlockContent,
  markdownBlockSchema,
} from '@/types/admin/block-components.types'
import { useCachedNode } from '@dnd-kit/core/dist/hooks/utilities'
import { useBlocksContext } from '../../context/BlocksContext'
import { useAtomValue, useSetAtom } from 'jotai'
import { blockEditContentAtom, formGetValuesAtom } from '../state/blocks.state'
import { useOnMount } from '@/lib/hooks/on-mount'

export function MarkdownBlockEditor() {
  const [activeTab, setActiveTab] = useState<string>('edit')
  const content = useAtomValue(blockEditContentAtom)
  const setFormGetValues = useSetAtom(formGetValuesAtom)
  console.log('MarkdownBlockEditor', content)

  const form = useForm<MarkdownBlockContent>({
    resolver: zodResolver(markdownBlockSchema),
    defaultValues: {
      content: content.content || '',
    },
  })

  useOnMount(() => {
    setFormGetValues(() => form.getValues)
  })

  const contentValue = form.watch('content')

  return (
    <div className="space-y-4">
      <FormProvider {...form}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="pt-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter markdown content..."
                      className="min-h-[200px] font-mono"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="preview" className="pt-4">
            <div className="border rounded-md p-4 min-h-[200px]">
              <Markdown content={contentValue} />
            </div>
          </TabsContent>
        </Tabs>
      </FormProvider>
    </div>
  )
}
