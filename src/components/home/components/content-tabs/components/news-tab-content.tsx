// WARN: verificar se esta usando
import Image from "next/image"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TabsContent } from "@/components/ui/tabs"
import { FeaturedNewsCard } from "./news/featured-news-card"
import { NewsCard } from "./news/news-card"
import { RecentNewsCard } from "./news/recent-news-card"

export function NewsTabContent() {
  return (
    <TabsContent value="noticias" className="mt-6 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <FeaturedNewsCard 
          title="INSCRIÇÕES PARA A SEGUNDA TURMA DO MESTRADO EM COMPUTAÇÃO APLICADA!"
          content="A Coordenação do Programa de Pós-graduação em Computação Aplicada da Universidade Federal de Mato Grosso informa que estão abertas as inscrições para o processo seletivo da segunda turma do curso de Mestrado."
        />

        <div className="space-y-6">
          <NewsCard
            title="Edital 01/IC/2025 de Processo Seletivo Simplificado"
            badge="Editais"
          />
          <NewsCard
            title="Eleições para os Cargos do IC"
            badge="Eleições"
          />
        </div>
      </div>

      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#003366]">Notícias Recentes</h3>
          <Button variant="link" className="text-[#0088cc] hover:text-[#0088cc]/80 group">
            Ver todas <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <RecentNewsCard key={item} index={item} />
          ))}
        </div>
      </div>
    </TabsContent>
  )
}
