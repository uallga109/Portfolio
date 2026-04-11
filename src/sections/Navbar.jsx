import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Stack',     id: 'stack'     },
  { label: 'Proyectos', id: 'proyectos' },
  { label: 'Contacto',  id: 'contacto'  },
]

function smoothScroll(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 64
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      id="navbar"
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      aria-label="Navegación principal"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container navbar__inner">

        {/* Logo */}
        <a
          id="navbar-logo"
          href="#hero"
          className="navbar__logo"
          onClick={(e) => { e.preventDefault(); smoothScroll('hero') }}
          aria-label="Luis Garcia — ir al inicio"
        >
          Luis<span>Garcia</span>
        </a>

        {/* Links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map(({ label, id }, i) => (
            <motion.li
              key={id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
            >
              <a
                id={`nav-link-${id}`}
                href={`#${id}`}
                className="navbar__link"
                onClick={(e) => { e.preventDefault(); smoothScroll(id) }}
              >
                {label}
              </a>
            </motion.li>
          ))}
        </ul>

      </div>
    </motion.nav>
  )
}
