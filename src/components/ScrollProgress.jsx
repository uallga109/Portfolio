import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * ScrollProgress — thin 2px bar at the top of the viewport
 * that fills with the accent color as the user scrolls.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      id="scroll-progress-bar"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--color-accent)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 200,
        boxShadow: '0 0 8px rgba(0,245,255,0.6), 0 0 20px rgba(0,245,255,0.2)',
      }}
    />
  )
}
