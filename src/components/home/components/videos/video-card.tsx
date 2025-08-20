import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface VideoCardProps {
  index: number
}

export function VideoCard({ index }: VideoCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all rounded-xl">
      <CardContent className="p-0">
        <div className="relative group">
          <Image
            src={`/placeholder.svg?height=200&width=300&text=Video ${index}`}
            alt={`Video ${index}`}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-primary ml-1"></div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-1">
            Vídeo institucional {index}
          </h3>
          <p className="text-sm text-gray-500 mb-3">Publicado em 01/03/2025</p>
          <Button
            variant="link"
            className="text-secondary p-0 hover:text-secondary/80 group"
          >
            Assistir{' '}
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
