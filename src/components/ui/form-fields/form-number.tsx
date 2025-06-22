import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export interface FormNumberProps {
  name: string
  label?: string
  placeholder?: string
  description?: string
  className?: string
  required?: boolean
  min?: number
  max?: number
  step?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export function FormNumber({
  name,
  label,
  placeholder,
  description,
  className,
  required = false,
  min,
  max,
  step,
  onChange,
  onBlur,
}: FormNumberProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder={placeholder}
              min={min}
              max={max}
              step={step}
              {...field}
              value={field.value || ''}
              onBlur={onBlur}
              onChange={e => {
                const value = e.target.valueAsNumber
                field.onChange(isNaN(value) ? undefined : value)
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
