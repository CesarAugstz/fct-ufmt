'use client'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Settings2, Grid3x3, RectangleHorizontal } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { GridSize } from '@prisma/client'
import type { Block } from './types'

interface BlockConfigProps {
  block: Block
  onUpdate: (id: string, updates: Partial<Block>) => void
}

const gridSizes = [
  { value: GridSize.ONE, label: '1/4', cols: 'col-span-3' },
  { value: GridSize.TWO, label: '1/2', cols: 'col-span-6' },
  { value: GridSize.THREE, label: '3/4', cols: 'col-span-9' },
  { value: GridSize.FOUR, label: 'Full', cols: 'col-span-12' },
] as const

export function BlockConfig({ block, onUpdate }: BlockConfigProps) {
  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
              >
                <Settings2 className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Configurações do bloco</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Configurações</h4>
            <p className="text-sm text-muted-foreground">
              Personalize a aparência do bloco
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor={`border-${block.id}`} className="text-sm">
                Mostrar borda
              </Label>
              <Switch
                id={`border-${block.id}`}
                checked={block.withBorder}
                onCheckedChange={checked =>
                  onUpdate(block.id, { withBorder: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Tamanho na grade</Label>
              <div className="grid grid-cols-2 gap-2">
                {gridSizes.map(size => (
                  <Button
                    key={size.value}
                    type="button"
                    variant={
                      block.gridSize === size.value ? 'default' : 'outline'
                    }
                    size="sm"
                    onClick={() => onUpdate(block.id, { gridSize: size.value })}
                    className="justify-start gap-2"
                  >
                    {size.value === GridSize.FOUR ? (
                      <RectangleHorizontal className="h-3 w-3" />
                    ) : (
                      <Grid3x3 className="h-3 w-3" />
                    )}
                    {size.label}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                1/4 = 25%, 1/2 = 50%, 3/4 = 75%, Full = 100%
              </p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
