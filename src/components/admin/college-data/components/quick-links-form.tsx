'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Plus } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { IconPicker } from '@/components/ui/icon-picker'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mapColors, SelectColorItem } from './select-color-item'

type QuickLink = {
  title: string
  subtitle?: string
  icon?: string
  url: string
  color?: string
}

export function QuickLinksForm() {
  const form = useFormContext()
  const [newLink, setNewLink] = useState<QuickLink>({
    title: '',
    subtitle: '',
    icon: '',
    url: '',
    color: '',
  })

  const quickLinks: QuickLink[] = form.watch('quickLinks') || []

  const addQuickLink = () => {
    if (!newLink.title.trim() || !newLink.url.trim()) return

    const updatedLinks = [...quickLinks, { ...newLink }]
    form.setValue('quickLinks', updatedLinks)
    setNewLink({ title: '', subtitle: '', icon: '', url: '' })
  }

  const removeQuickLink = (index: number) => {
    const updatedLinks = quickLinks.filter((_, i) => i !== index)
    form.setValue('quickLinks', updatedLinks)
  }

  const updateQuickLink = (
    index: number,
    field: keyof QuickLink,
    value: string,
  ) => {
    const updatedLinks = quickLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link,
    )
    form.setValue('quickLinks', updatedLinks)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Links Rápidos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {quickLinks.map((link, index) => (
          <Card key={index} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                placeholder="Ex: Cursos"
                value={link.title}
                onChange={e => updateQuickLink(index, 'title', e.target.value)}
              />
              <Input
                placeholder="Ex: Conheça nossos cursos"
                value={link.subtitle || ''}
                onChange={e =>
                  updateQuickLink(index, 'subtitle', e.target.value)
                }
              />
              <IconPicker
                value={link.icon || ''}
                onChange={value => updateQuickLink(index, 'icon', value)}
                placeholder="Selecionar ícone"
              />
              <Select
                value={link.color}
                onValueChange={value => updateQuickLink(index, 'color', value)}
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Cor" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(mapColors).map(color => (
                    <SelectColorItem key={color} color={color} />
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Input
                  placeholder="Ex: /home/courses"
                  value={link.url}
                  onChange={e => updateQuickLink(index, 'url', e.target.value)}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeQuickLink(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <Card className="border-dashed border-2">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                placeholder="Ex: Cursos"
                value={newLink.title}
                onChange={e =>
                  setNewLink({ ...newLink, title: e.target.value })
                }
              />
              <Input
                placeholder="Ex: Conheça nossos cursos"
                value={newLink.subtitle}
                onChange={e =>
                  setNewLink({ ...newLink, subtitle: e.target.value })
                }
              />
              <IconPicker
                value={newLink.icon}
                onChange={value => setNewLink({ ...newLink, icon: value })}
                placeholder="Selecionar ícone"
              />
              <Select
                value={newLink.color}
                onValueChange={value =>
                  setNewLink({ ...newLink, color: value })
                }
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Cor" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(mapColors).map(color => (
                    <SelectColorItem key={color} color={color} />
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Input
                  placeholder="Ex: /home/courses"
                  value={newLink.url}
                  onChange={e =>
                    setNewLink({ ...newLink, url: e.target.value })
                  }
                />
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={addQuickLink}
                  disabled={!newLink.title.trim() || !newLink.url.trim()}
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
