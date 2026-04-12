import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Globe, 
  GitFork, 
  ArrowLeft,
  ChevronRight,
  Info,
  Layout,
  Star
} from 'lucide-react'
import { PROJECTS } from '../data/projects'

function ActionButton({ href, label, icon: Icon, primary, accent }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300
        ${primary 
          ? 'bg-white text-black hover:scale-105 active:scale-95' 
          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}
      `}
      style={primary ? { boxShadow: `0 10px 20px -10px ${accent}80` } : {}}
    >
      <Icon size={18} />
      {label}
    </a>
  );
}

function ModalSection({ title, children, icon: Icon }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/50">
          <Icon size={20} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
      </div>
      <div className="pl-11">
        {children}
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = PROJECTS.find(p => p.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
    // Disable body scroll when page is active (optional, but since we want it to feel like a dedicated view)
    document.body.style.overflow = 'auto' 
  }, [id])

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-2xl mb-4">Proyecto no encontrado</h1>
        <Link to="/" className="text-cyan-400 flex items-center gap-2">
          <ArrowLeft size={20} /> Volver al Inicio
        </Link>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#050505] text-white selection:bg-white/20"
    >
      {/* HEADER / NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm font-medium">Volver</span>
        </button>

        <Link to="/" className="text-xl font-black tracking-tighter hover:opacity-70 transition-opacity">
          PORTFOLIO<span className="text-white/20">.</span>
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        {/* Optimized Background Accent */}
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.12] -z-10 rounded-full"
          style={{ background: `radial-gradient(circle, ${project.accent} 0%, transparent 75%)` }}
        />

        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 text-neutral-400">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[0.9]"
          >
            {project.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-neutral-400 leading-relaxed mb-12 max-w-3xl"
          >
            {project.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
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
      </section>

      {/* CONTENT GRID */}
      <section className="pb-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* MAIN CONTENT */}
          <div className="lg:col-span-8">
            <ModalSection title="El Reto" icon={Info}>
              <p className="text-neutral-400 text-lg leading-relaxed italic">
                "{project.reto}"
              </p>
            </ModalSection>

            <ModalSection title="La Solución" icon={Layout}>
              <p className="text-neutral-400 text-lg leading-relaxed">
                {project.solucion}
              </p>
            </ModalSection>

            <ModalSection title="Funciones Destacadas" icon={Star}>
              <ul className="space-y-4">
                {project.funciones.map((func, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white transition-colors" />
                    <span className="text-neutral-300 leading-relaxed">{func}</span>
                  </li>
                ))}
              </ul>
            </ModalSection>
          </div>

          {/* SIDEBAR / GALLERY PREVIEW */}
          <div className="lg:col-span-4 space-y-8">
            {project.category === 'sistemas' && (
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-6 font-mono">Arquitectura Visual</h4>
                <div className="space-y-4">
                   {[1, 2].map(i => (
                     <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 group cursor-pointer relative">
                        <img 
                          src={`https://picsum.photos/seed/${project.id}-${i}/800/600`} 
                          alt="Gallery" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50" 
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                     </div>
                   ))}
                </div>
              </div>
            )}

            <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8">
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-4 font-mono">Tecnologías</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs py-1 px-3 rounded-md bg-white/5 border border-white/5 text-neutral-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="py-20 border-t border-white/5 text-center px-6">
        <h3 className="text-2xl font-bold text-white mb-8 italic">¿Te interesa este proyecto?</h3>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium"
          onClick={() => {
            // Logic to scroll to contact could be added here
          }}
        >
          Hablemos para tu próxima idea <ChevronRight size={16} />
        </Link>
      </footer>
    </motion.div>
  )
}
