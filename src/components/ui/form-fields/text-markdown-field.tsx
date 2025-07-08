'use client'

import { TextareaHTMLAttributes } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { MarkdownEditor } from '@/components/common/markdown-editor'

interface TextMarkdownFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  placeholder?: string
  preview?: boolean
  value?: string
  onChange?: (value?: string) => void
  height?: number
  minHeight?: number
  maxHeight?: number
}

export function TextMarkdownField({
  placeholder,
  preview = true,
  value = '',
  onChange,
  height,
  minHeight,
  maxHeight,
  ...props
}: TextMarkdownFieldProps) {
  if (!preview) {
    return (
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        {...props}
        className="font-mono"
      />
    )
  }

  return (
    <MarkdownEditor
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      height={height}
      minHeight={minHeight}
      maxHeight={maxHeight}
    />
  )
}
