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
import { Separator } from '@/components/ui/separator'
import { useMemo } from 'react'

type Field = {} & (
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

export type FormFieldSection = {
  title: string
  fields: Field[]
}

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
      return <FormText key={field.getProps().name} {...field.getProps()} />
    case 'textarea':
      return <FormTextarea key={field.getProps().name} {...field.getProps()} />
    case 'select':
      return (
        <FormSelect key={field.getOptions().name} {...field.getOptions()} />
      )
    case 'checkbox':
      return <FormCheckbox key={field.getProps().name} {...field.getProps()} />
    case 'date':
      return (
        <FormDatePicker key={field.getProps().name} {...field.getProps()} />
      )
    case 'multiple-tags':
      return (
        <FormMultipleTags key={field.getProps().name} {...field.getProps()} />
      )
    case 'custom':
      return field.render()
  }
}

function renderSection(section: FormFieldSection) {
  return (
    <div key={section.title} className="grid mb-8">
      <h3 className="text-lg font-medium">{section.title}</h3>
      <Separator className="mb-4" />
      <div className="grid gap-4 gap-y-4 md:space-y-0 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        {section.fields.map(renderField)}
      </div>
    </div>
  )
}

export function useRenderFormSections(sections: FormFieldSection[]) {
  return useMemo(() => sections.map(renderSection), [sections])
}
