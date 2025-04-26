'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-r from-[#001428] to-[#003366] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Image src="/bg.png" alt="Background" fill className="object-cover" />
        </motion.div>
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Formando profissionais e pesquisadores em Computação
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 leading-relaxed">
            Inovação e Conhecimento para Transformar o Futuro.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-primary hover:bg-accent/90 text-white rounded-md px-6 py-3 font-medium transition-all transform hover:scale-105">
              Conheça nossos cursos
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10 rounded-md px-6 py-3 font-medium transition-all"
            >
              Processo seletivo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
