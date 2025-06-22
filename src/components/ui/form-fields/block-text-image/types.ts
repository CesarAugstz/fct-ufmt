export interface TextBlock {
  id: string
  type: 'text'
  content: string
}

export interface ImageBlock {
  id: string
  type: 'image'
  file: File | null
  url: string | null
  caption: string
  size?: 'small' | 'medium' | 'large' | 'full'
  alignment?: 'left' | 'center' | 'right'
}

export type Block = TextBlock | ImageBlock
