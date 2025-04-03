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
  useFindManyPage,
  useFindUniqueSection,
  useUpdateSection,
} from '@/lib/zenstack-hooks'
import { useToast } from '@/lib/hooks/toast'
import { ActionButton } from '@/components/ui/action-button'
import { invalidateSectionsCache } from '../../../app/admin/sections/actions'

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
  parentId,
}: SectionDialogProps) {
  const toast = useToast()
  const editMutation = useUpdateSection({
    onSettled: invalidateSectionsCache,
  })
  const createMutation = useCreateSection({
    onSettled: invalidateSectionsCache,
  })

  const { data: section } = useFindUniqueSection(
    {
      where: {
        id: sectionId!,
      },
    },
    { enabled: !!sectionId },
  )

  const { data: pages } = useFindManyPage({})

  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionFormSchema),
    values: {
      name: section?.name || '',
      pageId: section?.pageId || null,
      parentId: section?.parentId || null,
      isVisible: section?.isVisible || true,
      order: section?.order || 0,
    },
  })

  useEffect(
    function resetValues() {
      if (isOpen) {
        form.reset()
      }
    },
    [isOpen, form],
  )

  const handleFormSubmit = async (data: SectionFormValues) => {
    try {
      const sectionFormatted = {
        name: data.name,
        pageId: data.pageId,
        parentId: parentId || data.parentId,
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
        onOpenChange(false)
        return
      }

      await createMutation.mutateAsync({
        data: sectionFormatted,
      })
      toast.success('Section created successfully')
      onOpenChange(false)
    } catch (e) {
      console.error('Error creating section:', e)
      toast.exception(e)
    }
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

            <FormSelect
              name="pageId"
              label="Page"
              placeholder="Select a page"
              options={
                pages?.map(page => ({ value: page.id, label: page.name })) ?? []
              }
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
              <ActionButton
                mutations={[editMutation, createMutation]}
                type="submit"
              >
                {type === 'add' ? 'Create Section' : 'Update Section'}
              </ActionButton>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
