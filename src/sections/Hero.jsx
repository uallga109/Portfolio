import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import '../styles/hero.css'

/* ─────────────────────────────────────────────────────
   Animation variants
   ───────────────────────────────────────────────────── */

// Text reveal: slides up from beneath overflow-hidden parent
const REVEAL = (delay = 0) => ({
  hidden: { y: '108%' },
  visible: {
    y: 0,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

// Fade + blur-in for secondary elements
const FADE_UP = (delay = 0) => ({
  hidden: { opacity: 0, y: 24, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

/* ─────────────────────────────────────────────────────
   Floating ambient orb
   ───────────────────────────────────────────────────── */
function FloatingOrb({ size, left, top, color, yOffset, duration, delay }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        left,
        top,
        borderRadius: '50%',
        background: color,
        filter: 'blur(80px)',
        pointerEvents: 'none',
        willChange: 'transform',
      }}
      animate={{ y: [0, yOffset, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/* ─────────────────────────────────────────────────────
   Hero
   ───────────────────────────────────────────────────── */
export default function Hero() {
  const heroRef = useRef(null)

  // Mouse-tracking values
  const rawX = useMotionValue(0.5)
  const rawY = useMotionValue(0.5)
  const x = useSpring(rawX, { damping: 38, stiffness: 52, mass: 1.2 })
  const y = useSpring(rawY, { damping: 38, stiffness: 52, mass: 1.2 })

  // Build gradient string reactively
  const gradientBg = useTransform([x, y], ([xv, yv]) =>
    `radial-gradient(ellipse 68% 52% at ${xv * 100}% ${yv * 100}%, rgba(0,245,255,0.075) 0%, transparent 60%)`
  )

  const handleMouseMove = useCallback(
    (e) => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (!rect) return
      rawX.set((e.clientX - rect.left) / rect.width)
      rawY.set((e.clientY - rect.top) / rect.height)
    },
    [rawX, rawY]
  )

  const handleMouseLeave = useCallback(() => {
    rawX.set(0.5)
    rawY.set(0.5)
  }, [rawX, rawY])

  const handleCTA = (e) => {
    e.preventDefault()
    const el = document.getElementById('proyectos')
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-labelledby="hero-heading"
    >
      {/* ── Mouse-tracking radial gradient ── */}
      <motion.div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, background: gradientBg, pointerEvents: 'none' }}
      />

      {/* ── Static ambient gradients ── */}
      <div className="hero__bg" aria-hidden="true" />

      {/* ── Floating ambient orbs ── */}
      <FloatingOrb size={520} left="-8%"  top="-8%"  color="rgba(0,245,255,0.045)"   yOffset={-35} duration={9}  delay={0} />
      <FloatingOrb size={380} left="72%"  top="35%"  color="rgba(99,102,241,0.055)"  yOffset={28}  duration={11} delay={3} />
      <FloatingOrb size={300} left="28%"  top="72%"  color="rgba(0,245,255,0.035)"   yOffset={-22} duration={13} delay={1.5} />

      {/* ── Grid dot pattern ── */}
      <div className="hero__dots" aria-hidden="true" />

      <div className="container">
        <div className="hero__content">

          {/* ── Badge ── */}
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            role="text"
          >
            <motion.span
              className="hero__badge-dot"
              aria-hidden="true"
              animate={{ scale: [1, 1.6, 1], opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            Disponible para nuevos proyectos
          </motion.div>

          {/* ── H1 — Cinematic line reveal ── */}
          <h1 id="hero-heading" className="hero__heading" aria-label="Transformo problemas reales en soluciones web.">

            {/* Line 1 */}
            <span className="reveal-line">
              <motion.span
                style={{ display: 'block' }}
                variants={REVEAL(0.12)}
                initial="hidden"
                animate="visible"
              >
                Transformo problemas
              </motion.span>
            </span>

            {/* Line 2 */}
            <span className="reveal-line">
              <motion.span
                style={{ display: 'block' }}
                variants={REVEAL(0.25)}
                initial="hidden"
                animate="visible"
              >
                reales en{' '}
                <span className="highlight">soluciones web.</span>
              </motion.span>
            </span>

          </h1>

          {/* ── Subtitle — Staggered fade-blur ── */}
          <motion.p
            className="hero__sub"
            variants={FADE_UP(0.5)}
            initial="hidden"
            animate="visible"
          >
            Soy estudiante de Ingeniería Informática especializado en desarrollo{' '}
            <strong className="text-strong">Fullstack</strong>
            {', '}automatización de flujos de trabajo e integración de{' '}
            <strong className="text-strong">IA</strong>.
          </motion.p>

          {/* ── CTA Button — Pulse + scale hover ── */}
          <motion.div
            variants={FADE_UP(0.68)}
            initial="hidden"
            animate="visible"
            className="hero__cta"
          >
            <motion.a
              id="hero-cta-button"
              href="#proyectos"
              className="btn-primary"
              onClick={handleCTA}
              role="button"
              // Continuous pulse on box-shadow
              animate={{
                boxShadow: [
                  '0 0 18px rgba(0,245,255,0.20), 0 0 55px rgba(0,245,255,0.07), inset 0 1px 0 rgba(255,255,255,0.20)',
                  '0 0 32px rgba(0,245,255,0.42), 0 0 90px rgba(0,245,255,0.16), inset 0 1px 0 rgba(255,255,255,0.25)',
                  '0 0 18px rgba(0,245,255,0.20), 0 0 55px rgba(0,245,255,0.07), inset 0 1px 0 rgba(255,255,255,0.20)',
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.055, y: -3 }}
              whileTap={{ scale: 0.97, y: 0 }}
            >
              Ver mis proyectos
              <motion.span
                className="btn-arrow"
                aria-hidden="true"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <ArrowRight size={16} strokeWidth={2} />
              </motion.span>
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
