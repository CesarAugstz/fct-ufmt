import { motion } from 'framer-motion'

export function getAnimationOnViewUp(
  index: number,
  axis: 'x' | 'y' = 'y',
  onView: boolean = true,
): Parameters<typeof motion.div>[0] {
  return {
    variants: {
      hidden: { opacity: 0, [axis]: 20 },
      visible: {
        opacity: 1,
        [axis as 'y']: 0,
        transition: {
          delay: index * 0.1,
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        },
      },
    },
    initial: 'hidden',
    [onView ? 'whileInView' : 'animate']: 'visible',
    viewport: { once: true },
  }
}
