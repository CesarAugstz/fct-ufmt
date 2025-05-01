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

export interface FormTextProps {
  name: string
  label?: string
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
}

export function FormText({
  name,
  label,
  placeholder,
  description,
  customLabel,
  onChange,
  formatter,
  onBlur,
  type = 'text',
  required = false,
  showPasswordToggle = false,
}: FormTextProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {customLabel}
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <TextField
              showPasswordToggle={showPasswordToggle}
              placeholder={placeholder}
              {...field}
              onBlur={onBlur}
              type={type}
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
