'use client'

import { useState, useEffect } from 'react'
import { HexColorPicker, HslColorPicker } from 'react-colorful'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Palette, Pipette } from 'lucide-react'

interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
  label?: string
  disabled?: boolean
}

const hslToHex = (h: number, s: number, l: number): string => {
  const hDecimal = l / 100
  const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min
  const sum = max + min
  const l = sum / 2

  let h = 0
  let s = 0

  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - sum) : diff / sum

    switch (max) {
      case r:
        h = ((g - b) / diff + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / diff + 2) / 6
        break
      case b:
        h = ((r - g) / diff + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

const predefinedColors = [
  '#0a1f40',
  '#1e40af',
  '#2563eb',
  '#3b82f6',
  '#60a5fa',
  '#059669',
  '#10b981',
  '#22c55e',
  '#34d399',
  '#6ee7b7',
  '#dc2626',
  '#ef4444',
  '#f87171',
  '#fca5a5',
  '#fecaca',
  '#d97706',
  '#f59e0b',
  '#fbbf24',
  '#fcd34d',
  '#fde68a',
  '#7c3aed',
  '#8b5cf6',
  '#a78bfa',
  '#c4b5fd',
  '#ddd6fe',
  '#db2777',
  '#ec4899',
  '#f472b6',
  '#f9a8d4',
  '#fce7f3',
  '#000000',
  '#374151',
  '#6b7280',
  '#9ca3af',
  '#d1d5db',
  '#f3f4f6',
  '#f9fafb',
  '#ffffff',
]

export function ColorPicker({
  value,
  onChange,
  label = 'Cor',
  disabled = false,
}: ColorPickerProps) {
  const [hslValue, setHslValue] = useState(() => hexToHsl(value))
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
    setHslValue(hexToHsl(value))
  }, [value])

  const handleColorSelect = (color: string) => {
    setInputValue(color)
    onChange(color)
  }

  const handleHexChange = (newColor: string) => {
    setInputValue(newColor)
    onChange(newColor)
  }

  const handleHslChange = (hsl: { h: number; s: number; l: number }) => {
    setHslValue(hsl)
    const hexColor = hslToHex(hsl.h, hsl.s, hsl.l)
    setInputValue(hexColor)
    onChange(hexColor)
  }

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue)
    if (newValue.match(/^#[0-9A-Fa-f]{6}$/)) {
      onChange(newValue)
    }
  }

  const handleInputBlur = () => {
    if (inputValue.match(/^#[0-9A-Fa-f]{6}$/)) {
      onChange(inputValue)
    } else {
      setInputValue(value)
    }
  }

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-12 h-10 p-0 border-2 rounded-lg hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
              style={{ backgroundColor: value }}
              disabled={disabled}
            >
              <Pipette className="h-3 w-3 text-white/80" />
              <span className="sr-only">Escolher cor</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0" align="start">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="h-4 w-4" />
                <h4 className="font-medium">Seletor de Cores</h4>
              </div>

              <Tabs defaultValue="hex" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="hex">HEX</TabsTrigger>
                  <TabsTrigger value="hsl">HSL</TabsTrigger>
                </TabsList>

                <TabsContent value="hex" className="space-y-4">
                  <div className="flex justify-center">
                    <HexColorPicker
                      color={value}
                      onChange={handleHexChange}
                      style={{
                        width: '220px',
                        height: '160px',
                      }}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="hsl" className="space-y-4">
                  <div className="flex justify-center">
                    <HslColorPicker
                      color={hslValue}
                      onChange={handleHslChange}
                      style={{
                        width: '220px',
                        height: '160px',
                      }}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-center gap-3 mt-4 p-3 bg-muted/50 rounded-lg">
                <div
                  className="w-12 h-12 rounded-lg border-2 border-border shadow-sm"
                  style={{ backgroundColor: value }}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium">
                    {value.toUpperCase()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    HSL({hslValue.h}, {hslValue.s}%, {hslValue.l}%)
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Label className="text-xs text-muted-foreground mb-3 block">
                  Cores predefinidas
                </Label>
                <div className="grid grid-cols-10 gap-1.5">
                  {predefinedColors.map(color => (
                    <button
                      key={color}
                      type="button"
                      className="w-6 h-6 rounded border border-border/50 hover:scale-110 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-sm hover:shadow-md"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="color-input" className="text-xs mb-2 block">
                  Código da cor
                </Label>
                <Input
                  id="color-input"
                  value={inputValue}
                  onChange={e => handleInputChange(e.target.value)}
                  onBlur={handleInputBlur}
                  placeholder="#000000"
                  className="font-mono text-sm"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Input
          value={inputValue}
          onChange={e => handleInputChange(e.target.value)}
          onBlur={handleInputBlur}
          placeholder="#000000"
          className="flex-1 font-mono"
          disabled={disabled}
        />
      </div>
    </div>
  )
}
