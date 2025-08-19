'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Plus } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

type TextLink = {
  title: string
  url?: string
}

export function UsefulLinksForm() {
  const form = useFormContext()
  const [newLink, setNewLink] = useState<TextLink>({
    title: '',
    url: '',
  })

  const usefulLinks: TextLink[] = form.watch('usefulLinksItems') || []

  const addUsefulLink = () => {
    if (!newLink.title.trim()) return

    const updatedLinks = [...usefulLinks, { ...newLink }]
    form.setValue('usefulLinksItems', updatedLinks)
    setNewLink({ title: '', url: '' })
  }

  const removeUsefulLink = (index: number) => {
    const updatedLinks = usefulLinks.filter((_, i) => i !== index)
    form.setValue('usefulLinksItems', updatedLinks)
  }

  const updateUsefulLink = (
    index: number,
    field: keyof TextLink,
    value: string,
  ) => {
    const updatedLinks = usefulLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link,
    )
    form.setValue('usefulLinksItems', updatedLinks)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Links Úteis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {usefulLinks.map((link, index) => (
          <Card key={index} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Ex: Portal do Estudante"
                value={link.title}
                onChange={e => updateUsefulLink(index, 'title', e.target.value)}
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Ex: https://portal.estudante.gov.br"
                  value={link.url || ''}
                  onChange={e => updateUsefulLink(index, 'url', e.target.value)}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeUsefulLink(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <Card className="border-dashed border-2">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Ex: Portal do Estudante"
                value={newLink.title}
                onChange={e =>
                  setNewLink({ ...newLink, title: e.target.value })
                }
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Ex: https://portal.estudante.gov.br"
                  value={newLink.url}
                  onChange={e =>
                    setNewLink({ ...newLink, url: e.target.value })
                  }
                />
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={addUsefulLink}
                  disabled={!newLink.title.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
