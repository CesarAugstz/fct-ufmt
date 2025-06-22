import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'

export interface FormSwitchProps {
  name: string
  label?: string
  description?: string
  className?: string
  required?: boolean
  onChange?: (checked: boolean) => void
}

export function FormSwitch({
  name,
  label,
  description,
  className,
  required = false,
  onChange,
}: FormSwitchProps) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex items-center space-x-2">
            <FormControl>
              <Switch
                checked={field.value || false}
                onCheckedChange={checked => {
                  field.onChange(checked)
                  onChange?.(checked)
                }}
              />
            </FormControl>
            {label && (
              <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
            )}
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
