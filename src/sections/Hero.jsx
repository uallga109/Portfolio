import { motion } from 'framer-motion'
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
   Hero
   ───────────────────────────────────────────────────── */
export default function Hero() {

  const handleCTA = (e) => {
    e.preventDefault()
    const el = document.getElementById('proyectos')
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="hero"
      aria-labelledby="hero-heading"
    >
      {/* ── Static ambient gradients ── */}
      <div className="hero__bg" aria-hidden="true" />
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 68% 52% at 50% 50%, rgba(0,245,255,0.075) 0%, transparent 60%)', pointerEvents: 'none' }}
      />

      {/* ── Grid dot pattern ── */}
      <div className="hero__dots" aria-hidden="true" />

      {/* ── Floating status badge — top-right corner ── */}
      <motion.div
        className="hero__status"
        aria-label="Estado: Disponible para nuevos retos"
        initial={{ opacity: 0, x: 20, y: -8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="hero__status-ping" aria-hidden="true">
          <span className="ping-ring" />
          <span className="ping-core" />
        </span>
        Disponible para nuevos retos
      </motion.div>

      <div className="container">
        <div className="hero__content">

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
            <strong className="text-strong">Estudiante de Ingeniería Informática | Desarrollador Fullstack</strong><br />
            Especializado en crear herramientas internas y aplicaciones web que optimizan el trabajo, con gran pasión por resolver problemas lógicos e integrar soluciones de IA.
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
