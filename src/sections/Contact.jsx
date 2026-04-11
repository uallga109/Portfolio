import { motion } from 'framer-motion'
import { Mail, GitBranch, Link2 } from 'lucide-react'
import '../styles/contact.css'

const FADE_UP = (delay = 0) => ({
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
  },
})

const SOCIAL_LINKS = [
  { id: 'github',   Icon: GitBranch,   href: 'https://github.com/',   label: 'GitHub'   },
  { id: 'linkedin', Icon: Link2, href: 'https://linkedin.com/', label: 'LinkedIn' },
]

export default function Contact() {
  return (
    <section
      id="contacto"
      className="section contact-section"
      aria-labelledby="contacto-heading"
    >
      <div className="container">
        <div className="contact-inner">

          {/* Label */}
          <motion.p
            className="section-label"
            variants={FADE_UP(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            aria-hidden="true"
          >
            <span className="section-label__dot" />
            Contacto
          </motion.p>

          {/* Heading */}
          <motion.h2
            id="contacto-heading"
            className="contact-heading"
            variants={FADE_UP(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            ¿Tienes un proyecto<br />
            <span className="contact-heading__accent">en mente?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="contact-sub"
            variants={FADE_UP(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            Siempre abierto a nuevas oportunidades, colaboraciones y proyectos
            interesantes. No seas tímido — hablemos.
          </motion.p>

          {/* Email CTA */}
          <motion.a
            id="contact-email-btn"
            href="mailto:luis@example.com"
            className="contact-cta"
            variants={FADE_UP(0.32)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <Mail size={18} strokeWidth={2} aria-hidden="true" />
            Enviar un mensaje
          </motion.a>

          {/* Social links */}
          <motion.div
            className="contact-socials"
            variants={FADE_UP(0.44)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {SOCIAL_LINKS.map(({ id, Icon, href, label }) => (
              <a
                key={id}
                id={`contact-social-${id}`}
                href={href}
                className="social-icon-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={20} strokeWidth={1.75} />
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
