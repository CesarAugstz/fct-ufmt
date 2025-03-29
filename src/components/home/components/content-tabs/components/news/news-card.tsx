import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface NewsCardProps {
  title: string
  badge: string
}

export function NewsCard({ title, badge }: NewsCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-lg rounded-xl transform transition-all hover:translate-y-[-5px]">
      <CardContent className="p-0">
        <div className="relative h-[220px]">
          <Image
            src="/placeholder.svg?height=220&width=400&text=Notícia"
            alt="Notícia"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="mb-2">
              <Badge className="bg-[#0088cc] hover:bg-[#0088cc]/90 text-white">{badge}</Badge>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            <Button variant="link" className="text-white p-0 hover:text-blue-200 group">
              Saiba mais <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
