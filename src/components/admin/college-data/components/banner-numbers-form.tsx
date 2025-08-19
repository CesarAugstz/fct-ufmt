'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Plus } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

type BannerNumber = {
  title: string
  value: number
  suffix?: string
}

export function BannerNumbersForm() {
  const form = useFormContext()
  const [newNumber, setNewNumber] = useState<BannerNumber>({
    title: '',
    value: 0,
    suffix: '',
  })

  const bannerNumbers: BannerNumber[] = form.watch('bannerNumbersItems') || []

  const addBannerNumber = () => {
    if (!newNumber.title.trim() || newNumber.value === 0) return

    const updatedNumbers = [...bannerNumbers, { ...newNumber }]
    form.setValue('bannerNumbersItems', updatedNumbers)
    setNewNumber({ title: '', value: 0, suffix: '' })
  }

  const removeBannerNumber = (index: number) => {
    const updatedNumbers = bannerNumbers.filter((_, i) => i !== index)
    form.setValue('bannerNumbersItems', updatedNumbers)
  }

  const updateBannerNumber = (
    index: number,
    field: keyof BannerNumber,
    value: string | number,
  ) => {
    const updatedNumbers = bannerNumbers.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    )
    form.setValue('bannerNumbersItems', updatedNumbers)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Números do Banner</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bannerNumbers.map((item, index) => (
          <Card key={index} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Ex: Estudantes"
                value={item.title}
                onChange={e =>
                  updateBannerNumber(index, 'title', e.target.value)
                }
              />
              <Input
                type="number"
                placeholder="Ex: 3000"
                value={item.value}
                onChange={e =>
                  updateBannerNumber(index, 'value', parseInt(e.target.value))
                }
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Ex: +, mil, etc."
                  value={item.suffix || ''}
                  onChange={e =>
                    updateBannerNumber(index, 'suffix', e.target.value)
                  }
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeBannerNumber(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <Card className="border-dashed border-2">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Ex: Estudantes"
                value={newNumber.title}
                onChange={e =>
                  setNewNumber({ ...newNumber, title: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Ex: 3000"
                value={newNumber.value}
                onChange={e =>
                  setNewNumber({
                    ...newNumber,
                    value: parseInt(e.target.value) || 0,
                  })
                }
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Ex: +, mil, etc."
                  value={newNumber.suffix}
                  onChange={e =>
                    setNewNumber({ ...newNumber, suffix: e.target.value })
                  }
                />
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={addBannerNumber}
                  disabled={!newNumber.title.trim() || newNumber.value === 0}
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
