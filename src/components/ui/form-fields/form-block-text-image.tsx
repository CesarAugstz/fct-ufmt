'use client'

import { useController, FieldPath, FieldValues } from 'react-hook-form'
import {
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import { BlockTextImageField } from './block-text-image-field'
import { twMerge } from 'tailwind-merge'

interface FormBlockTextImageProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  name: TName
  label?: string
  required?: boolean
  className?: string
  span?: number
}

export function FormBlockTextImage<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  label,
  required,
  className,
  span,
}: FormBlockTextImageProps<TFieldValues, TName>) {
  const { field } = useController({
    name,
    defaultValue: [
      { id: '1', type: 'text', content: '' },
    ] as TFieldValues[TName],
  })

  return (
    <FormItem className={twMerge(className, span ? `col-span-${span}` : '')}>
      {label && (
        <div className="flex items-center gap-2">
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="p-1 rounded-md hover:bg-muted transition-colors"
              >
                <Info className="h-4 w-4 text-muted-foreground" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-sm">
                Este campo permite combinar blocos de <strong>texto</strong> e{' '}
                <strong>imagens</strong>. Use os botões para adicionar, mover e
                organizar o conteúdo. Blocos de texto suportam formatação
                Markdown.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
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
