import { Card } from '@/components/ui/card'
import { useAtom, useAtomValue } from 'jotai'
import { Upload, Save } from 'lucide-react'
import { formMethodsAtom, professorAtom } from '../configure.store'
import ProfileImage from '@/components/common/profile-image'
import { Badge } from '@/components/ui/badge'
import { ActionButton } from '@/components/ui/action-button'
import { useCallback, useRef } from 'react'
import { useImageCompressor } from '@/lib/hooks/image-compressor'

interface Props {
  onClickSave: () => void
  isSubmitting: boolean
}

export default function Photo({ onClickSave, isSubmitting }: Props) {
  const [professor, setProfessor] = useAtom(professorAtom)
  const formMethods = useAtomValue(formMethodsAtom)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { compress, isCompressing } = useImageCompressor()

  const initials = professor?.user?.name
    ? professor?.user?.name
        .split(' ')
        .filter(x => !['dr.', 'ms.'].includes(x.toLowerCase()))
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase()
    : 'U'

  const handleUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event?.target?.files?.[0]
      if (!file) return

      const compressed = await compress(file, {
        maxHeight: 800,
        maxWidth: 800,
        maxSizeKB: 800,
        quality: 0.9,
      })

      const base64 = compressed.dataUrl
      formMethods?.setValue('image', base64)
      setProfessor({ ...professor, image: base64 } as typeof professor)
    },
    [compress, formMethods, professor, setProfessor],
  )

  return (
    <Card className="overflow-hidden pt-0">
      <div className="bg-gradient-to-r from-primary to-secondary h-24 relative">
        <div className="absolute -bottom-12 left-6 md:left-8">
          <ProfileImage
            alt={initials}
            src={professor?.image ?? undefined}
            className="w-[120px] h-[120px]"
          />
        </div>
      </div>
      <div className="pt-16 pb-6 px-6 md:px-8">
        <div className="flex flex-col flex-wrap md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{professor?.user?.name}</h2>
            <p className="text-muted-foreground">{professor?.summary}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
            <ActionButton
              size="sm"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => fileInputRef.current?.click()}
              isLoading={isCompressing}
            >
              <Upload className="h-4 w-4 mr-2" />
              Alterar foto
            </ActionButton>
            <ActionButton
              isLoading={isSubmitting}
              className="w-full sm:w-auto"
              variant="default"
              onClick={onClickSave}
              size="sm"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar dados
            </ActionButton>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {professor?.specialties.map(specialty => (
            <Badge key={specialty} variant="secondary">
              {specialty}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  )
}
