import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FormText } from '@/components/ui/form-fields/form-text'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import LoadingSpinner from '@/components/common/loading-spinner'
import { CardFormValues } from '@/types/page-components'
import { Home, Bell, Book, Calendar, Users, Star } from 'lucide-react'

const iconOptions = [
  { value: 'home', label: 'Home', icon: Home },
  { value: 'bell', label: 'Notificação', icon: Bell },
  { value: 'book', label: 'Livro', icon: Book },
  { value: 'calendar', label: 'Calendário', icon: Calendar },
  { value: 'users', label: 'Usuários', icon: Users },
  { value: 'star', label: 'Estrela', icon: Star },
]

const formSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  description: z.string().optional(),
  content: z.string().min(1, { message: "Conteúdo é obrigatório" }),
  icon: z.string().min(1, { message: "Ícone é obrigatório" }),
  link: z.string().optional(),
})

interface CardFormProps {
  onSubmit: (data: CardFormValues) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function CardForm({ onSubmit, onCancel, isSubmitting }: CardFormProps) {
  const { handleSubmit, control, formState: { errors } } = useForm<CardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      icon: '',
      link: '',
    }
  })

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Adicionar Novo Card</DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <FormText
            id="title"
            name="title"
            placeholder="Título do card"
            error={errors.title?.message}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Descrição (opcional)</Label>
          <FormText
            id="description"
            name="description"
            placeholder="Descrição breve"
            error={errors.description?.message}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="content">Conteúdo</Label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <textarea
                id="content"
                className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                placeholder="Conteúdo do card"
                {...field}
              />
            )}
          />
          {errors.content && (
            <p className="text-sm text-red-500">{errors.content.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="icon">Ícone</Label>
          <Controller
            name="icon"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um ícone" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        <option.icon className="mr-2 h-4 w-4" />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.icon && (
            <p className="text-sm text-red-500">{errors.icon.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="link">Link (opcional)</Label>
          <FormText
            id="link"
            name="link"
            placeholder="URL do link"
            error={errors.link?.message}
          />
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <LoadingSpinner className="mr-2" />}
            Adicionar
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}
