'use client'

import { useEffect } from 'react'
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
  Section,
  sectionFormSchema,
  SectionFormValues,
} from '@/types/admin/section.types'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import {
  useCreateSection,
  useFindUniqueSection,
  useUpdateSection,
} from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'

interface SectionDialogProps {
  type: 'add' | 'edit'
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  sectionId?: string | null
  parentId?: string | null
}

export function SectionDialog({
  type,
  isOpen,
  onOpenChange,
  sectionId,
}: SectionDialogProps) {
  const toast = useToast()
  const editMutation = useUpdateSection()
  const createMutation = useCreateSection()

  const { data: section } = useFindUniqueSection(
    {
      where: {
        id: sectionId!,
      },
    },
    { enabled: !!sectionId },
  )

  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionFormSchema),
    values: {
      name: section?.name || '',
      slug: section?.slug || '',
      parentId: section?.parentId || null,
      isVisible: section?.isVisible || true,
      order: section?.order || 0,
    },
  })

  const handleFormSubmit = async (data: SectionFormValues) => {
    try {
      const sectionFormatted = {
        name: data.name,
        slug: data.slug,
        parentId: data.parentId,
        isVisible: data.isVisible,
        order: data.order,
      }

      if (type === 'edit' && sectionId) {
        await editMutation.mutateAsync({
          where: {
            id: sectionId!,
          },
          data: sectionFormatted,
        })
        toast.success('Section updated successfully')
        return
      }

      await createMutation.mutateAsync({
        data: sectionFormatted,
      })
      toast.success('Section created successfully')
    } catch (e) {
      console.error('Error creating section:', e)
      toast.exception(e)
    }
  }

  const nameValue = form.watch('name')
  useEffect(
    function updateSlug() {
      const currentSlug = form.getValues('slug')

      const generatedSlug = generateSlug(nameValue)
      if (currentSlug === generatedSlug) return

      form.setValue('slug', generatedSlug)
    },
    [nameValue, form],
  )

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
  }


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {type === 'add' ? 'Add New Section' : 'Edit Section'}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4 py-4"
          >
            <FormText
              name="name"
              label="Section Name"
              placeholder="e.g., About Us"
              required
              description="Enter the name of the section"
            />

            <FormText
              name="slug"
              label="Slug"
              placeholder="e.g., about-us"
              description="URL-friendly identifier for the section"
              required
            />

            <FormText
              name="order"
              label="Display Order"
              placeholder="0"
              description="Lower numbers will be displayed first"
              required
            />

            <FormField
              control={form.control}
              name="isVisible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Visible in Navigation
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {type === 'add' ? 'Create Section' : 'Update Section'}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
