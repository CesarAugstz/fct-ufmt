import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAtomValue } from 'jotai'
import { Upload, Save } from 'lucide-react'
import { professorAtom } from '../configure.store'
import ProfileImage from '@/components/common/profile-image'
import { Badge } from '@/components/ui/badge'

export default function Photo() {
  const professor = useAtomValue(professorAtom)

  const initials = professor?.name
    ? professor.name
        .split(' ')
        .filter(x => !['dr.', 'ms.'].includes(x.toLowerCase()))
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase()
    : 'U'

  return (
    <Card className="overflow-hidden pt-0">
      <div className="bg-gradient-to-r from-primary to-secondary h-24 relative">
        <div className="absolute -bottom-12 left-6 md:left-8">
          <ProfileImage alt={initials} src={professor?.image} size={32} />
        </div>
      </div>
      <div className="pt-16 pb-6 px-6 md:px-8">
        <div className="flex flex-col flex-wrap md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">{professor?.name}</h2>
            <p className="text-muted-foreground">{professor?.summary}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="sm" variant="outline" className="w-full sm:w-auto">
              <Upload className="h-4 w-4 mr-2" />
              Alterar foto
            </Button>
            <Button size="sm" variant="default" className="w-full sm:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Salvar dados
            </Button>
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
