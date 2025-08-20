import Link from 'next/link'

const navLinks = [
  {
    label: 'COMUNICA BR',
    href: 'http://www.gov.br/secom/pt-br/acesso-a-informacao/comunicabr',
  },
  {
    label: 'ACESSO À INFORMAÇÃO',
    href: 'http://www.gov.br/acessoainformacao/',
  },
  { label: 'PARTICIPE', href: 'https://www.gov.br/pt-br/participacao-social/' },
  { label: 'LEGISLAÇÃO', href: 'http://www4.planalto.gov.br/legislacao/' },
  {
    label: 'ÓRGÃOS DO GOVERNO',
    href: 'http://www.gov.br/pt-br/orgaos-do-governo',
  },
]

export function NavbarGov() {
  return (
    <nav className="bg-[#0a1f40] text-white" aria-label="Main navigation">
      <div className="container mx-auto flex h-8 items-center justify-between px-4 text-xs">
        <div>
          <Link
            href="https://www.gov.br"
            className="text-lg font-semibold tracking-tighter text-white"
            title="Página inicial gov.br"
          >
            gov.br
          </Link>
        </div>

        <div className="hidden items-center md:flex divide-x divide-gray-500">
          {navLinks.map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3 font-medium tracking-wider text-gray-300 transition-colors hover:text-white hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
