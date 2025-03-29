import Link from "next/link"

export function Navbar() {
  return (
    <div className="bg-[#0a1f40] text-white">
      <div className="container mx-auto flex justify-between items-center px-4 py-1 text-xs">
        <div>
          <Link href="/" className="text-white font-semibold">
            gov.br
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="#" className="hover:underline">
            COMUNICA BR
          </Link>
          <Link href="#" className="hover:underline">
            ACESSO À INFORMAÇÃO
          </Link>
          <Link href="#" className="hover:underline">
            PARTICIPE
          </Link>
          <Link href="#" className="hover:underline">
            LEGISLAÇÃO
          </Link>
          <Link href="#" className="hover:underline">
            ÓRGÃOS DO GOVERNO
          </Link>
        </div>
      </div>
    </div>
  )
}
