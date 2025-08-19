'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { commonData } from '@/data/common.data'

export function SiteFooter() {
  return (
    <footer className="bg-gradient-to-r from-[#001428] to-[#002347] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FooterAbout />
          <FooterContact />
          <FooterLinks />
        </div>

        <Separator className="bg-white/20 my-6" />

        <div className="text-center text-sm text-white/70">
          <p>© 2025 FCT - UFMT. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterAbout() {
  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="mr-3">
          <div className="bg-white p-2 rounded-lg">
            <Image
              src="/placeholder.svg?height=50&width=50"
              alt="Logo IC"
              width={50}
              height={50}
              className="rounded"
            />
          </div>
        </div>
        <div className="text-lg font-bold">
          <div>FACULDADE DE</div>
          <div>CIÊNCIA E TECNOLOGIA</div>
        </div>
      </div>
      <p className="text-sm text-white/80 mb-4">
        A FCT da UFMT é referência em ensino, pesquisa e extensão na área de
        Tecnologia da Informação.
      </p>
      <div className="flex space-x-3">
        <SocialButton
          href={commonData.instagram}
          icon={<Instagram className="h-5 w-5" />}
        />
        <SocialButton
          href={commonData.youtube}
          icon={<Youtube className="h-5 w-5" />}
        />
      </div>
    </div>
  )
}

function SocialButton({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-white hover:text-blue-200 hover:bg-blue-900/20 h-9 w-9"
      onClick={() => window.open(href, '_blank')}
    >
      {icon}
    </Button>
  )
}

function FooterContact() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4 flex items-center">
        <MapPin className="h-5 w-5 mr-2" /> Localização
      </h3>
      <p className="text-sm text-white/80 mb-1 flex items-start">
        <span className="mr-2 mt-1">•</span>
        Av. Fernando Corrêa da Costa, nº 2367
      </p>
      <p className="text-sm text-white/80 mb-1 flex items-start">
        <span className="mr-2 mt-1">•</span>
        Bairro Boa Esperança
      </p>
      <p className="text-sm text-white/80 mb-6 flex items-start">
        <span className="mr-2 mt-1">•</span>
        Cuiabá - MT, CEP: 78060-900
      </p>

      <h3 className="text-lg font-bold mb-4 flex items-center">
        <Phone className="h-5 w-5 mr-2" /> Contato
      </h3>
      <p className="text-sm text-white/80 mb-1 flex items-center">
        <Phone className="h-4 w-4 mr-2" /> (65) 3615-8078
      </p>
      <p className="text-sm text-white/80 mb-1 flex items-center">
        <Mail className="h-4 w-4 mr-2" /> diretoria.fct@ufmt.br
      </p>
      <p className="text-sm text-white/80 flex items-center">
        <Clock className="h-4 w-4 mr-2" /> Segunda a Sexta, 8h às 18h
      </p>
    </div>
  )
}

function FooterLinks() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Links Úteis</h3>
      <div className="text-destructive"> ajustar com links reais </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <ul className="text-sm space-y-2">
          <FooterLink href={commonData.portalUfmt} label="Portal da UFMT" />
          <FooterLink href="#" label="Biblioteca Central" />
          <FooterLink href="#" label="Ouvidoria" />
          <FooterLink href="#" label="Mapa do Site" />
        </ul>
        <ul className="text-sm space-y-2">
          <FooterLink href="#" label="Calendário Acadêmico" />
          <FooterLink href="#" label="Editais" />
          <FooterLink href="#" label="Eventos" />
          <FooterLink href="#" label="Notícias" />
        </ul>
      </div>
    </div>
  )
}

interface FooterLinkProps {
  href: string
  label: string
  blank?: boolean
}

function FooterLink({ href, label, blank = true }: FooterLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className="text-white/80 hover:text-white transition-colors flex items-center"
        target={blank ? '_blank' : '_self'}
      >
        <ArrowRight className="h-3 w-3 mr-2" /> {label}
      </Link>
    </li>
  )
}
