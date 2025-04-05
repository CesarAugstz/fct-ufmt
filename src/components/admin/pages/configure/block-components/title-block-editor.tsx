'use client'
import { useEffect, useRef } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormText } from '@/components/ui/form-fields/form-text'
import { FormSelect } from '@/components/ui/form-fields/form-select'
import Title from '@/components/common/blocks/title'
import {
  BlockComponentType,
  TitleBlockContent,
  titleBlockSchema,
} from '@/types/admin/block-components.types'
import { useBlocksContext } from '../../context/BlocksContext'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  blockEditContentAtom,
  blockEditingAtom,
  formGetValuesAtom,
} from '../state/blocks.state'
import { useOnMount } from '@/lib/hooks/on-mount'
import React from 'react'

export const TitleBlockEditor = React.memo(function TitleBlockEditor() {
  const setFormGetValues = useSetAtom(formGetValuesAtom)
  const content = useAtomValue(blockEditContentAtom)

  console.log('TitleBlockEditor', content)

  const form = useForm<TitleBlockContent>({
    resolver: zodResolver(titleBlockSchema),
    defaultValues: {
      title: content.title || '',
      subtitle: content.subtitle || '',
      backgroundImage: content.backgroundImage || '',
      height: content.height || 'sm',
    },
  })

  const formValues = form.watch()

  useOnMount(() => {
    setFormGetValues(() => form.getValues)
  })

  const heightOptions = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'Extra Large' },
  ]

  const TitlePreview = React.memo(function TitlePreview() {
    const { title, subtitle, backgroundImage, height } = formValues

    return (
      <Title
        title={title}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
        height={height as 'sm' | 'md' | 'lg' | 'xl'}
      />
    )
  })

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

          <FormSelect name="height" label="Height" options={heightOptions} />
        </div>
      </FormProvider>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-2">Preview:</h3>
        <TitlePreview />
      </div>
    </div>
  )
})
