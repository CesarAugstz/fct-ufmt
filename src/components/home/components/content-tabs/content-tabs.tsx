// WARN: verificar se esta usando
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PhotosTabContent } from './components/photos-tab-content'
import { TourTabContent } from './components/tour-tab-content'

export function ContentTabs() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-0">
            Últimas Atualizações
          </h2>

          <Tabs defaultValue="noticias" className="w-full md:w-auto">
            <TabsList className="bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
              <TabsTrigger
                value="noticias"
                className="data-[state=active]:bg-[#003366] data-[state=active]:text-white rounded-md px-4 py-2 transition-all"
              >
                Notícias
              </TabsTrigger>
              <TabsTrigger
                value="fotos"
                className="data-[state=active]:bg-[#003366] data-[state=active]:text-white rounded-md px-4 py-2 transition-all"
              >
                Fotos
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="data-[state=active]:bg-[#003366] data-[state=active]:text-white rounded-md px-4 py-2 transition-all"
              >
                Vídeos
              </TabsTrigger>
              <TabsTrigger
                value="tour"
                className="data-[state=active]:bg-[#003366] data-[state=active]:text-white rounded-md px-4 py-2 transition-all"
              >
                Tour 360°
              </TabsTrigger>
            </TabsList>

            <PhotosTabContent />
            <TourTabContent />
          </Tabs>
        </div>
      </div>
    </div>
  )
}
