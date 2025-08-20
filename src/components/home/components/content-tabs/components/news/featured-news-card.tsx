import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface FeaturedNewsCardProps {
  title: string
  content: string
}

export function FeaturedNewsCard({ title, content }: FeaturedNewsCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-xl rounded-xl lg:col-span-2 transform transition-all hover:translate-y-[-5px]">
      <CardContent className="p-0">
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src="/placeholder.svg?height=500&width=800&text=Destaque"
            alt="Notícia em destaque"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="mb-4">
              <Badge className="bg-secondary hover:bg-secondary/90 text-white font-medium px-3 py-1">
                Destaque
              </Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {title}
            </h2>
            <p className="text-white/90 mb-4 line-clamp-3">{content}</p>
            <Button className="bg-white text-primary hover:bg-white/90 rounded-md group">
              Leia mais{' '}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
