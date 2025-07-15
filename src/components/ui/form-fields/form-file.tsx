import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { FileField } from './file-field'
import { twMerge } from 'tailwind-merge'
import { AttachmentType } from '@/types/attachment.type'

export interface FormFileProps {
  name: string
  label?: string
  className?: string
  customLabel?: React.ReactNode
  description?: string
  helperText?: string | React.ReactNode
  required?: boolean
  accept?: string
  multiple?: boolean
  showFileNames?: boolean
  clearable?: boolean
  onChange?: (attachments: AttachmentType | AttachmentType[] | null) => void
  span?: number
}

export function FormFile({
  name,
  label,
  className,
  description,
  customLabel,
  helperText,
  required = false,
  accept,
  multiple = false,
  showFileNames = true,
  clearable = true,
  onChange,
  span,
}: FormFileProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange: fieldOnChange, ...field } }) => (
        <FormItem
          className={twMerge(
            'space-y-2',
            className,
            span ? `col-span-${span}` : '',
          )}
        >
          <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {customLabel}
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <FileField
              accept={accept}
              multiple={multiple}
              showFileNames={showFileNames}
              clearable={clearable}
              helperText={helperText}
              value={value}
              onChange={attachments => {
                fieldOnChange(attachments)
                onChange?.(attachments)
              }}
              {...field}
            />
          </FormControl>

          {description && (
            <FormDescription className="text-xs text-muted-foreground">
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
