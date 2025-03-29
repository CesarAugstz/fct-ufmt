'use client'

import { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/ui/form-fields/text-field"
import { SelectField } from "@/components/ui/form-fields/select-field"
import { SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Section, sectionFormSchema, SectionFormValues } from "@/types/admin/section.types"
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form"

interface SectionDialogProps {
  type: 'add' | 'edit'
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSubmit: (formData: SectionFormValues & { id?: string }) => void
  section?: Section | null
  parentId?: string | null
}

export function SectionDialog({ 
  type, 
  isOpen, 
  onOpenChange, 
  onSubmit, 
  section,
  parentId
}: SectionDialogProps) {
  
  const form = useForm<SectionFormValues>({
    resolver: zodResolver(sectionFormSchema),
    defaultValues: {
      name: '',
      slug: '',
      parentId: parentId || null,
      isVisible: true,
      order: 0
    }
  })

  useEffect(() => {
    if (isOpen) {
      if (type === 'edit' && section) {
        form.reset({
          name: section.name,
          slug: section.slug,
          parentId: section.parentId,
          isVisible: section.isVisible,
          order: section.order
        })
      } else if (type === 'add') {
        form.reset({
          name: '',
          slug: '',
          parentId: parentId || null,
          isVisible: true,
          order: 0
        })
      }
    }
  }, [isOpen, type, section, parentId, form])

  const handleFormSubmit = (data: SectionFormValues) => {
    if (type === 'edit' && section) {
      onSubmit({ ...data, id: section.id })
    } else {
      onSubmit(data)
    }
    onOpenChange(false)
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    form.setValue('name', name)
    
    const currentSlug = form.getValues('slug')
    if (!currentSlug || currentSlug === generateSlug(form.getValues('name'))) {
      form.setValue('slug', generateSlug(name))
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
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Section Name</Label>
              <TextField
                placeholder="e.g., About Us"
                {...form.register('name')}
                onChange={handleNameChange}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <TextField
                placeholder="e.g., about-us"
                {...form.register('slug')}
              />
              {form.formState.errors.slug && (
                <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <TextField
                type="number"
                placeholder="0"
                {...form.register('order', {
                  valueAsNumber: true
                })}
              />
              {form.formState.errors.order && (
                <p className="text-sm text-destructive">{form.formState.errors.order.message}</p>
              )}
              <p className="text-sm text-muted-foreground">Lower numbers will be displayed first</p>
            </div>
            
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
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
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
