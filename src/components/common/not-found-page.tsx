'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { FileQuestion, Home, ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface NotFoundPageProps {
  title?: string
  description?: string
  showHomeButton?: boolean
  showBackButton?: boolean
  showSearchButton?: boolean
  homeHref?: string
  className?: string
}

export default function NotFoundPage({
  title = 'Ops! Não encontramos o que você procura',
  description = 'A página ou conteúdo que você está procurando não existe ou foi movido para outro lugar.',
  showHomeButton = true,
  showBackButton = true,
  showSearchButton = false,
  homeHref = '/home',
  className,
}: NotFoundPageProps) {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div
      className={`flex min-h-[60vh] items-center justify-center p-4 ${className}`}
    >
      <Card className="w-full max-w-lg shadow-lg border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-gradient-to-br from-primary/20 to-primary/10 p-4 shadow-sm">
              <FileQuestion className="h-12 w-12 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-card-foreground mb-2">
            {title}
          </CardTitle>
          <CardDescription className="text-muted-foreground text-base leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center px-6">
          <div className="bg-muted rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground font-medium">
              💡 Dica: Verifique se o endereço está correto ou tente navegar
              pelos menus principais.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 px-6 pb-6">
          {showHomeButton && (
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              size="lg"
              asChild
            >
              <Link href={homeHref}>
                <Home className="h-4 w-4 mr-2" />
                Ir para o Início
              </Link>
            </Button>
          )}

          <div className="flex gap-2 w-full">
            {showBackButton && (
              <Button
                className="flex-1"
                variant="outline"
                onClick={handleGoBack}
                size="lg"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            )}

            {showSearchButton && (
              <Button className="flex-1" variant="outline" asChild size="lg">
                <Link href="/home">
                  <Search className="h-4 w-4 mr-2" />
                  Pesquisar
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
