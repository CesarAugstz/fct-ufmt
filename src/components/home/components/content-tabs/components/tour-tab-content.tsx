import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TabsContent } from "@/components/ui/tabs"

export function TourTabContent() {
  return (
    <TabsContent value="tour" className="mt-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h3 className="text-2xl font-bold text-[#003366] mb-4">Tour Virtual 360°</h3>
          <p className="text-gray-600 mb-6">
            Explore as instalações do Instituto de Computação através do nosso tour virtual interativo.
          </p>

          <div className="aspect-video w-full max-w-4xl mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-8">
            <div className="text-center p-8">
              <Image
                src="/placeholder.svg?height=400&width=800&text=Tour 360°"
                alt="Tour 360"
                width={800}
                height={400}
                className="rounded-lg shadow-md mb-6"
              />
              <Button className="bg-[#003366] hover:bg-[#003366]/90 text-white px-6 py-3 rounded-md font-medium transition-all transform hover:scale-105">
                Iniciar Tour
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <TourInfoCard title="Laboratórios" description="Conheça nossos laboratórios de pesquisa e ensino." />
            <TourInfoCard title="Salas de Aula" description="Visite nossas modernas salas de aula." />
            <TourInfoCard title="Áreas Comuns" description="Explore os espaços de convivência e estudo." />
          </div>
        </div>
      </div>
    </TabsContent>
  )
}

interface TourInfoCardProps {
  title: string
  description: string
}

function TourInfoCard({ title, description }: TourInfoCardProps) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h4 className="font-medium text-[#003366] mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}
