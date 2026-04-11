import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ExternalLink, GitFork } from 'lucide-react'
import '../styles/modal.css'

/* ─────────────────────────────────────────────────────
   Modal sections content renderer
   ───────────────────────────────────────────────────── */
function ModalSection({ label, heading, children }) {
  return (
    <div className="modal-section">
      <p className="modal-section__label">{label}</p>
      <h4>{heading}</h4>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   ProjectModal — AnimatePresence scale-up entry
   ───────────────────────────────────────────────────── */
export default function ProjectModal({ project, onClose }) {
  // Lock body scroll and Escape key to close
  useEffect(() => {
    if (!project) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            className="modal-backdrop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* ── Scroll wrapper ── */}
          <div className="modal-scroll" role="dialog" aria-modal="true" aria-label={project.title}>

            {/* ── Modal box — scale-up entry ── */}
            <motion.div
              className="modal-box"
              initial={{ opacity: 0, scale: 0.86, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ '--modal-accent': project.accent }}
              onClick={(e) => e.stopPropagation()}
            >

              {/* ── Visual header ── */}
              <div className="modal-visual" style={{ background: project.gradient }}>
                <div
                  className="modal-visual__pattern"
                  style={{ '--pat-color': project.patternColor }}
                  aria-hidden="true"
                />
                <div className="modal-visual__icon" style={{ color: project.accent }}>
                  <project.Icon size={52} strokeWidth={1.1} />
                </div>

                {/* Close button */}
                <button
                  id="modal-close-btn"
                  className="modal-close"
                  onClick={onClose}
                  aria-label="Cerrar modal"
                >
                  <X size={16} strokeWidth={2} />
                </button>
              </div>

              {/* ── Main content ── */}
              <div className="modal-content">

                {/* Tags */}
                <div className="modal-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag" style={{ '--accent': project.accent }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title + description */}
                <div>
                  <h2 className="modal-title">{project.title}</h2>
                  <p className="modal-desc" style={{ marginTop: '0.6rem' }}>{project.description}</p>
                </div>

                <hr className="modal-divider" />

                {/* Three sections: Reto, Solución, Funciones */}
                <div className="modal-sections">

                  <ModalSection label="El Reto" heading="El problema a resolver">
                    <p>{project.reto}</p>
                  </ModalSection>

                  <ModalSection label="La Solución" heading="Cómo lo resolví">
                    <p>{project.solucion}</p>
                  </ModalSection>

                  {project.funciones && project.funciones.length > 0 && (
                    <ModalSection label="Funciones Destacadas" heading="Características principales">
                      <ul className="modal-list" role="list">
                        {project.funciones.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </ModalSection>
                  )}

                  {/* Game mechanics — only for NotebookLM */}
                  {project.mecanicas && (
                    <ModalSection label="Mecánicas de Juego" heading="Sistema de combate">
                      <ul className="modal-list modal-list--mechanic" role="list">
                        {project.mecanicas.map((m) => (
                          <li key={m}>{m}</li>
                        ))}
                      </ul>
                    </ModalSection>
                  )}
                  
                </div>

                {/* ── Action Links ── */}
                {(project.github || project.live) && (
                  <div className="modal-actions" style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.8rem 1.6rem', fontSize: '0.88rem' }}>
                        Ver en vivo <ExternalLink size={16} />
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '0.8rem 1.6rem', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', borderRadius: '9px', transition: 'border-color 0.3s' }} onMouseEnter={(e) => e.target.style.borderColor = 'var(--modal-accent)'} onMouseLeave={(e) => e.target.style.borderColor = 'var(--color-border)'}>
                        <GitFork size={16} /> Repositorio
                      </a>
                    )}
                  </div>
                )}

              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
