'use client'
import { createContext, useContext, useState, ReactNode } from 'react'
import { BlockType } from '@prisma/client'

export type Block = {
  id: string
  type: BlockType
  content: any
}

interface BlocksContextType {
  blocks: Block[]
  setBlocks: (blocks: Block[]) => void
  updateBlock: (id: string, content: any) => void
  deleteBlock: (id: string) => void
  addBlock: (type: BlockType, content: any) => void
}

const BlocksContext = createContext<BlocksContextType | undefined>(undefined)

export function BlocksProvider({ children, initialBlocks = [] }: { children: ReactNode, initialBlocks?: Block[] }) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)

  const updateBlock = (id: string, content: any) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ))
  }

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id))
  }

  const addBlock = (type: BlockType, content: any) => {
    const newBlock = {
      id: `temp-${Date.now()}`,
      type,
      content,
    }
    setBlocks([...blocks, newBlock])
  }

  return (
    <BlocksContext.Provider value={{ blocks, setBlocks, updateBlock, deleteBlock, addBlock }}>
      {children}
    </BlocksContext.Provider>
  )
}

export function useBlocks() {
  const context = useContext(BlocksContext)
  if (context === undefined) {
    throw new Error('useBlocks must be used within a BlocksProvider')
  }
  return context
}
