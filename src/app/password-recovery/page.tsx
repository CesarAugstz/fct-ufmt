'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { ChevronLeft, Mail, Key, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { ActionButton } from '@/components/ui/action-button'
import { FormText } from '@/components/ui/form-fields/form-text'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  requestOTPSchema,
  verifyOTPSchema,
  RequestOTPFormValues,
  VerifyOTPFormValues,
} from '@/types/forms/password-recovery.types'

type Step = 'request' | 'verify'

export default function PasswordRecoveryPage() {
  const [currentStep, setCurrentStep] = useState<Step>('request')
  const [userEmail, setUserEmail] = useState('')
  const [isFirstAccess, setIsFirstAccess] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const requestForm = useForm<RequestOTPFormValues>({
    resolver: zodResolver(requestOTPSchema),
    defaultValues: {
      email: '',
    },
  })

  const verifyForm = useForm<VerifyOTPFormValues>({
    resolver: zodResolver(verifyOTPSchema),
    defaultValues: {
      email: '',
      otpCode: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  async function onRequestOTP(data: RequestOTPFormValues) {
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Erro ao enviar código')
        return
      }

      setUserEmail(data.email)
      setIsFirstAccess(result.isFirstAccess)
      setMessage(result.message)
      setCurrentStep('verify')
      verifyForm.setValue('email', data.email)
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  async function onVerifyOTP(data: VerifyOTPFormValues) {
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Erro ao verificar código')
        return
      }

      setMessage(result.message)

      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  function goBack() {
    setCurrentStep('request')
    setError('')
    setMessage('')
    verifyForm.reset()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {currentStep === 'request'
              ? 'Recuperar Senha'
              : isFirstAccess
                ? 'Primeiro Acesso'
                : 'Redefinir Senha'}
          </h1>
          <p className="text-gray-600 mt-2">
            {currentStep === 'request'
              ? 'Digite seu email para receber o código de verificação'
              : isFirstAccess
                ? 'Crie sua senha de acesso'
                : 'Digite o código recebido e sua nova senha'}
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              {currentStep === 'request' ? (
                <>
                  <Mail className="h-5 w-5" />
                  Solicitar Código
                </>
              ) : (
                <>
                  <Key className="h-5 w-5" />
                  {isFirstAccess ? 'Criar Senha' : 'Nova Senha'}
                </>
              )}
            </CardTitle>
            <CardDescription>
              {currentStep === 'request'
                ? 'Enviaremos um código de 6 dígitos para seu email'
                : 'O código é válido por 15 minutos'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {message && (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {currentStep === 'request' ? (
              <Form {...requestForm}>
                <form
                  onSubmit={requestForm.handleSubmit(onRequestOTP)}
                  className="space-y-4"
                >
                  <FormText
                    name="email"
                    label="Email"
                    type="text"
                    placeholder="seu@email.com"
                    onEnter={requestForm.handleSubmit(onRequestOTP)}
                    required
                  />
                  <ActionButton
                    type="submit"
                    className="w-full"
                    isLoading={isLoading}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Código
                  </ActionButton>
                </form>
              </Form>
            ) : (
              <Form {...verifyForm}>
                <form
                  onSubmit={verifyForm.handleSubmit(onVerifyOTP)}
                  className="space-y-4"
                >
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                    Código enviado para: <strong>{userEmail}</strong>
                  </div>

                  <FormText
                    name="otpCode"
                    label="Código de Verificação"
                    placeholder="123456"
                    required
                    className="text-center font-mono text-lg tracking-wider"
                  />

                  <FormText
                    name="newPassword"
                    label={isFirstAccess ? 'Criar Senha' : 'Nova Senha'}
                    type="password"
                    placeholder="Digite sua nova senha"
                    required
                  />

                  <FormText
                    name="confirmPassword"
                    label="Confirmar Senha"
                    type="password"
                    placeholder="Digite novamente sua senha"
                    required
                    onEnter={verifyForm.handleSubmit(onVerifyOTP)}
                  />

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full flex-1"
                      onClick={goBack}
                      disabled={isLoading}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Voltar
                    </Button>
                    <ActionButton
                      type="submit"
                      className="w-full flex-1"
                      isLoading={isLoading}
                    >
                      <Key className="h-4 w-4 mr-2" />
                      {isFirstAccess ? 'Criar Senha' : 'Redefinir Senha'}
                    </ActionButton>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-sm text-primary hover:text-primary/80 flex items-center justify-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  )
}
