import { motion } from 'framer-motion'
import { Code2, Server, Database, Wrench } from 'lucide-react'
import '../styles/stack.css'

/* ─────────────────────────────────────────────────────
   Framer-motion variants
   ───────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ─────────────────────────────────────────────────────
   Floating icon wrapper
   ───────────────────────────────────────────────────── */
function FloatingIcon({ Icon, delay = 0 }) {
  return (
    <motion.div
      style={{ display: 'inline-flex', color: 'var(--card-accent)' }}
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 3.5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <Icon size={26} strokeWidth={1.5} />
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────
   Stack data
   ───────────────────────────────────────────────────── */
const STACK_DATA = [
  {
    id: 'frontend',
    span: 2,                // wide bento card
    color: 'cyan',
    Icon: Code2,
    iconDelay: 0,
    label: 'Interfaz',
    heading: 'Frontend',
    description: 'Interfaces reactivas, accesibles y performantes con las herramientas del ecosistema moderno.',
    techs: ['React', 'Vite', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'backend',
    span: 1,
    color: 'violet',
    Icon: Server,
    iconDelay: 0.4,
    label: 'Servidor',
    heading: 'Backend & Core',
    techs: ['Python', 'Java', 'C++', 'C#', 'PHP'],
  },
  {
    id: 'database',
    span: 1,
    color: 'emerald',
    Icon: Database,
    iconDelay: 0.8,
    label: 'Datos & Nube',
    heading: 'BD & Cloud',
    techs: ['SQL', 'Supabase'],
  },
  {
    id: 'tools',
    span: 2,                // wide bento card
    color: 'amber',
    Icon: Wrench,
    iconDelay: 0.2,
    label: 'Productividad',
    heading: 'Herramientas & Auto',
    description: 'Automatización de flujos de trabajo y entorno de desarrollo de alta eficiencia.',
    techs: ['Make', 'VS Code', 'Google Antigravity'],
  },
]

/* ─────────────────────────────────────────────────────
   Bento Card
   ───────────────────────────────────────────────────── */
function BentoCard({ id, span, color, Icon, iconDelay, label, heading, description, techs }) {
  const isWide = span === 2
  return (
    <motion.article
      id={`bento-card-${id}`}
      className="bento-card"
      data-color={color}
      data-span={span}
      variants={cardVariants}
      aria-label={`Categoría: ${heading}`}
    >
      <div className={`bento-card__body${isWide ? ' bento-card__body--row' : ''}`}>

        {/* Left / top section */}
        <div className="bento-card__meta">
          {/* Icon wrap */}
          <div className="bento-card__icon-wrap" aria-hidden="true">
            <FloatingIcon Icon={Icon} delay={iconDelay} />
          </div>

          <p className="bento-card__label">{label}</p>
          <h3 className="bento-card__heading">{heading}</h3>

          {/* Description only on wide cards */}
          {isWide && description && (
            <p className="bento-card__desc">{description}</p>
          )}
        </div>

        {/* Right / bottom: tech badges */}
        <ul className="bento-card__techs" aria-label={`Tecnologías de ${heading}`}>
          {techs.map((tech) => (
            <li key={tech}>
              <span className="tech-badge">
                <span className="tech-badge__dot" aria-hidden="true" />
                {tech}
              </span>
            </li>
          ))}
        </ul>

      </div>
    </motion.article>
  )
}

/* ─────────────────────────────────────────────────────
   Stack Section
   ───────────────────────────────────────────────────── */
export default function Stack() {
  return (
    <section
      id="stack"
      className="section"
      aria-labelledby="stack-heading"
    >
      <div className="container">

        {/* Header */}
        <header className="section-header">
          <p className="section-label" aria-hidden="true">
            <span className="section-label__dot" />
            Habilidades
          </p>
          <h2 id="stack-heading" className="section-title">
            Mi Arsenal Técnico
          </h2>
          <p className="section-subtitle">
            Tecnologías con las que construyo soluciones completas, del frontend al backend.
          </p>
        </header>

        {/* Bento Grid with stagger cascade */}
        <motion.div
          className="bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          role="list"
        >
          {STACK_DATA.map((card) => (
            <BentoCard key={card.id} {...card} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
