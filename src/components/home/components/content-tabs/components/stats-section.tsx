'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const controls = useAnimation()
  const [displayCount, setDisplayCount] = useState("0")
  
  const hasPlus = count.endsWith('+')
  const numericValue = parseInt(hasPlus ? count.slice(0, -1) : count)
  
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
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
        setDisplayCount(hasPlus ? formattedCount + '+' : formattedCount)
      }, interval)
      
      return () => clearInterval(timer)
    }
  }, [isInView, numericValue, hasPlus, controls])
  
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

