import { Card, CardContent } from '@/components/ui/card'
import { useAtomValue } from 'jotai'
import { completitionStatusAtom } from '../configure.store'

export default function CompletitionStatus() {
  const { completed, total } = useAtomValue(completitionStatusAtom)

  const percentage = Math.round((completed / total) * 100)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium">Status de Conclusão</h3>
            <p className="text-muted-foreground">
              Complete seu perfil para melhorar sua visibilidade.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 mr-2"></div>
              <span className="text-sm font-medium">
                {percentage}% concluído
              </span>
            </div>
            <div className="w-24 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-emerald-500 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
