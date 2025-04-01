import { Button } from "@/components/ui/button"
import { TabsContent } from "@/components/ui/tabs"
import { PhotoCard } from "./photos/photo-card"

export function PhotosTabContent() {
  return (
    <TabsContent value="fotos" className="mt-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#003366] mb-4">Galeria de Fotos</h3>
        <p className="text-gray-600 mb-6">
          Confira os registros fotográficos dos eventos e atividades da FCT.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <PhotoCard key={item} index={item} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button className="bg-[#003366] hover:bg-[#003366]/90 text-white">Ver mais fotos</Button>
      </div>
    </TabsContent>
  )
}
