'use client'

import { useController, FieldPath, FieldValues } from 'react-hook-form'
import {
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form'
import { BlockTextImageField } from './block-text-image-field'

interface FormBlockTextImageProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  name: TName
  label?: string
  required?: boolean
  className?: string
}

export function FormBlockTextImage<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  label,
  required,
  className,
}: FormBlockTextImageProps<TFieldValues, TName>) {
  const { field } = useController({
    name,
    defaultValue: [
      { id: '1', type: 'text', content: '' },
    ] as TFieldValues[TName],
  })

  return (
    <FormItem className={className}>
      {label && (
        <FormLabel>
          {label} {required && <span className="text-destructive">*</span>}
        </FormLabel>
      )}
      <FormControl>
        <BlockTextImageField
          blocks={field.value || []}
          onChange={field.onChange}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
