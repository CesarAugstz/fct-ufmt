import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { History } from 'lucide-react'
import Image from 'next/image'

interface CardHeroMadridProps {
  title?: string
  description?: string
  buttonLabel?: string
  images?: Array<{ id: string; dataUrl: string; name: string }>
}

export default function CardHeroMadrid({
  title,
  description,
  buttonLabel,
  images,
}: CardHeroMadridProps) {
  return (
    <div className="mx-auto w-full">
      <Card className="overflow-hidden border-0 shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 flex flex-col justify-center">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-3xl font-bold text-primary">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-6">
              <CardDescription className="text-base text-gray-700 leading-relaxed">
                {description}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-0 text-wrap">
              <Button className="bg-primary hover:bg-accent text-white h-20 text-wrap w-full whitespace-pre-wrap max-w-4xl md:h-10">
                <History className="mr-2 h-4 w-4" />
                {buttonLabel}
              </Button>
            </CardFooter>
          </div>

          <div className="relative h-full rounded-xl overflow-hidden bg-primary/5">
            <Carousel className="w-full h-full">
              <CarouselContent className="h-full md:min-h-[700px] min-h-[400px]">
                {images?.map(
                  (image: { id: string; dataUrl: string; name: string }) => (
                    <CarouselItem key={image.id} className="h-full">
                      <div className="h-full w-full relative">
                        <Image
                          width={600}
                          height={400}
                          src={image.dataUrl}
                          alt={image.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ),
                )}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>
      </Card>
    </div>
  )
}
