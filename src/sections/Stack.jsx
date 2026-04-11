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
function FloatingIcon({ Icon }) {
  return (
    <div style={{ display: 'inline-flex', color: 'var(--card-accent)' }}>
      <Icon size={26} strokeWidth={1.5} />
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   Stack data
   ───────────────────────────────────────────────────── */
const STACK_DATA = [
  {
    id: 'frontend',
    span: 2,
    color: 'cyan',
    Icon: Code2,
    iconDelay: 0,
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
    heading: 'Backend',
    techs: ['Python', 'Java', 'C++', 'C#', 'PHP'],
  },
  {
    id: 'database',
    span: 1,
    color: 'emerald',
    Icon: Database,
    iconDelay: 0.8,
    heading: 'Bases de Datos & Cloud',
    techs: ['SQL', 'Supabase'],
  },
  {
    id: 'tools',
    span: 2,
    color: 'amber',
    Icon: Wrench,
    iconDelay: 0.2,
    heading: 'Herramientas',
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
                <span className="tech-name">{tech}</span>
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
          viewport={{ once: true, margin: '-50px' }}
          role="list"
        >
          {STACK_DATA.map((card) => (
            <BentoCard key={card.id} {...card} />
          ))}
        </motion.div>

        {/* ── Interactive Terminal ── */}
        <motion.div 
          className="terminal-widget"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="terminal-header">
            <div className="terminal-btns">
              <span className="terminal-btn close" />
              <span className="terminal-btn min" />
              <span className="terminal-btn max" />
            </div>
            <span className="terminal-title">guest@portfolio:~</span>
          </div>
          <div className="terminal-body" style={{ fontFamily: 'var(--font-mono)' }}>
            <p className="cmd-line">
              <span className="prompt">guest@portfolio:~$</span> <span className="typewriter-cmd">fetch --skills</span>
            </p>
            <pre className="json-output">
{`{
  "langs": ["JavaScript", "Python", "Java", "PHP", "SQL", "C#"],
  "frameworks": ["React", "Express", "Vite", "Node.js"],
  "tools": ["Git", "Make", "Supabase", "VS Code"]
}`}
            </pre>
            <p className="cmd-line">
              <span className="prompt">guest@portfolio:~$</span> <span className="cursor-blink">_</span>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
