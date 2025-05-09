'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Prisma, Role } from '@prisma/client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FormText } from '@/components/ui/form-fields/form-text'
import LoadingSpinner from '@/components/common/loading-spinner'
import {
  useCreateUser,
  useFindUniqueUser,
  useUpdateUser,
} from '@/lib/zenstack-hooks'

import { useToast } from '@/lib/hooks/toast'
import { UserSchema } from '@/utils/schemas/user.schema'
import { FormSelect } from '@/components/ui/form-fields/form-select'
import { RoleMapper } from '@/utils/mappers/role.mapper'

const formSchema = UserSchema.formSchema

type UserFormValues = z.infer<typeof formSchema>

interface UserFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  userId?: string
}

export default function UserForm({
  isOpen,
  onClose,
  onSuccess,
  userId,
}: UserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditMode = !!userId
  const toast = useToast()

  const { data: userData, isLoading: isLoadingUser } = useFindUniqueUser(
    { where: { id: userId } },
    { enabled: !!userId },
  )

  const { mutate: createUser } = useCreateUser()
  const { mutate: updateUser } = useUpdateUser()

  const methods = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    values: {
      name: userData?.name || '',
      email: userData?.email || '',
      password: '',
      role: userData?.role || 'USER',
    },
  })

  const onSubmit = (values: UserFormValues) => {
    setIsSubmitting(true)

    const data: Omit<Prisma.UserUpdateInput, 'id' | 'createdAt' | 'updatedAt'> =
      {
        name: values.name,
        email: values.email,
        role: values.role as Role,
      }

    if (values.password && values.password.length > 0) {
      data.password = values.password
    }

    if (isEditMode && userData) {
      updateUser(
        {
          where: { id: userData.id },
          data: data as any,
        },
        {
          onSuccess: () => {
            setIsSubmitting(false)
            onSuccess()
          },
          onError: error => {
            console.error('Error updating user:', error)
            setIsSubmitting(false)
            toast.exception(error)
          },
        },
      )
    } else {
      if (!data.password) {
        methods.setError('password', {
          type: 'manual',
          message: 'Senha é obrigatória para novos usuários',
        })
        setIsSubmitting(false)
        return
      }

      if (!data.email || typeof data.email !== 'string') {
        methods.setError('email', {
          type: 'manual',
          message: 'Email is required',
        })
        setIsSubmitting(false)
        return
      }

      createUser(
        {
          data: data as any,
        },
        {
          onSuccess: () => {
            setIsSubmitting(false)
            onSuccess()
          },
          onError: error => {
            console.error('Error creating user:', error)
            setIsSubmitting(false)
            toast.exception(error)
          },
        },
      )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Atualize as informações do usuário no formulário abaixo.'
              : 'Insira os detalhes do novo usuário.'}
          </DialogDescription>
        </DialogHeader>

        {isLoadingUser ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormText
                name="name"
                label="Nome"
                placeholder="Digite o nome do usuário"
              />

              <FormText
                name="email"
                label="Email"
                placeholder="Digite o endereço de email"
                required
              />

              <FormText
                name="password"
                label={
                  isEditMode
                    ? 'Senha (deixe em branco para manter a atual)'
                    : 'Senha'
                }
                placeholder={
                  isEditMode ? 'Digite a nova senha' : 'Digite a senha'
                }
                type="password"
                required={!isEditMode}
              />

              <FormSelect
                name="role"
                label="Função"
                options={RoleMapper.roleOptions}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner className="mr-2 h-4 w-4" />
                      {isEditMode ? 'Atualizando...' : 'Criando...'}
                    </>
                  ) : (
                    <>{isEditMode ? 'Atualizar Usuário' : 'Criar Usuário'}</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        )}
      </DialogContent>
    </Dialog>
  )
}
