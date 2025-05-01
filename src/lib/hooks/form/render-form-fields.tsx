import {
  FormMultipleTags,
  FormMultipleTagsProps,
} from '@/components/common/form/form-multiple-tags'
import {
  FormCheckbox,
  FormCheckboxProps,
} from '@/components/ui/form-fields/form-checkbox'
import {
  FormDatePicker,
  FormDatePickerProps,
} from '@/components/ui/form-fields/form-date-picker'
import {
  FormSelect,
  FormSelectProps,
} from '@/components/ui/form-fields/form-select'
import { FormText, FormTextProps } from '@/components/ui/form-fields/form-text'
import {
  FormTextarea,
  FormTextareaProps,
} from '@/components/ui/form-fields/form-textarea'
import { useMemo } from 'react'

type Field = {
  name: string
  label: string
} & (
  | {
      type: 'text'
      getProps: () => FormTextProps
    }
  | {
      type: 'textarea'
      getProps: () => FormTextareaProps
    }
  | {
      type: 'select'
      getOptions: () => FormSelectProps
    }
  | {
      type: 'checkbox'
      getProps: () => FormCheckboxProps
    }
  | {
      type: 'date'
      getProps: () => FormDatePickerProps
    }
  | {
      type: 'multiple-tags'
      getProps: () => FormMultipleTagsProps
    }
  | {
      type: 'custom'
      render: () => React.ReactNode
    }
)

export type FormField = Field

interface RenderFormFieldsProps {
  fields: Field[]
}

export function useRenderFormFields({ fields }: RenderFormFieldsProps) {
  return useMemo(() => fields.map(renderField), [fields])
}

function renderField(field: Field) {
  switch (field.type) {
    case 'text':
      return <FormText key={field.name} {...field.getProps()} />
    case 'textarea':
      return <FormTextarea key={field.name} {...field.getProps()} />
    case 'select':
      return <FormSelect key={field.name} {...field.getOptions()} />
    case 'checkbox':
      return <FormCheckbox key={field.name} {...field.getProps()} />
    case 'date':
      return <FormDatePicker key={field.name} {...field.getProps()} />
    case 'multiple-tags':
      return <FormMultipleTags key={field.name} {...field.getProps()} />
    case 'custom':
      return field.render()
  }
}
