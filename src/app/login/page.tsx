'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ChevronLeft, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { signIn } from 'next-auth/react'
import { useAuthStore } from '@/store/auth-store'
import { formatLoginApiError } from '@/lib/formaters/format-login-api-error.formater'
import {
  loginFormSchema,
  LoginFormValues,
} from '@/types/forms/login-form.types'
import LoginForm from '@/components/login/form'
import { ActionButton } from '@/components/ui/action-button'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const router = useRouter()
  const authStore = useAuthStore()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: authStore.rememberData.email,
      password: '',
      remember: authStore.rememberData.remember,
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    setLoginError(null)

    try {
      const result = await signIn('admin-login', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (!result || result.error) {
        setLoginError(formatLoginApiError(result))
        return
      }

      if (data.remember) {
        authStore.setRememberData({ remember: true, email: data.email })
      } else {
        authStore.setRememberData({ remember: false, email: '' })
      }

      router.push('/admin')
    } catch (error) {
      console.error('Login failed:', error)
      setLoginError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block relative">
        <div className="absolute inset-0 ">
          <Image
            src="/bg/1.jpg"
            alt="Background"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-primary/40 flex flex-col justify-between p-8 text-white">
          <div>
            <h1 className="text-3xl font-bold">FCT-UFMT</h1>
            <p className="mt-2 text-white/90">
              Universidade Federal de Mato Grosso
            </p>
          </div>
          <p className="text-sm text-white/80">
            © {new Date().getFullYear()} FCT-UFMT. All rights reserved.
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Ir para o site
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            Precisa de ajuda?{' '}
            <Link href="#" className="text-primary hover:underline">
              Contate-nos
            </Link>
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">
                Bem vindo(a) de volta Professor(a)
              </h1>
              <p className="text-muted-foreground">
                Acesse sua conta para continuar
              </p>
            </div>

            {loginError && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm flex items-start">
                <AlertCircle className="mr-2 mt-0.5 flex-shrink-0 size-5" />
                <span>{loginError}</span>
              </div>
            )}

            <Form {...form}>
              <LoginForm />
              <ActionButton
                isLoading={isLoading}
                className="w-full justify-center"
                onClick={form.handleSubmit(onSubmit)}
              >
                Entrar
              </ActionButton>
            </Form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou
                </span>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/register"
                className="text-sm text-primary hover:underline"
              >
                Ainda não tem uma conta? Crie uma agora
              </Link>
            </div>

            <div className="p-4 bg-muted rounded-lg border border-border">
              <div className="text-muted-foreground text-sm font-medium">
                Credenciais de teste:
              </div>
              <div className="font-mono text-xs mt-1">Email: cgl@email.com</div>
              <div className="font-mono text-xs">Password: password123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
