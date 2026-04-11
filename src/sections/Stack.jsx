import '../styles/stack.css'

/* ──────────────────────────────────────────────
   Inline SVG icons — minimal & clean
   ────────────────────────────────────────────── */
const IconFrontend = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M13.5 6L10.5 18M7 8.5L3.5 12L7 15.5M17 8.5L20.5 12L17 15.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconBackend = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="3" y="4" width="18" height="5" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <rect x="3" y="10" width="18" height="5" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <rect x="3" y="16" width="18" height="5" rx="2" stroke="currentColor" strokeWidth="1.75"/>
    <circle cx="7" cy="6.5" r="1" fill="currentColor"/>
    <circle cx="7" cy="12.5" r="1" fill="currentColor"/>
    <circle cx="7" cy="18.5" r="1" fill="currentColor"/>
  </svg>
)

const IconDatabase = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="12" cy="6" rx="9" ry="3" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M3 6v5c0 1.657 4.03 3 9 3s9-1.343 9-3V6" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M3 11v5c0 1.657 4.03 3 9 3s9-1.343 9-3v-5" stroke="currentColor" strokeWidth="1.75"/>
  </svg>
)

const IconTools = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ──────────────────────────────────────────────
   Stack data
   ────────────────────────────────────────────── */
const STACK_CARDS = [
  {
    id: 'frontend',
    color: 'cyan',
    Icon: IconFrontend,
    label: 'Interfaz',
    heading: 'Frontend',
    techs: ['React', 'Vite', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'backend',
    color: 'violet',
    Icon: IconBackend,
    label: 'Servidor',
    heading: 'Backend & Core',
    techs: ['Python', 'Java', 'C++', 'C#', 'PHP'],
  },
  {
    id: 'database',
    color: 'emerald',
    Icon: IconDatabase,
    label: 'Datos & Nube',
    heading: 'Base de Datos & Cloud',
    techs: ['SQL', 'Supabase'],
  },
  {
    id: 'tools',
    color: 'amber',
    Icon: IconTools,
    label: 'Productividad',
    heading: 'Herramientas & Auto',
    techs: ['Make', 'VS Code', 'Google Antigravity'],
  },
]

/* ──────────────────────────────────────────────
   StackCard
   ────────────────────────────────────────────── */
function StackCard({ id, color, Icon, label, heading, techs }) {
  return (
    <article
      id={`stack-card-${id}`}
      className="stack-card"
      data-color={color}
      aria-label={`Categoría: ${heading}`}
    >
      {/* Icon */}
      <div className="stack-card__icon-wrap" aria-hidden="true">
        <Icon />
      </div>

      {/* Labels */}
      <p className="stack-card__title">{label}</p>
      <h3 className="stack-card__heading">{heading}</h3>

      {/* Tech badges */}
      <ul className="stack-card__techs" aria-label={`Tecnologías de ${heading}`}>
        {techs.map((tech) => (
          <li key={tech}>
            <span className="tech-badge">
              <span className="tech-badge__dot" aria-hidden="true" />
              {tech}
            </span>
          </li>
        ))}
      </ul>
    </article>
  )
}

/* ──────────────────────────────────────────────
   Stack Section
   ────────────────────────────────────────────── */
export default function Stack() {
  return (
    <section
      id="stack"
      className="section"
      aria-labelledby="stack-heading"
    >
      <div className="container">

        {/* Section header */}
        <header className="section-header">
          <p className="section-label" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
              <circle cx="6" cy="6" r="6"/>
            </svg>
            Habilidades
          </p>
          <h2 id="stack-heading" className="section-title">
            Mi Arsenal Técnico
          </h2>
          <p className="section-subtitle">
            Tecnologías con las que construyo soluciones completas, del frontend al backend.
          </p>
        </header>

        {/* Cards grid */}
        <div className="stack-grid" role="list">
          {STACK_CARDS.map((card) => (
            <StackCard key={card.id} {...card} />
          ))}
        </div>

      </div>
    </section>
  )
}
