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

interface SiteFooterProps {
  collegeData?: {
    name?: string | null
    acronym?: string | null
    description?: string | null
    logo?: {
      id: string
      dataUrl: string
      name: string
    } | null
    locationItems?: string[] | null
    contactItems?: string[] | null
    usefulLinksItems?: unknown
    instagram?: string | null
    youtube?: string | null
  } | null
}

export function SiteFooter({ collegeData }: SiteFooterProps) {
  const hasAboutContent =
    collegeData &&
    (collegeData.logo ||
      collegeData.name ||
      collegeData.description ||
      collegeData.instagram ||
      collegeData.youtube)
  const hasContactContent =
    collegeData &&
    ((collegeData.locationItems?.length || 0) > 0 ||
      (collegeData.contactItems?.length || 0) > 0)

  const usefulLinksItems = Array.isArray(collegeData?.usefulLinksItems)
    ? (collegeData.usefulLinksItems as Array<{
        title: string
        url?: string | null
      }>)
    : []
  const hasLinksContent = usefulLinksItems.length > 0

  const visibleSections = [
    hasAboutContent,
    hasContactContent,
    hasLinksContent,
  ].filter(Boolean).length

  if (visibleSections === 0) {
    return (
      <footer className="bg-gradient-to-r from-primary/97 to-primary text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <Separator className="bg-white/20 my-6" />
          <div className="text-center text-sm text-white/70">
            <p>
              © 2025 {collegeData?.acronym ? `${collegeData.acronym} - ` : ''}
              UFMT. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gradient-to-r from-primary/97 to-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div
          className={`grid grid-cols-1 ${visibleSections === 1 ? 'md:grid-cols-1' : visibleSections === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-8 mb-12`}
        >
          {hasAboutContent && <FooterAbout collegeData={collegeData} />}
          {hasContactContent && <FooterContact collegeData={collegeData} />}
          {hasLinksContent && <FooterLinks collegeData={collegeData} />}
        </div>

        <Separator className="bg-white/20 my-6" />

        <div className="text-center text-sm text-white/70">
          <p>
            © 2025 {collegeData?.acronym ? `${collegeData.acronym} - ` : ''}
            UFMT. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterAbout({
  collegeData,
}: {
  collegeData?: SiteFooterProps['collegeData']
}) {
  if (!collegeData) return null

  return (
    <div>
      {(collegeData.logo || collegeData.name) && (
        <div className="flex items-center mb-6">
          {collegeData.logo && (
            <div className="mr-3">
              <div className="bg-white p-2 rounded-lg">
                <Image
                  src={collegeData.logo.dataUrl}
                  alt={collegeData.logo.name}
                  width={50}
                  height={50}
                  className="rounded"
                />
              </div>
            </div>
          )}
          {collegeData.name && (
            <div className="text-lg font-bold">
              <div>{collegeData.name.split(' ').slice(0, 2).join(' ')}</div>
              <div>{collegeData.name.split(' ').slice(2).join(' ')}</div>
            </div>
          )}
        </div>
      )}
      {collegeData.description && (
        <p className="text-sm text-white/80 mb-4">{collegeData.description}</p>
      )}
      {(collegeData.instagram || collegeData.youtube) && (
        <div className="flex space-x-3">
          {collegeData.instagram && (
            <SocialButton
              href={collegeData.instagram}
              icon={<Instagram className="h-5 w-5" />}
            />
          )}
          {collegeData.youtube && (
            <SocialButton
              href={collegeData.youtube}
              icon={<Youtube className="h-5 w-5" />}
            />
          )}
        </div>
      )}
    </div>
  )
}

function SocialButton({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-white hover:text-primary-foreground hover:bg-primary/20 h-9 w-9"
      onClick={() => window.open(href, '_blank')}
    >
      {icon}
    </Button>
  )
}

function FooterContact({
  collegeData,
}: {
  collegeData?: SiteFooterProps['collegeData']
}) {
  if (!collegeData) return null

  const locationItems = collegeData.locationItems || []
  const contactItems = collegeData.contactItems || []

  if (locationItems.length === 0 && contactItems.length === 0) return null

  return (
    <div>
      {locationItems.length > 0 && (
        <>
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2" /> Localização
          </h3>
          {locationItems.map((item, index) => (
            <p
              key={index}
              className="text-sm text-white/80 mb-1 flex items-start"
            >
              <span className="mr-2 mt-1">•</span>
              {item}
            </p>
          ))}
        </>
      )}

      {contactItems.length > 0 && (
        <>
          <h3
            className={`text-lg font-bold mb-4 flex items-center ${locationItems.length > 0 ? 'mt-6' : ''}`}
          >
            <Phone className="h-5 w-5 mr-2" /> Contato
          </h3>
          {contactItems.map((item, index) => {
            const isPhone = item.includes('(') && item.includes(')')
            const isEmail = item.includes('@')

            const Icon = isPhone ? Phone : isEmail ? Mail : Clock

            return (
              <p
                key={index}
                className="text-sm text-white/80 mb-1 flex items-center"
              >
                <Icon className="h-4 w-4 mr-2" /> {item}
              </p>
            )
          })}
        </>
      )}
    </div>
  )
}

function FooterLinks({
  collegeData,
}: {
  collegeData?: SiteFooterProps['collegeData']
}) {
  const usefulLinksItems = Array.isArray(collegeData?.usefulLinksItems)
    ? (collegeData.usefulLinksItems as Array<{
        title: string
        url?: string | null
      }>)
    : []

  if (usefulLinksItems.length === 0) return null

  const usefulLinks = usefulLinksItems
  const halfLength = Math.ceil(usefulLinks.length / 2)
  const firstColumn = usefulLinks.slice(0, halfLength)
  const secondColumn = usefulLinks.slice(halfLength)

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Links Úteis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <ul className="text-sm space-y-2">
          {firstColumn.map((link, index) => (
            <FooterLink
              key={index}
              href={link.url || '#'}
              label={link.title}
              blank={link.url ? !link.url.startsWith('#') : false}
            />
          ))}
        </ul>
        {secondColumn.length > 0 && (
          <ul className="text-sm space-y-2">
            {secondColumn.map((link, index) => (
              <FooterLink
                key={index}
                href={link.url || '#'}
                label={link.title}
                blank={link.url ? !link.url.startsWith('#') : false}
              />
            ))}
          </ul>
        )}
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
