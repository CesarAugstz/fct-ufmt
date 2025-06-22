# Form Fields Components

This directory contains reusable form field components that integrate with React Hook Form.

## Available Components

### FormMarkdown

A form field component for markdown input with live preview functionality.

**Features:**

- Live markdown preview with tab switching
- Basic markdown support (headers, lists, paragraphs)
- Form validation integration
- Consistent styling with other form fields

**Props:**

- `name` (string): Field name for form binding
- `label` (string): Display label
- `placeholder` (string, optional): Input placeholder text
- `description` (string, optional): Help text below the field
- `required` (boolean, optional): Shows required indicator
- `rows` (number, optional): Number of textarea rows
- `preview` (boolean, optional): Enable/disable preview functionality (default: true)
- `className` (string, optional): Additional CSS classes

**Usage:**

```tsx
import { FormMarkdown } from '@/components/ui/form-fields/form-markdown'
;<FormMarkdown
  name="description"
  label="Description"
  placeholder="Enter markdown content..."
  description="You can use markdown syntax"
  required
  rows={10}
  preview={true}
/>
```

### TextMarkdownField

The underlying markdown input field component.

**Features:**

- Edit/Preview tabs
- Basic markdown rendering
- Monospace font for editing
- Customizable preview styles

**Props:**

- `placeholder` (string, optional): Input placeholder
- `preview` (boolean, optional): Enable preview mode (default: true)
- Standard textarea HTML attributes

## Markdown Support

Currently supports:

- Headers (`# ## ###`)
- Lists (`- *`)
- Paragraphs
- Line breaks

Future enhancements could include:

- **Bold** and _italic_ text
- Links
- Code blocks
- Tables
- Images

## Integration with React Hook Form

All form components integrate seamlessly with React Hook Form:

```tsx
import { useForm, FormProvider } from 'react-hook-form'
import { FormMarkdown } from '@/components/ui/form-fields'

const MyForm = () => {
  const form = useForm({
    defaultValues: {
      content: '',
    },
  })

  const onSubmit = data => {
    console.log(data.content) // markdown string
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormMarkdown name="content" label="Content" required />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}
```
