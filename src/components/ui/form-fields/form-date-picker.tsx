import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { dayJs } from '@/utils/dayjs'

type DateViews = 'year' | 'month' | 'day'

export interface FormDatePickerProps {
  name: string
  label?: string
  customLabel?: React.ReactNode
  description?: string
  views?: DateViews[]
  required?: boolean
  minDate?: Date | string
  maxDate?: Date | string
  onChange?: (date: Date | null) => void
  format?: string
}

export function FormDatePicker({
  name,
  label,
  description,
  customLabel,
  onChange,
  minDate,
  maxDate,
  required = false,
  format = 'DD/MM/YYYY',
  views,
}: FormDatePickerProps) {
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={field.value ? dayJs(field.value) : null}
                onChange={date => {
                  const dateValue = date ? date.toDate() : null
                  field.onChange(dateValue)
                  if (onChange) onChange(dateValue)
                }}
                minDate={minDate ? dayJs(minDate) : undefined}
                maxDate={maxDate ? dayJs(maxDate) : undefined}
                views={views}
                format={format}
                openTo={views?.[0]}
              />
            </LocalizationProvider>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
