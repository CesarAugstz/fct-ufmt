import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { TextAreaField } from './text-area-field'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

export interface FormTextareaProps {
  name: string
  label: string
  className?: string
  placeholder?: string
  description?: string
  required?: boolean
  rows?: number
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  span?: number
}

export function FormTextarea({
  name,
  label,
  placeholder,
  description,
  className,
  required = false,
  rows,
  resize,
  span,
}: FormTextareaProps) {
  const { control } = useFormContext()

  const textAreaClassName = useMemo(() => {
    switch (resize) {
      case 'none':
        return 'resize-none'
      case 'vertical':
        return 'resize-y'
      case 'horizontal':
        return 'resize-x'
      case 'both':
        return 'resize'
      default:
        return ''
    }
  }, [resize])

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={twMerge(className, span ? `col-span-${span}` : '')}
        >
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <TextAreaField
              placeholder={placeholder}
              rows={rows}
              {...field}
              className={textAreaClassName}
              value={field.value || ''}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
