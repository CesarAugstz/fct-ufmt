'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle, RefreshCw, Share2 } from 'lucide-react'
import LoadingSpinner from '@/components/loading-spinner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function DashboardsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboards</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Dashboards</CardTitle>
          <CardDescription>
            Manage all your custom dashboards from here.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            conteudooo
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
