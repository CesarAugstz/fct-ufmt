import { BlockComponentType } from '@/types/admin/block-components.types'
import { atom } from 'jotai'
import { UseFormReturn } from 'react-hook-form'

export const blocksAtom = atom<BlockComponentType[]>([])

export const blockEditingAtom = atom<BlockComponentType | null>(null)

export const blockEditContentAtom = atom<any | null>(null)

export const formGetValuesAtom = atom<UseFormReturn<any>['getValues'] | null>(null)


