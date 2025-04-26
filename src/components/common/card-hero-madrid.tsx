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

export default function CardHeroMadrid() {
  return (
    <div className="mx-auto w-full">
      <Card className="overflow-hidden border-0 shadow-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 flex flex-col justify-center">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-3xl font-bold text-primary">
                O Instituto de Ciência e Tecnologia
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pb-6">
              <CardDescription className="text-base text-gray-700 leading-relaxed">
                Localizado no Campus Universitário da UFMT em Cuiabá, o
                Instituto de Ciência e Tecnologia é referência na formação de
                profissionais da área de tecnologia no estado de Mato Grosso.
              </CardDescription>
            </CardContent>
            <CardFooter className="p-0 text-wrap">
              <Button className="bg-primary hover:bg-accent text-white h-20 text-wrap w-full whitespace-pre-wrap max-w-4xl md:h-10">
                <History className="mr-2 h-4 w-4" />
                Saiba mais sobre a História da FCT
              </Button>
            </CardFooter>
          </div>

          <div className="relative h-full rounded-xl overflow-hidden bg-primary/5">
            <Carousel className="w-full h-full">
              <CarouselContent className="h-full">
                <CarouselItem className="h-full">
                  <div className="h-full w-full relative">
                    <Image
                      width={600}
                      height={400}
                      src="/placeholder.svg?height=400&width=600"
                      alt="Entrada do Instituto"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="h-full">
                  <div className="h-full w-full relative">
                    <Image
                      width={600}
                      height={400}
                      src="/placeholder.svg?height=400&width=600"
                      alt="Vista aérea do Instituto"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem className="h-full">
                  <div className="h-full w-full relative">
                    <Image
                      width={600}
                      height={400}
                      src="/placeholder.svg?height=400&width=600"
                      alt="Caminho de entrada do Instituto"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </CarouselItem>
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
