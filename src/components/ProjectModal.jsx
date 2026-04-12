import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ExternalLink, GitFork, ChevronRight, Globe } from 'lucide-react'
import '../styles/modal.css'

/* ─────────────────────────────────────────────────────
   Reusable components
   ───────────────────────────────────────────────────── */

function ModalSection({ label, heading, icon: Icon, children }) {
  return (
    <div className="flex flex-col gap-4 p-8 rounded-2xl bg-white/[0.02] border border-white/5 transition-colors hover:bg-white/[0.04]">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/5 text-neutral-400">
           {Icon && <Icon size={18} />}
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500 block mb-0.5">
            {label}
          </span>
          <h4 className="text-lg font-semibold text-white leading-tight">
            {heading}
          </h4>
        </div>
      </div>
      <div className="text-neutral-400 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  )
}

function ActionButton({ href, label, icon: Icon, primary, accent }) {
  if (!href) return null;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 transition-all duration-300
        ${primary 
          ? 'bg-white text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.15)]'
          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
        }
      `}
      style={primary ? { boxShadow: `0 0 20px ${accent}44` } : {}}
    >
      {Icon && <Icon size={18} />}
      {label}
    </motion.a>
  );
}

/* ─────────────────────────────────────────────────────
   ProjectModal — Optimized Dedicated Experience
   ───────────────────────────────────────────────────── */

export default function ProjectModal({ project, onClose }) {
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

  if (!project) return null;

  const modalJSX = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden pointer-events-auto">
        {/* Backdrop - Optimized Blur */}
        <motion.div
          className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-[-1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          className="w-full max-w-5xl h-[90vh] bg-neutral-900 border border-white/10 rounded-[32px] overflow-hidden flex flex-col relative shadow-2xl"
          style={{ 
            '--modal-accent': project.accent,
            willChange: 'transform, opacity' 
          }}
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 20 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* FIXED CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[70] w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:rotate-90 transition-all duration-500"
          >
            <X size={20} />
          </button>

          {/* SCROLLABLE AREA */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth custom-scrollbar">
            
            {/* 1. HEADER SECTION */}
            <div className="relative pt-24 pb-16 px-8 md:px-16 overflow-hidden">
              {/* Optimized Background Accents (Less Blur, More Gradient) */}
              <div 
                className="absolute top-0 right-0 w-[400px] h-[400px] blur-[100px] opacity-10 -z-10 rounded-full"
                style={{ background: `radial-gradient(circle, ${project.accent} 0%, transparent 70%)` }}
              />

              {/* Content */}
              <div className="max-w-3xl">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/5 text-neutral-400">
                      {tag}
                    </span>
                  ))}
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
                >
                  {project.title}
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-10 max-w-2xl"
                >
                  {project.description}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex flex-wrap gap-4"
                >
                  <ActionButton 
                    primary 
                    href={project.liveUrl} 
                    label="Visitar Web" 
                    icon={Globe} 
                    accent={project.accent}
                  />
                  <ActionButton 
                    href={project.githubUrl} 
                    label="Ver Código" 
                    icon={GitFork} 
                  />
                </motion.div>
              </div>
            </div>

            {/* 2. CASE STUDY BODY */}
            <div className="px-8 md:px-16 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
               <div className="lg:col-span-2 flex flex-col gap-8">
                  <ModalSection label="El Reto" heading="El problema a resolver" icon={ChevronRight}>
                    <p>{project.reto}</p>
                  </ModalSection>

                  <ModalSection label="La Solución" heading="Cómo lo resolví" icon={ChevronRight}>
                    <p>{project.solucion}</p>
                  </ModalSection>
               </div>

               <div className="flex flex-col gap-8">
                  {project.funciones && project.funciones.length > 0 && (
                    <ModalSection label="Destacado" heading="Funciones clave" icon={ChevronRight}>
                      <ul className="flex flex-col gap-3">
                        {project.funciones.map((f, i) => (
                          <li key={i} className="flex gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: project.accent }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </ModalSection>
                  )}

                  {project.mecanicas && (
                    <ModalSection label="Core" heading="Mecánicas de Juego" icon={ChevronRight}>
                      <ul className="flex flex-col gap-3 italic">
                        {project.mecanicas.map((m, i) => (
                          <li key={i} className="text-sm border-l border-white/10 pl-4">{m}</li>
                        ))}
                      </ul>
                    </ModalSection>
                  )}
               </div>
            </div>

            {/* 3. GALLERY (Only for Sistemas) */}
            {project.category === 'sistemas' && (
              <div className="px-8 md:px-16 pb-32 border-t border-white/5 pt-24 bg-white/[0.01]">
                <div className="max-w-4xl mx-auto space-y-32">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">Inmersión en el Sistema</h3>
                    <p className="text-neutral-500 max-w-xl mx-auto">
                      Una mirada profunda a la arquitectura y los flujos de trabajo que hacen que esta plataforma sea única.
                    </p>
                  </div>

                  <div className="space-y-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                      <div className="aspect-video bg-neutral-800 rounded-2xl border border-white/10 flex items-center justify-center group overflow-hidden shadow-xl">
                         <img 
                            src={`https://picsum.photos/seed/${project.id}-1/800/600`} 
                            alt="Preview del sistema" 
                            className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700" 
                            loading="lazy"
                            decoding="async"
                          />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-4">Gestión Eficiente</h4>
                        <p className="text-neutral-400 leading-relaxed">
                          El sistema permite una visualización en tiempo real de todos los procesos críticos, asegurando que la información fluya sin fricciones entre los diferentes módulos.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                      <div className="order-2 md:order-1">
                        <h4 className="text-xl font-bold text-white mb-4">Arquitectura Robusta</h4>
                        <p className="text-neutral-400 leading-relaxed">
                          Construido con las últimas tecnologías, garantizando escalabilidad y un rendimiento óptimo incluso bajo cargas de trabajo intensas.
                        </p>
                      </div>
                      <div className="aspect-video bg-neutral-800 rounded-2xl border border-white/10 flex items-center justify-center order-1 md:order-2 group overflow-hidden shadow-xl">
                         <img 
                            src={`https://picsum.photos/seed/${project.id}-2/800/600`} 
                            alt="Arquitectura del sistema" 
                            className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700" 
                            loading="lazy"
                            decoding="async"
                          />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalJSX, document.body);
}
