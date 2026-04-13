import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Globe, 
  GitFork, 
  ArrowLeft,
  ChevronRight,
  Target,
  Lightbulb,
  Zap,
  CheckCircle2
} from 'lucide-react'
import { PROJECTS } from '../data/projects'
import ImageCarousel from '../components/ImageCarousel'

function ActionButton({ href, label, icon: Icon, primary, accent }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-500
        ${primary 
          ? 'bg-white text-black hover:scale-105 active:scale-95 shadow-2xl' 
          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'}
      `}
      style={primary ? { boxShadow: `0 20px 40px -15px ${accent}60` } : {}}
    >
      <Icon size={18} />
      {label}
    </a>
  );
}

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = PROJECTS.find(p => p.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = 'auto' 
  }, [id])

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-2xl mb-4 font-bold">Proyecto no encontrado</h1>
        <Link to="/" className="text-cyan-400 flex items-center gap-2 hover:underline">
          <ArrowLeft size={20} /> Volver al Inicio
        </Link>
      </div>
    )
  }

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#030303] text-white selection:bg-white/20 font-sans antialiased"
    >
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div 
          className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] opacity-[0.08] blur-[120px] rounded-full"
          style={{ background: project.accent }}
        />
        <div 
          className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] opacity-[0.05] blur-[100px] rounded-full"
          style={{ background: project.accent }}
        />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent backdrop-blur-md">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-white/40 hover:text-white transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/5 active:scale-95"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Atrás</span>
        </button>

        <Link to="/" className="text-2xl font-black tracking-tighter hover:opacity-50 transition-opacity">
          PORTFOLIO<span className="text-white/20">.</span>
        </Link>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 pt-40 pb-32">
        {/* HERO HEADER */}
        <section className="mb-24">
          <motion.div 
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end"
          >
            <div className="lg:col-span-8">
              <motion.div variants={fadeIn} className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-white/5 border border-white/10 text-white/50">
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.h1 
                variants={fadeIn}
                className="text-6xl md:text-[8rem] font-bold tracking-tighter leading-[0.8] mb-12"
              >
                {project.title.split(' ').map((word, i) => (
                  <span key={i} className="block overflow-hidden">
                    <motion.span 
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>

              <motion.p 
                variants={fadeIn}
                transition={{ delay: 0.5 }}
                className="text-2xl md:text-3xl text-neutral-400 leading-tight max-w-3xl font-light"
              >
                {project.description}
              </motion.p>
            </div>

            <motion.div 
              variants={fadeIn}
              transition={{ delay: 0.6 }}
              className="lg:col-span-4 flex justify-start lg:justify-end gap-4"
            >
              <ActionButton 
                primary 
                href={project.liveUrl} 
                label="Visitar Proyecto" 
                icon={Globe} 
                accent={project.accent}
              />
              <ActionButton 
                href={project.githubUrl} 
                label="Código" 
                icon={GitFork} 
              />
            </motion.div>
          </motion.div>
        </section>

        {/* IMAGE CAROUSEL SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-32"
        >
          <ImageCarousel images={project.images} />
        </motion.section>

        {/* CONTENT GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 px-4">
          
          {/* LEFT COLUMN: CORE DETAILS */}
          <div className="lg:col-span-8 space-y-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Target size={24} className="text-white/40" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">El Reto</h2>
              </div>
              <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-4xl font-light italic">
                "{project.reto}"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Lightbulb size={24} className="text-white/40" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">La Solución</h2>
              </div>
              <p className="text-xl text-neutral-300 leading-relaxed max-w-4xl">
                {project.solucion}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Zap size={24} className="text-white/40" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Funcionalidades Clave</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.funciones.map((func, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group">
                    <CheckCircle2 size={20} className="text-white/20 mb-4 group-hover:text-white transition-colors" />
                    <p className="text-neutral-400 group-hover:text-white transition-colors leading-relaxed">{func}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: SIDEBAR */}
          <aside className="lg:col-span-4 space-y-12">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.1 }}
               className="p-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-3xl sticky top-32"
            >
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-8">Tecnologías</h4>
              <div className="flex flex-wrap gap-3 mb-12">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs py-2 px-4 rounded-xl bg-white/5 border border-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-all cursor-default">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-8 border-t border-white/10">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-6">Próximos Pasos</h4>
                <p className="text-sm text-neutral-500 leading-relaxed italic mb-8">
                  "Este es un proyecto vivo, con mejoras contínuas en UX y nuevas funcionalidades de automatización."
                </p>
                <Link 
                  to="/" 
                  className="flex items-center justify-between w-full group py-4 px-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm font-bold">Solicitar presupuesto</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </aside>

        </section>
      </main>

      {/* FOOTER CTA */}
      <footer className="py-40 text-center relative overflow-hidden bg-white/[0.01]">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <h3 className="text-4xl md:text-6xl font-bold text-white mb-12 tracking-tight">Hagamos realidad <br/><span className="text-white/20">tu visión digital.</span></h3>
          <Link 
            to="/" 
            className="inline-flex items-center gap-4 px-12 py-6 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_20px_60px_-15px_rgba(255,255,255,0.3)]"
          >
            Volver al inicio <ArrowLeft size={16} className="rotate-180" />
          </Link>
        </motion.div>
      </footer>
    </motion.div>
  )
}

