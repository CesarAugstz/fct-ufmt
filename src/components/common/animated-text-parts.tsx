'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

interface AnimatedTextPartsProps {
  textParts: string[]
  className?: string
  textClassName?: string
  duration?: number
}

export default function AnimatedTextParts({
  textParts,
  className = '',
  textClassName = '',
  duration = 1,
}: AnimatedTextPartsProps) {
  if (textParts.length === 0) return null

  const durationEach = duration / textParts.length

  return (
    <div className={`${className}`}>
      <AnimatePresence>
        {textParts.map((part, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: durationEach,
              delay: index * durationEach + 0.1,
            }}
            onAnimationStart={() =>
              console.log('start,', {
                index,
                durationEach,
                delay: index * durationEach,
              })
            }
            className={twMerge(textClassName, 'mr-2')}
            style={{ display: 'inline-block' }}
          >
            {part}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
