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

interface FormTextProps {
  name: string
  label: string
  placeholder?: string
  description?: string
  required?: boolean
  type?: 'text' | 'password'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  formatter?: (value: string) => string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export function FormText({
  name,
  label,
  placeholder,
  description,
  onChange,
  formatter,
  onBlur,
  type = 'text',
  required = false,
}: FormTextProps) {
  const { control } = useFormContext()

  // TODO: implement type password field

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <TextField
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
