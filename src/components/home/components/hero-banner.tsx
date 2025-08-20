'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface HeroBannerProps {
  title?: string
  subtitle?: string
  buttonLabel?: string
  bannerImage?: string
}

export function HeroBanner({
  title,
  subtitle,
  buttonLabel,
  bannerImage,
}: HeroBannerProps) {
  return (
    <div className="sm:min-h-[80vh] min-h-[60vh] relative bg-gradient-to-r from-primary/95 to-primary text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Image
            src={bannerImage || '/bg.png'}
            alt="Background"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
      <div className="container mx-auto px-4 py-10 md:py-18 relative z-10">
        <div className="max-w-3xl h-[40vh] sm:h-[70vh] flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl mb-6 text-white/90">{subtitle}</p>
          )}
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="bg-primary hover:bg-accent/90 text-white rounded-md px-6 py-3 font-medium transition-all transform hover:scale-105"
            >
              <Link href="/home/courses">{buttonLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
