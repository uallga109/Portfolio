import { useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import '../styles/cursor.css'

const CLICKABLE = 'a, button, [role="button"], .project-card, .bento-card, label, input, textarea, select, [data-hover]'

/**
 * CustomCursor — subtle circle that follows the mouse.
 * Expands and changes color when over clickable elements.
 */
export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)

  // Raw mouse position
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  // Spring-smoothed position
  const x = useSpring(rawX, { stiffness: 900, damping: 55, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 900, damping: 55, mass: 0.5 })

  const onMove = useCallback((e) => {
    rawX.set(e.clientX)
    rawY.set(e.clientY)
  }, [rawX, rawY])

  const onOver = useCallback((e) => {
    setHovering(!!e.target.closest(CLICKABLE))
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [onMove, onOver])

  return (
    <motion.div
      className="custom-cursor"
      aria-hidden="true"
      style={{ x, y }}
      animate={
        hovering
          ? {
              width: 36,
              height: 36,
              background: 'rgba(0,245,255,0.1)',
              borderColor: 'rgba(0,245,255,0.9)',
              borderWidth: '1.5px',
            }
          : {
              width: 12,
              height: 12,
              background: 'rgba(0,245,255,0.65)',
              borderColor: 'rgba(0,245,255,0.85)',
              borderWidth: '1px',
            }
      }
      transition={{ duration: 0.18, ease: 'easeOut' }}
    />
  )
}
