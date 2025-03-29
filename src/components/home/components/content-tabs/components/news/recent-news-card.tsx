import Image from "next/image"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface RecentNewsCardProps {
  index: number
}

export function RecentNewsCard({ index }: RecentNewsCardProps) {
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-all rounded-xl">
      <CardContent className="p-0">
        <Image
          src={`/placeholder.svg?height=200&width=400&text=Notícia ${index}`}
          alt={`Notícia ${index}`}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-5">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Calendar className="h-4 w-4 mr-1" />
            <span>15 de Março, 2025</span>
          </div>
          <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
            Aula inaugural do Mestrado em Computação Aplicada
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">
            No dia 22/08/24 celebramos um marco histórico para a ciência, tecnologia e inovação em
            Mato Grosso...
          </p>
          <Button variant="link" className="text-[#0088cc] p-0 hover:text-[#0088cc]/80 group">
            Leia mais <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
