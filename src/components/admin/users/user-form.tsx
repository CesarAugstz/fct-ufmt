'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Prisma, Role } from '@prisma/client'
import { useSession } from 'next-auth/react'
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
const adminFormSchema = UserSchema.adminFormSchema

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
  const { data: session } = useSession()

  const isAdmin =
    session?.user?.role === 'ADMIN' || session?.user?.role === 'ADMIN_PROFESSOR'
  const currentSchema = isAdmin ? adminFormSchema : formSchema

  const { data: userData, isLoading: isLoadingUser } = useFindUniqueUser(
    { where: { id: userId } },
    { enabled: !!userId },
  )

  const { mutate: createUser } = useCreateUser()
  const { mutate: updateUser } = useUpdateUser()

  const methods = useForm<UserFormValues>({
    resolver: zodResolver(currentSchema),
    values: {
      name: userData?.name || '',
      email: userData?.email || '',
      password: '',
      role: userData?.role || 'USER',
    },
  })

  const onSubmit = (values: UserFormValues) => {
    setIsSubmitting(true)

    const data: Prisma.UserUpdateInput = {
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
      if (!isAdmin && !data.password) {
        data.isFirstAccess = true
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              : isAdmin
                ? 'Insira os detalhes do novo usuário. A senha é opcional - usuários podem recuperar sua senha depois.'
                : 'Insira os detalhes do novo usuário. O usuário receberá instruções para criar sua senha.'}
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

              {isAdmin && (
                <FormText
                  name="password"
                  label={
                    isEditMode
                      ? 'Senha (deixe em branco para manter a atual)'
                      : 'Senha (opcional - usuário pode recuperar depois)'
                  }
                  placeholder={
                    isEditMode ? 'Digite a nova senha' : 'Digite a senha'
                  }
                  type="password"
                />
              )}

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
