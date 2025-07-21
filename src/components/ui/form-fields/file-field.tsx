import { InputHTMLAttributes, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { X, FileText } from 'lucide-react'
import { AttachmentType } from '@/types/attachment.type'
import { ulid } from 'ulidx'

interface FileFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'value' | 'onChange'
  > {
  value?: AttachmentType | AttachmentType[] | null
  onChange?: (attachments: AttachmentType | AttachmentType[] | null) => void
  accept?: string
  multiple?: boolean
  helperText?: string | React.ReactNode
  showFileNames?: boolean
  clearable?: boolean
}

export function FileField({
  value,
  onChange,
  accept,
  multiple = false,
  helperText,
  showFileNames = true,
  clearable = true,
  className: _className,
  ...props
}: FileFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const convertFileToAttachment = useCallback(
    (file: File): Promise<AttachmentType> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve({
            id: ulid(),
            name: file.name,
            dataUrl: reader.result as string,
            mimeType: file.type,
            size: file.size,
          })
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    },
    [],
  )

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files || files.length === 0) {
        onChange?.(null)
        return
      }

      try {
        if (multiple) {
          const attachments = await Promise.all(
            Array.from(files).map(convertFileToAttachment),
          )
          onChange?.(attachments)
        } else {
          const attachment = await convertFileToAttachment(files[0])
          onChange?.(attachment)
        }
      } catch (error) {
        console.error('Error converting file to attachment:', error)
        onChange?.(null)
      }
    },
    [convertFileToAttachment, multiple, onChange],
  )

  const handleClear = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    onChange?.(null)
  }, [onChange])

  const getAttachmentNames = () => {
    if (!value) return []

    if (Array.isArray(value)) {
      return value.map(attachment => attachment.name)
    }

    return [value.name]
  }

  const getAttachments = () => {
    if (!value) return []
    return Array.isArray(value) ? value : [value]
  }

  const isImage = (mimeType: string) => {
    return mimeType.startsWith('image/')
  }

  const removeAttachment = useCallback(
    (attachmentId: string) => {
      if (!value) return

      if (Array.isArray(value)) {
        const newAttachments = value.filter(att => att.id !== attachmentId)
        onChange?.(newAttachments.length > 0 ? newAttachments : null)
      } else {
        onChange?.(null)
      }

      if (inputRef.current) {
        inputRef.current.value = ''
      }
    },
    [value, onChange],
  )

  const attachmentNames = getAttachmentNames()
  const attachments = getAttachments()
  const hasAttachments = attachmentNames.length > 0

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        {...props}
        ref={inputRef}
      />

      <div className="relative flex items-center gap-3 min-h-[40px] p-3 rounded-md border">
        <Button
          type="button"
          variant="outline"
          onClick={handleUploadClick}
          className="flex-shrink-0 h-8"
        >
          Selecionar {multiple ? 'arquivos' : 'arquivo'}
        </Button>

        {!hasAttachments && (
          <span className="text-sm text-muted-foreground">
            Nenhum arquivo selecionado
          </span>
        )}

        {hasAttachments && (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {attachments.slice(0, 2).map((attachment, index) => (
              <div
                key={attachment.id || index}
                className="flex items-center gap-2"
              >
                {isImage(attachment.mimeType) ? (
                  <div className="relative h-8 w-8 overflow-hidden rounded-md bg-muted flex-shrink-0">
                    <img
                      src={attachment.dataUrl}
                      alt={attachment.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted flex-shrink-0">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}

                {clearable && multiple && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-destructive/10"
                    onClick={() => removeAttachment(attachment.id!)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remover {attachment.name}</span>
                  </Button>
                )}
              </div>
            ))}

            {attachments.length > 2 && (
              <span className="text-xs text-muted-foreground">
                +{attachments.length - 2} mais
              </span>
            )}

            {clearable && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-destructive/10 ml-auto"
                onClick={handleClear}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Limpar todos</span>
              </Button>
            )}
          </div>
        )}
      </div>

      {hasAttachments && showFileNames && (
        <div className="space-y-1">
          {attachments.map((attachment, index) => (
            <div
              key={attachment.id || index}
              className="flex items-center justify-between text-xs text-muted-foreground px-1"
            >
              <span className="truncate flex-1">
                {attachment.name} ({(attachment.size / 1024).toFixed(1)} KB)
              </span>
              {clearable && multiple && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 ml-2 hover:bg-destructive/10"
                  onClick={() => removeAttachment(attachment.id!)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remover {attachment.name}</span>
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  )
}
