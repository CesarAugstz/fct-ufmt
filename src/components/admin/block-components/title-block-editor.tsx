'use client'
import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormText } from '@/components/ui/form-fields/form-text'
import { FormSelect } from '@/components/ui/form-fields/form-select'
import Title from '@/components/common/blocks/title'
import { TitleBlockContent, titleBlockSchema } from '@/types/admin/block-components.types'

interface TitleBlockEditorProps {
  content: TitleBlockContent
  onChange: (content: TitleBlockContent) => void
}

export function TitleBlockEditor({ content, onChange }: TitleBlockEditorProps) {
  const form = useForm<TitleBlockContent>({
    resolver: zodResolver(titleBlockSchema),
    defaultValues: {
      title: content.title || '',
      subtitle: content.subtitle || '',
      backgroundImage: content.backgroundImage || '',
      height: content.height || 'sm'
    }
  })

  const heightOptions = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'Extra Large' },
  ]
  
  useEffect(() => {
    const subscription = form.watch((value) => {
      onChange(value as TitleBlockContent)
    })
    return () => subscription.unsubscribe()
  }, [form, onChange])

  const formValues = form.watch()

  return (
    <div className="space-y-4">
      <FormProvider {...form}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormText
            name="title"
            label="Title"
            placeholder="Enter title"
            required
          />
          
          <FormText
            name="subtitle"
            label="Subtitle"
            placeholder="Enter subtitle (optional)"
          />
          
          <FormText
            name="backgroundImage"
            label="Background Image URL"
            placeholder="Enter image URL (optional)"
          />
          
          <FormSelect
            name="height"
            label="Height"
            options={heightOptions}
          />
        </div>
      </FormProvider>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-2">Preview:</h3>
        <Title 
          title={formValues.title}
          subtitle={formValues.subtitle}
          backgroundImage={formValues.backgroundImage}
          height={formValues.height as 'sm' | 'md' | 'lg' | 'xl'}
        />
      </div>
    </div>
  )
}
