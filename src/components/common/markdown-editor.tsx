'use client'

import MDEditor, { commands } from '@uiw/react-md-editor'
import { type ICommand } from '@uiw/react-md-editor'

const bold: ICommand = {
  ...commands.bold,
  buttonProps: {
    'aria-label': 'Adicionar texto em negrito (ctrl + b)',
    title: 'Adicionar texto em negrito (ctrl + b)',
  },
}

const code: ICommand = {
  ...commands.code,
  buttonProps: {
    'aria-label': 'Inserir código (ctrl + j)',
    title: 'Inserir código (ctrl + j)',
  },
}

const codeBlock: ICommand = {
  ...commands.codeBlock,
  buttonProps: {
    'aria-label': 'Inserir bloco de código (ctrl + shift + j)',
    title: 'Inserir bloco de código (ctrl + shift + j)',
  },
}

const comment: ICommand = {
  ...commands.comment,
  buttonProps: {
    'aria-label': 'Inserir comentário (ctrl + /)',
    title: 'Inserir comentário (ctrl + /)',
  },
}

const fullscreen: ICommand = {
  ...commands.fullscreen,
  buttonProps: {
    'aria-label': 'Alternar tela cheia (ctrl + 0)',
    title: 'Alternar tela cheia (ctrl + 0)',
  },
}

const hr: ICommand = {
  ...commands.hr,
  buttonProps: {
    'aria-label': 'Inserir linha horizontal (ctrl + h)',
    title: 'Inserir linha horizontal (ctrl + h)',
  },
}

const image: ICommand = {
  ...commands.image,
  buttonProps: {
    'aria-label': 'Adicionar imagem (ctrl + k)',
    title: 'Adicionar imagem (ctrl + k)',
  },
}

const italic: ICommand = {
  ...commands.italic,
  buttonProps: {
    'aria-label': 'Adicionar texto em itálico (ctrl + i)',
    title: 'Adicionar texto em itálico (ctrl + i)',
  },
}

const link: ICommand = {
  ...commands.link,
  buttonProps: {
    'aria-label': 'Adicionar link (ctrl + l)',
    title: 'Adicionar link (ctrl + l)',
  },
}

const checkedListCommand: ICommand = {
  ...commands.checkedListCommand,
  buttonProps: {
    'aria-label': 'Adicionar lista de verificação (ctrl + shift + c)',
    title: 'Adicionar lista de verificação (ctrl + shift + c)',
  },
}

const orderedListCommand: ICommand = {
  ...commands.orderedListCommand,
  buttonProps: {
    'aria-label': 'Adicionar lista ordenada (ctrl + shift + o)',
    title: 'Adicionar lista ordenada (ctrl + shift + o)',
  },
}

const unorderedListCommand: ICommand = {
  ...commands.unorderedListCommand,
  buttonProps: {
    'aria-label': 'Adicionar lista não ordenada (ctrl + shift + u)',
    title: 'Adicionar lista não ordenada (ctrl + shift + u)',
  },
}

const codeEdit: ICommand = {
  ...commands.codeEdit,
  buttonProps: {
    'aria-label': 'Editar código (ctrl + 7)',
    title: 'Editar código (ctrl + 7)',
  },
}

const codeLive: ICommand = {
  ...commands.codeLive,
  buttonProps: {
    'aria-label': 'Visualização ao vivo (ctrl + 8)',
    title: 'Visualização ao vivo (ctrl + 8)',
  },
}

const codePreview: ICommand = {
  ...commands.codePreview,
  buttonProps: {
    'aria-label': 'Visualizar código (ctrl + 9)',
    title: 'Visualizar código (ctrl + 9)',
  },
}

const quote: ICommand = {
  ...commands.quote,
  buttonProps: {
    'aria-label': 'Inserir citação (ctrl + q)',
    title: 'Inserir citação (ctrl + q)',
  },
}

const strikethrough: ICommand = {
  ...commands.strikethrough,
  buttonProps: {
    'aria-label': 'Adicionar texto riscado (ctrl + shift + x)',
    title: 'Adicionar texto riscado (ctrl + shift + x)',
  },
}

const title1: ICommand = {
  ...commands.title1,
  buttonProps: {
    'aria-label': 'Inserir título 1 (ctrl + 1)',
    title: 'Inserir título 1 (ctrl + 1)',
  },
}

const title2: ICommand = {
  ...commands.title2,
  buttonProps: {
    'aria-label': 'Inserir título 2 (ctrl + 2)',
    title: 'Inserir título 2 (ctrl + 2)',
  },
}

const title3: ICommand = {
  ...commands.title3,
  buttonProps: {
    'aria-label': 'Inserir título 3 (ctrl + 3)',
    title: 'Inserir título 3 (ctrl + 3)',
  },
}

const title4: ICommand = {
  ...commands.title4,
  buttonProps: {
    'aria-label': 'Inserir título 4 (ctrl + 4)',
    title: 'Inserir título 4 (ctrl + 4)',
  },
}

const title5: ICommand = {
  ...commands.title5,
  buttonProps: {
    'aria-label': 'Inserir título 5 (ctrl + 5)',
    title: 'Inserir título 5 (ctrl + 5)',
  },
}

const title6: ICommand = {
  ...commands.title6,
  buttonProps: {
    'aria-label': 'Inserir título 6 (ctrl + 6)',
    title: 'Inserir título 6 (ctrl + 6)',
  },
}

const table: ICommand = {
  ...commands.table,
  buttonProps: {
    'aria-label': 'Adicionar tabela',
    title: 'Adicionar tabela',
  },
}

const help: ICommand = {
  ...commands.help,
  buttonProps: {
    'aria-label': 'Abrir ajuda',
    title: 'Abrir ajuda',
  },
}

const getCommands: () => ICommand[] = () => [
  bold,
  italic,
  strikethrough,
  hr,
  commands.group([title1, title2, title3, title4, title5, title6], {
    name: 'title',
    groupName: 'title',
    buttonProps: {
      'aria-label': 'Inserir título',
      title: 'Inserir título',
    },
  }),
  commands.divider,
  link,
  quote,
  code,
  codeBlock,
  comment,
  image,
  table,
  commands.divider,
  unorderedListCommand,
  orderedListCommand,
  checkedListCommand,
  commands.divider,
  help,
]

const getExtraCommands: () => ICommand[] = () => [
  codeEdit,
  codeLive,
  codePreview,
  commands.divider,
  fullscreen,
]

interface MarkdownEditorProps {
  value?: string
  onChange?: (value?: string) => void
  placeholder?: string
  height?: number
  minHeight?: number
  maxHeight?: number
  visibleDragbar?: boolean
  preview?: 'live' | 'edit' | 'preview'
  hideToolbar?: boolean
  className?: string
}

export function MarkdownEditor({
  value = '',
  onChange,
  placeholder = 'Digite seu texto em Markdown aqui...',
  height = 400,
  minHeight = 200,
  maxHeight = 800,
  visibleDragbar = true,
  preview = 'live',
  hideToolbar = false,
  className = '',
}: MarkdownEditorProps) {
  return (
    <div className={className}>
      <MDEditor
        value={value}
        onChange={onChange}
        height={height}
        minHeight={minHeight}
        maxHeight={maxHeight}
        visibleDragbar={visibleDragbar}
        preview={preview}
        hideToolbar={hideToolbar}
        commands={getCommands()}
        extraCommands={getExtraCommands()}
        textareaProps={{
          placeholder,
        }}
      />
    </div>
  )
}
