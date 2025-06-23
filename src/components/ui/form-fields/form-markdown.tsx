import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import { TextMarkdownField } from './text-markdown-field'
import { twMerge } from 'tailwind-merge'

export interface FormMarkdownProps {
  name: string
  label: string
  className?: string
  placeholder?: string
  description?: string
  required?: boolean
  rows?: number
  preview?: boolean
  span?: number
}

export function FormMarkdown({
  name,
  label,
  placeholder,
  description,
  className,
  required = false,
  rows,
  preview = true,
  span,
}: FormMarkdownProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={twMerge(className, span ? `col-span-${span}` : '')}
        >
          <div className="flex items-center gap-2">
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
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
                  Este campo suporta <strong>Markdown</strong>. Use a aba
                  "Visualizar" para ver como o conteúdo será exibido. Você pode
                  usar formatação como **negrito**, *itálico*, listas, links e
                  muito mais.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <FormControl>
            <TextMarkdownField
              placeholder={placeholder}
              rows={rows}
              preview={preview}
              {...field}
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
