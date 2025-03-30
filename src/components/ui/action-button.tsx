'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { UseMutationResult } from '@tanstack/react-query'

type ButtonProps = Parameters<typeof Button>[0]

interface ActionButtonProps extends ButtonProps {
  mutations?: Array<{ isPending: boolean }>
  children: React.ReactNode
}

export function ActionButton({
  mutations,
  children,
  ...props
}: ActionButtonProps) {
  const isLoading = mutations?.some((mutation) => mutation.isPending)

  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
