import Link from "next/link"
import { GraduationCap, BookOpen, Calendar, Users } from "lucide-react"

export function QuickLinks() {
  return (
    <div className="bg-white py-8 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickLink icon={<GraduationCap className="h-6 w-6 text-[#003366]" />} label="Graduação" href="#" />
          <QuickLink icon={<BookOpen className="h-6 w-6 text-[#003366]" />} label="Pós-Graduação" href="#" />
          <QuickLink icon={<Calendar className="h-6 w-6 text-[#003366]" />} label="Calendário" href="#" />
          <QuickLink icon={<Users className="h-6 w-6 text-[#003366]" />} label="Docentes" href="#" />
        </div>
      </div>
    </div>
  )
}

interface QuickLinkProps {
  icon: React.ReactNode
  label: string
  href: string
}

function QuickLink({ icon, label, href }: QuickLinkProps) {
  return (
    <Link href={href} className="flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-colors group">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
        {icon}
      </div>
      <span className="text-center font-medium text-gray-800">{label}</span>
    </Link>
  )
}
