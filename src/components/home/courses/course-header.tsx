import { GraduationCap } from 'lucide-react'

export function CourseHeader() {
  return (
    <div className="text-center mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Nossos Cursos</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Conheça nossa grade de cursos superiores, desenvolvidos para formar
            profissionais de excelência em diversas áreas do conhecimento.
          </p>
        </div>
      </div>
    </div>
  )
}
