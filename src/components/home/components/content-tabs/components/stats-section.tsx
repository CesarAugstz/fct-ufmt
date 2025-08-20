'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { BannerNumber } from '@zenstackhq/runtime/models'

interface StatsSectionProps {
  bannerNumbersTitle?: string
  bannerNumbersSubtitle?: string
  bannerNumbersItems?: BannerNumber[]
}

export function StatsSection({
  bannerNumbersTitle,
  bannerNumbersSubtitle,
  bannerNumbersItems,
}: StatsSectionProps) {
  return (
    <div className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {bannerNumbersTitle}
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {bannerNumbersSubtitle}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {bannerNumbersItems?.map((item, index) => (
            <StatItem
              key={index}
              count={`${item.value}${item.suffix || ''}`}
              label={item.title}
            />
          ))}
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const controls = useAnimation()
  const [displayCount, setDisplayCount] = useState('0')

  const match = count.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)([^0-9]*)$/)
  const prefix = match ? match[1] : ''
  const suffix = match ? match[3] : ''
  const numericValue = match ? parseFloat(match[2]) : 0

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      })

      let startCount = 0
      const duration = 1000
      const interval = 30
      const incrementPerInterval = numericValue / (duration / interval)

      const timer = setInterval(() => {
        startCount += incrementPerInterval
        if (startCount >= numericValue) {
          startCount = numericValue
          clearInterval(timer)
        }

        const formattedCount = Math.floor(startCount).toString()
        setDisplayCount(`${prefix}${formattedCount}${suffix}`)
      }, interval)

      return () => clearInterval(timer)
    }
  }, [isInView, numericValue, controls, prefix, suffix])

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      <div className="text-4xl md:text-5xl font-bold mb-2">{displayCount}</div>
      <div className="text-lg text-white/80">{label}</div>
    </motion.div>
  )
}
