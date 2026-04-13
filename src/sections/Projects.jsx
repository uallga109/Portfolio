import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Code2,
  Server,
  Database,
  Wrench,
} from 'lucide-react'
import { PROJECTS, STACK_DATA } from '../data/projects'

/* ─────────────────────────────────────────────────────
   COMPONENTS
   ───────────────────────────────────────────────────── */

function TabButton({ id, label, active, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`relative px-6 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer ${active ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
        }`}
    >
      {label}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-white/5 rounded-full border border-white/10 -z-10"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  )
}

function SkillCard({ skill }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 ${skill.span}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Glow Effect */}
      <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
        style={{ backgroundColor: skill.color === 'cyan' ? '#00f5ff' : skill.color === 'violet' ? '#a78bfa' : skill.color === 'emerald' ? '#34d399' : '#fbbf24' }} />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-white">
            <skill.Icon size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white">{skill.heading}</h3>
        </div>

        {skill.description && (
          <p className="text-sm text-neutral-400 mb-6 leading-relaxed max-w-md">
            {skill.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {skill.techs.map((tech) => (
            <span key={tech} className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-neutral-300 hover:border-white/20 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function CardCarousel({ images, logoUrl, Icon, title, isHovered, globalTick }) {
  // Use globalTick to derive index. If hovered, it stays on the same index but doesn't "break" the sync beat.
  // Actually, to keep it simple and smooth, we'll just derivation from globalTick.
  const currentIndex = images && images.length > 0 ? globalTick % images.length : 0

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        {logoUrl ? (
          <img
            src={Array.isArray(logoUrl) ? logoUrl[0] : logoUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : Icon ? (
          <Icon size={64} strokeWidth={1} className="text-neutral-600 group-hover:scale-110 transition-transform duration-700" />
        ) : null}
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} slide ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      
      {/* Small Indicators for Card */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                currentIndex === i ? 'bg-white w-3' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, globalTick, onClick }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative cursor-pointer rounded-2xl border border-white/5 bg-gradient-to-br from-neutral-900 to-black overflow-hidden h-full flex flex-col"
    >
      <div className="aspect-video relative overflow-hidden bg-neutral-800">
        <div className="absolute inset-0 flex items-center justify-center text-neutral-600 transition-transform duration-700">
          <CardCarousel 
            images={project.images} 
            logoUrl={project.logoUrl} 
            Icon={project.Icon}
            title={project.title}
            isHovered={isHovered}
            globalTick={globalTick}
          />
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-20">
          <span className="flex items-center gap-2 text-white font-medium text-sm">
            Ver detalles <ExternalLink size={14} />
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] font-bold tracking-widest uppercase py-1 px-2 rounded bg-white/5 text-neutral-400 border border-white/5">
                {tag}
              </span>
            ))}
          </div>
          {project.wip && (
            <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[9px] font-bold text-orange-500 uppercase tracking-wider animate-pulse">
              <span className="w-1 h-1 rounded-full bg-orange-500" />
              Work in Progress
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00f5ff] transition-colors">{project.title}</h3>
        <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed flex-1">{project.description}</p>
      </div>
    </motion.div>
  )
}


/* ─────────────────────────────────────────────────────
   MAIN SECTION
   ───────────────────────────────────────────────────── */

export default function Projects() {
  const [activeTab, setActiveTab] = useState('web')
  const [globalTick, setGlobalTick] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalTick(prev => prev + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const TABS = [
    { id: 'web', label: 'Páginas Web' },
    { id: 'sistemas', label: 'Sistemas y Aplicaciones' },
    { id: 'habilidades', label: 'Habilidades' },
  ]

  const filteredProjects = PROJECTS.filter(p => p.category === activeTab)

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Proyectos & <span className="text-white/20">Skillset</span></h2>
          <div className="flex justify-center">
            <div className="flex items-center p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
              {TABS.map(tab => (
                <TabButton
                  key={tab.id}
                  {...tab}
                  active={activeTab === tab.id}
                  onClick={setActiveTab}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          layout
          className="min-h-[400px]"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'habilidades' ? (
              <motion.div
                key="skills-grid"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {STACK_DATA.map(skill => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`${activeTab}-grid`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    globalTick={globalTick}
                    onClick={() => navigate(`/proyecto/${project.id}`)}
                  />
                ))}
                {filteredProjects.length === 0 && (
                  <div className="col-span-full py-20 text-center text-neutral-500 italic">
                    Próximamente más proyectos...
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
