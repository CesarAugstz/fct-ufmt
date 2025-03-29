import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface PhotoCardProps {
  index: number
}

export function PhotoCard({ index }: PhotoCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all rounded-xl group">
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={`/placeholder.svg?height=200&width=300&text=Galeria ${index}`}
            alt={`Foto ${index}`}
            width={300}
            height={200}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
            <div className="p-3 text-white">
              <h3 className="font-medium">Álbum de fotos {index}</h3>
              <p className="text-xs text-white/80">12 fotos</p>
            </div>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-800">Álbum de fotos {index}</h3>
          <p className="text-xs text-gray-500">12 fotos</p>
        </div>
      </CardContent>
    </Card>
  )
}
