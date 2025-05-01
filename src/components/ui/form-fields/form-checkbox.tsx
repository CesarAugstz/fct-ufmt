import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '../checkbox'

export interface FormCheckboxProps {
  name: string
  label: string
  required?: boolean
}

export function FormCheckbox({
  name,
  label,
  required = false,
}: FormCheckboxProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start ">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
