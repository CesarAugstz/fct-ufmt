'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Upload, X, Settings } from 'lucide-react'
import type { ImageBlock, Block } from './types'

interface ImageBlockComponentProps {
  block: ImageBlock
  onUpdate: (id: string, updates: Partial<Block>) => void
}

export function ImageBlockComponent({
  block,
  onUpdate,
}: ImageBlockComponentProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      const url = URL.createObjectURL(file)
      onUpdate(block.id, { file, url })
    },
    [block.id, onUpdate],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  })

  const removeImage = () => {
    if (block.url) {
      URL.revokeObjectURL(block.url)
    }
    onUpdate(block.id, { file: null, url: null })
  }

  const getImageSizeClass = () => {
    switch (block.size || 'medium') {
      case 'small':
        return 'max-w-xs'
      case 'medium':
        return 'max-w-md'
      case 'large':
        return 'max-w-lg'
      case 'full':
        return 'w-full'
      default:
        return 'max-w-md'
    }
  }

  const getImageAlignmentClass = () => {
    switch (block.alignment || 'center') {
      case 'left':
        return 'mr-auto'
      case 'center':
        return 'mx-auto'
      case 'right':
        return 'ml-auto'
      default:
        return 'mx-auto'
    }
  }

  return (
    <div className="space-y-4">
      {block.url ? (
        <div className="space-y-3">
          <div className="relative inline-block">
            <div className="absolute top-2 right-2 flex gap-1 z-10">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Tamanho</Label>
                      <Select
                        value={block.size || 'medium'}
                        onValueChange={value =>
                          onUpdate(block.id, {
                            size: value as
                              | 'small'
                              | 'medium'
                              | 'large'
                              | 'full',
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Pequeno</SelectItem>
                          <SelectItem value="medium">Médio</SelectItem>
                          <SelectItem value="large">Grande</SelectItem>
                          <SelectItem value="full">Largura Total</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Alinhamento</Label>
                      <Select
                        value={block.alignment || 'center'}
                        onValueChange={value =>
                          onUpdate(block.id, {
                            alignment: value as 'left' | 'center' | 'right',
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="left">Esquerda</SelectItem>
                          <SelectItem value="center">Centro</SelectItem>
                          <SelectItem value="right">Direita</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={removeImage}
                className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <img
              src={block.url}
              alt={block.caption || 'Uploaded image'}
              className={`h-auto rounded-lg border ${getImageSizeClass()} ${getImageAlignmentClass()}`}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`caption-${block.id}`}>Legenda</Label>
            <Input
              id={`caption-${block.id}`}
              placeholder="Digite uma legenda para a imagem..."
              value={block.caption}
              onChange={e => onUpdate(block.id, { caption: e.target.value })}
            />
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isDragActive
              ? 'Solte a imagem aqui...'
              : 'Arraste uma imagem aqui ou clique para selecionar'}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            PNG, JPG, JPEG, GIF, WEBP até 5MB
          </p>
        </div>
      )}
    </div>
  )
}
