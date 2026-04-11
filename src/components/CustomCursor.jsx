import { useEffect, useRef } from 'react'
import '../styles/cursor.css'

const CLICKABLE = 'a, button, [role="button"], .project-card, .bento-card, label, input, textarea, select, [data-hover]'

/**
 * CustomCursor — Vanilla JS optimized cursor to prevent React re-renders.
 */
export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    const onMove = (e) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
    }

    const onOver = (e) => {
      if (e.target.closest(CLICKABLE)) {
        el.classList.add('cursor-hover')
      } else {
        el.classList.remove('cursor-hover')
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
}
