'use client'

import { useCallback, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FormText } from '@/components/ui/form-fields/form-text'
import { FormSelect } from '@/components/ui/form-fields/form-select'
import { Switch } from '@/components/ui/switch'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/lib/hooks/toast'
import { ActionButton } from '@/components/ui/action-button'
import {
  useCreatePage,
  useFindManyPage,
  useFindUniquePage,
  useUpdatePage,
} from '@/lib/zenstack-hooks'
import { PageFormType, pagesFormSchema } from '@/types/admin/pages.types'

interface PagesDialogProps {
  type: 'add' | 'edit'
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  pageId?: string | null
}

export function PagesDialog({
  type,
  isOpen,
  onOpenChange,
  pageId,
}: PagesDialogProps) {
  const toast = useToast()
  const editMutation = useUpdatePage({})
  const createMutation = useCreatePage({})

  const { data: section } = useFindUniquePage(
    {
      where: {
        id: pageId!,
      },
    },
    { enabled: !!pageId },
  )

  const form = useForm<PageFormType>({
    resolver: zodResolver(pagesFormSchema),
    values: {
      name: section?.name || '',
      slug: section?.slug || '',
    },
  })

  function formatSlug(value: string) {
    const formatted = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    return formatted
  }

  const pageSlug = form.watch('slug')

  useEffect(
    function resetValues() {
      if (isOpen) {
        form.reset()
      }
    },
    [isOpen, form],
  )

  const handleFormSubmit = async (data: PageFormType) => {
    try {
      const pageFormatted = {
        name: data.name,
        slug: data.slug,
      }

      if (type === 'edit' && pageId) {
        await editMutation.mutateAsync({
          where: {
            id: pageId!,
          },
          data: pageFormatted,
        })
        toast.success('Pages updated successfully')
        onOpenChange(false)
        return
      }

      await createMutation.mutateAsync({
        data: pageFormatted,
      })
      toast.success('Pages created successfully')
      onOpenChange(false)
    } catch (e) {
      console.error('Error creating section:', e)
      toast.exception(e)
    }
  }

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const formattedSlug = formatSlug(value)
      if (pageSlug === formattedSlug) return
      form.setValue('slug', formattedSlug)
    },
    [form, pageSlug],
  )

  const handleSlugBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value
      const formattedValue = formatSlug(value)
      e.target.value = formattedValue
      form.setValue('slug', formattedValue)
    },
    [form],
  )

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {type === 'add' ? 'Add New Page' : 'Edit Page'}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4 py-4"
          >
            <FormText
              name="name"
              label="Pages Name"
              placeholder="e.g., About Us"
              required
              description="Enter the name of the page"
              onChange={handleNameChange}
            />

            <FormText
              name="slug"
              label="Pages Slug"
              placeholder="e.g., about-us"
              required
              description="Enter the slug of the page"
              onBlur={handleSlugBlur}
            />

            <DialogFooter className="pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <ActionButton
                mutations={[editMutation, createMutation]}
                type="submit"
              >
                {type === 'add' ? 'Create Pages' : 'Update Page'}
              </ActionButton>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
