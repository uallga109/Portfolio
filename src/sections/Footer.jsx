import { GitBranch, Link2, Mail } from 'lucide-react'
import '../styles/footer.css'

const NAV_ITEMS = [
  { label: 'Stack',      href: '#stack'     },
  { label: 'Proyectos',  href: '#proyectos' },
  { label: 'Contacto',   href: '#contacto'  },
]

const SOCIAL_ITEMS = [
  { Icon: GitBranch, href: 'https://github.com/',   label: 'GitHub'  },
  { Icon: Link2,     href: 'https://linkedin.com/', label: 'LinkedIn'},
  { Icon: Mail,      href: 'mailto:luis@example.com', label: 'Email' },
]

function smoothScroll(id) {
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: 'smooth' })
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="footer" className="footer" role="contentinfo">

      <div className="container footer__inner">

        {/* ── Top row ── */}
        <div className="footer__top">

          {/* Logo */}
          <a
            href="#hero"
            id="footer-logo"
            className="footer__logo"
            onClick={(e) => { e.preventDefault(); smoothScroll('hero') }}
            aria-label="Luis Garcia — Volver al inicio"
          >
            Luis<span>Garcia</span>
          </a>

          {/* Tagline */}
          <p className="footer__tag">
            Desarrollador Fullstack · Automatización · IA
          </p>

        </div>

        {/* ── Divider ── */}
        <div className="footer__divider" role="separator" aria-hidden="true" />

        {/* ── Bottom row ── */}
        <div className="footer__bottom">

          {/* Copyright */}
          <p className="footer__copy">
            © {year} Luis Garcia — Hecho con <span aria-label="amor">♥</span> y React
          </p>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="footer__nav" role="list">
              {NAV_ITEMS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="footer__link"
                    onClick={(e) => {
                      e.preventDefault()
                      smoothScroll(href.replace('#', ''))
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <div className="footer__socials" aria-label="Redes sociales">
            {SOCIAL_ITEMS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="footer__social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={17} strokeWidth={1.75} />
              </a>
            ))}
          </div>

        </div>

      </div>

    </footer>
  )
}
