import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { TextField } from './text-field'
import { twMerge } from 'tailwind-merge'

export interface FormTextProps {
  name: string
  label?: string
  className?: string
  customLabel?: React.ReactNode
  placeholder?: string
  description?: string
  endAdornment?: React.ReactNode
  required?: boolean
  type?: 'text' | 'password'
  showPasswordToggle?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  formatter?: (value: string) => string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  span?: number
  autoFocus?: boolean
  tabIndex?: number
}

export function FormText({
  name,
  label,
  placeholder,
  className,
  description,
  customLabel,
  onChange,
  formatter,
  onBlur,
  onEnter,
  type = 'text',
  required = false,
  showPasswordToggle = false,
  span,
  autoFocus = false,
  tabIndex,
}: FormTextProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={twMerge(className, span ? `col-span-${span}` : '')}
        >
          <FormLabel>
            {customLabel}
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <TextField
              tabIndex={tabIndex}
              autoFocus={autoFocus}
              showPasswordToggle={showPasswordToggle}
              placeholder={placeholder}
              {...field}
              onBlur={onBlur}
              type={type}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  onEnter?.(e)
                }
              }}
              onChange={e => {
                const value = e.target.value
                const formattedValue = formatter ? formatter(value) : value
                e.target.value = formattedValue
                field.onChange(e)
                onChange?.(e)
              }}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
