export function StatsSection() {
  return (
    <div className="bg-[#003366] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">FCT em Números</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Conheça alguns números que representam nossa excelência em ensino, pesquisa e extensão.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem count="2" label="Cursos de Graduação" />
          <StatItem count="1" label="Programa de Mestrado" />
          <StatItem count="30+" label="Docentes" />
          <StatItem count="500+" label="Estudantes" />
        </div>
      </div>
    </div>
  )
}

interface StatItemProps {
  count: string
  label: string
}

function StatItem({ count, label }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold mb-2">{count}</div>
      <div className="text-lg text-white/80">{label}</div>
    </div>
  )
}
