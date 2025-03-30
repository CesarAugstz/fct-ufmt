'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'
import { redirect } from 'next/navigation'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (!error) return
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-red-100 p-3">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Something went wrong</CardTitle>
            <CardDescription className="text-gray-500 mt-2">
              We apologize for the inconvenience. An unexpected error has occurred.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 my-2 overflow-auto">
              {error.message || "An unknown error occurred"}
            </div>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              className="w-full" 
              onClick={() => reset ? reset() : redirect('/admin')}
              variant="default"
            >
              Try Again
            </Button>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => redirect('/admin')}
            >
              Return Home
            </Button>
          </CardFooter>
        </Card>
      </body>
    </html>
  )
}
