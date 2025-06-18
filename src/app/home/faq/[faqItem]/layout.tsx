import Link from 'next/link'
import { ReactNode } from 'react'

interface FaqItemLayoutProps {
  children: ReactNode
}

export default function Layout({ children }: FaqItemLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container max-w-4xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Link
            href="/home/faq"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 group"
          >
            <svg
              className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">Voltar para FAQ</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
