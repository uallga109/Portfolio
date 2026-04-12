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
    <section id="contact" className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">

          {/* Heading */}
          <motion.h2
            id="contacto-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            variants={FADE_UP(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            ¿Tienes un proyecto<br />
            <span className="text-[#00f5ff]">en mente?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-[#a3a3a3] text-lg max-w-xl mx-auto mb-10"
            variants={FADE_UP(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            Siempre abierto a nuevas oportunidades, colaboraciones y proyectos
            interesantes. No seas tímido — hablemos.
          </motion.p>

          {/* Email CTA */}
          <motion.a
            id="contact-email-btn"
            href="mailto:luis@example.com"
            className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium text-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
            variants={FADE_UP(0.32)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={18} strokeWidth={2} aria-hidden="true" />
            Enviar un mensaje
          </motion.a>

          {/* Social links */}
          <motion.div
            className="flex items-center justify-center gap-6 mt-12 text-[#a3a3a3]"
            variants={FADE_UP(0.44)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {SOCIAL_LINKS.map(({ id, Icon, href, label }) => (
              <a
                key={id}
                id={`contact-social-${id}`}
                href={href}
                className="hover:text-white transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={24} strokeWidth={1.5} />
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
