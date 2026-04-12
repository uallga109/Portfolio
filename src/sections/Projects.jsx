import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ExternalLink, 
  CheckCircle2, 
  Bot, 
  Kanban, 
  Heart, 
  Utensils, 
  Code2, 
  Server, 
  Database, 
  Wrench,
  ChevronRight,
  Leaf,
  Zap,
  Sparkles,
  Stethoscope,
  Store
} from 'lucide-react'
import ProjectModal from '../components/ProjectModal'

/* ─────────────────────────────────────────────────────
   DATA: Skills & Projects
   ───────────────────────────────────────────────────── */
const STACK_DATA = [
  {
    id: 'frontend',
    span: 'md:col-span-2',
    color: 'cyan',
    Icon: Code2,
    heading: 'Frontend',
    description: 'Interfaces reactivas, accesibles y performantes con las herramientas del ecosistema moderno.',
    techs: ['React', 'Vite', 'JavaScript', 'HTML', 'CSS', 'Tailwind'],
  },
  {
    id: 'backend',
    span: 'md:col-span-1',
    color: 'violet',
    Icon: Server,
    heading: 'Backend',
    techs: ['Python', 'Java', 'C++', 'C#', 'PHP', 'Node.js'],
  },
  {
    id: 'database',
    span: 'md:col-span-1',
    color: 'emerald',
    Icon: Database,
    heading: 'Bases de Datos & Cloud',
    techs: ['SQL', 'Supabase', 'PostgreSQL', 'Firebase'],
  },
  {
    id: 'tools',
    span: 'md:col-span-2',
    color: 'amber',
    Icon: Wrench,
    heading: 'Herramientas & Workflow',
    description: 'Automatización de flujos de trabajo y entorno de desarrollo de alta eficiencia.',
    techs: ['Git', 'Make', 'VS Code', 'Docker', 'Postman'],
  },
]

const PROJECTS = [
  // CATEGORÍA: PÁGINAS WEB
  {
    id: 'greenplug',
    category: 'web',
    title: 'Greenplug',
    accent: '#22c55e',
    gradient: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)',
    patternColor: 'rgba(34,197,94,0.10)',
    Icon: Leaf,
    tags: ['React', 'Tailwind', 'SEO'],
    description: 'Landing page para soluciones de energía sostenible y puntos de recarga eléctrica.',
    reto: 'Transmitir confianza y sostenibilidad mediante un diseño limpio y moderno.',
    solucion: 'Uso de una paleta de verdes naturales, animaciones suaves y tipografía legible.',
    funciones: ['Formulario de contacto optimizado', 'Sección de servicios interactiva', 'Diseño responsive de alto rendimiento.'],
    githubUrl: '',
    liveUrl: '',
    images: []
  },
  {
    id: 'enertafuture',
    category: 'web',
    title: 'EnertaFuture',
    accent: '#3b82f6',
    gradient: 'linear-gradient(135deg, #082f49 0%, #0c4a6e 50%, #075985 100%)',
    patternColor: 'rgba(59,130,246,0.10)',
    Icon: Zap,
    tags: ['React', 'Framer Motion', 'UI/UX'],
    description: 'Web corporativa para empresa de sistemas de potencia e innovación energética.',
    reto: 'Presentar una imagen tecnológica e innovadora para una empresa del sector energético.',
    solucion: 'Implementación de efectos de partículas y degradados dinámicos con Framer Motion.',
    funciones: ['Catálogo de soluciones inteligentes', 'Arquitectura de información clara', 'Experiencia de usuario premium.'],
    githubUrl: '',
    liveUrl: '',
    images: []
  },
  {
    id: 'eternal-youth',
    category: 'web',
    title: 'Eternal Youth Aguadulce',
    accent: '#f472b6',
    gradient: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #991b1b 100%)',
    patternColor: 'rgba(244,114,182,0.10)',
    Icon: Sparkles,
    tags: ['Next.js', 'Tailwind', 'Cloudinary'],
    description: 'Plataforma para clínica estética y bienestar, con enfoque en la elegancia visual.',
    reto: 'Crear una presencia online que refleje la sofisticación y calidad de sus tratamientos.',
    solucion: 'Diseño minimalista con enfoque en la fotografía de alta calidad y tipografías Serif.',
    funciones: ['Galería de resultados', 'Sistema de reserva de citas integrado', 'Optimización de imágenes cloud.'],
    githubUrl: '',
    liveUrl: '',
    images: []
  },
  {
    id: 'dr-cabeo',
    category: 'web',
    title: 'Dr. Cabeo Cirugía Capilar',
    accent: '#06b6d4',
    gradient: 'linear-gradient(135deg, #083344 0%, #155e75 50%, #164e63 100%)',
    patternColor: 'rgba(6,182,212,0.10)',
    Icon: Stethoscope,
    tags: ['React', 'Tailwind', 'SEO'],
    description: 'Landing médica especializada en injerto capilar con alta tasa de conversión.',
    reto: 'Generar autoridad médica y facilitar la captación de nuevos pacientes potenciales.',
    solucion: 'Estructura enfocada en conversion (CRO), testimonios reales y FAQ detallada.',
    funciones: ['Cargador de fotos para diagnóstico previo', 'Integración con WhatsApp Business', 'Tiempos de carga ultrarrápidos.'],
    githubUrl: '',
    liveUrl: '',
    images: []
  },
  {
    id: 'haro-aguadulce',
    category: 'web',
    title: 'Haro Aguadulce',
    accent: '#fb923c',
    gradient: 'linear-gradient(135deg, #381a0e 0%, #5d2a1a 50%, #7c2d12 100%)',
    patternColor: 'rgba(251,146,60,0.10)',
    Icon: Store,
    tags: ['React', 'Google Maps API', 'Mobile-First'],
    description: 'Portal de información y reservas para un emblemático local de Aguadulce.',
    reto: 'Digitalizar la esencia de un negocio local para mejorar su visibilidad y reservas.',
    solucion: 'Look & feel acogedor con integración de feedback social y localización GPS.',
    funciones: ['Gestión de reservas online', 'Menú digital interactivo', 'Sección de eventos y noticias locales.'],
    githubUrl: '',
    liveUrl: '',
    images: []
  },

  // CATEGORÍA: SISTEMAS Y APLICACIONES
  {
    id: 'crm',
    category: 'sistemas',
    title: 'CRM y Gestor de Flujos',
    accent: '#00f5ff',
    gradient: 'linear-gradient(135deg, #001a20 0%, #013040 50%, #014a5a 100%)',
    patternColor: 'rgba(0,245,255,0.10)',
    Icon: Kanban,
    tags: ['React', 'Supabase', 'Make'],
    description: 'Panel integral para la toma de requisitos con tablero Kanban y seguimiento de progreso estilo paquetería.',
    highlights: ['Seguimiento para cliente', 'Dashboard estadísticas', 'Vista Kanban de proyectos'],
    reto: 'Centralizar la toma de requisitos de clientes (tipo de web, pasarelas de pago, dominios) y mejorar la transparencia del proceso de desarrollo sin tener que enviar correos manuales constantemente.',
    solucion: 'Desarrollo de un panel de gestión integral. Incluye un dashboard con estadísticas, gestión de proyectos mediante vista Kanban (Nuevo, En progreso, En revisión, Completado) e historial.',
    funciones: ['Sistema de tracking en tiempo real para el cliente que muestra el porcentaje de avance dinámicamente.'],
    githubUrl: '',
    liveUrl: '',
    images: []
  },
  {
    id: 'cms-clinica',
    category: 'sistemas',
    title: 'CMS Clínica Cirugía Capilar',
    accent: '#34d399',
    gradient: 'linear-gradient(135deg, #011a0e 0%, #023520 50%, #065f46 100%)',
    patternColor: 'rgba(52,211,153,0.10)',
    Icon: Heart,
    tags: ['PHP', 'SQL', 'CMS'],
    description: 'Sistema interno para automatizar la captación de leads y gestionar publicaciones del blog corporativo.',
    highlights: ['Automatización leads', 'Kanban de contactos', 'CMS de blog a medida'],
    reto: 'Crear un sistema interno para que los administradores de la clínica pudieran gestionar la captación de pacientes (leads) y el contenido de su web de forma unificada.',
    solucion: 'Un dashboard personalizado que automatiza el envío de notificaciones al dueño cuando entra un nuevo contacto. Incluye gestión de formularios y analíticas.',
    funciones: ['Gestor de contenidos (CMS) propio para el blog permitiendo crear, editar y programar publicaciones.'],
    githubUrl: '',
    liveUrl: '',
    images: []
  },
  {
    id: 'restaurante',
    category: 'sistemas',
    title: 'Menú Dinámico & CMS Real-time',
    accent: '#fbbf24',
    gradient: 'linear-gradient(135deg, #1c1000 0%, #3d2500 50%, #78350f 100%)',
    patternColor: 'rgba(251,191,36,0.10)',
    Icon: Utensils,
    tags: ['React', 'Supabase', 'Real-time'],
    description: 'Carta digital para restaurante con edición visual directa (WYSIWYG) y despliegue instantáneo.',
    highlights: ['Edición in-line WYSIWYG', 'Cambios instantáneos', 'Gestión granular stock'],
    reto: 'Un restaurante necesitaba una carta digital que el propio dueño pudiera actualizar a diario sin depender de un programador.',
    solucion: 'Desarrollo de la web pública conectada a un sistema de gestión oculto y seguro con edición visual directa.',
    funciones: ['Sincronización en tiempo real: los cambios se reflejan al instante en las pantallas de los clientes.'],
    githubUrl: '',
    liveUrl: '',
    images: []
  },
  {
    id: 'notebooklm',
    category: 'sistemas',
    title: 'Plataforma Inteligente & RPG',
    accent: '#a78bfa',
    gradient: 'linear-gradient(135deg, #1a0830 0%, #2d1060 50%, #4c1d95 100%)',
    patternColor: 'rgba(167,139,250,0.12)',
    Icon: Bot,
    wip: true,
    tags: ['Python', 'Gemini API', 'RPG'],
    description: 'Entorno de estudio gamificado donde apuntes son analizados por IA para generar batallas RPG.',
    highlights: ['Campañas auto-generadas', 'Combate por turnos', 'Economía in-game'],
    reto: 'Superar las limitaciones de herramientas de IA actuales y combatir la falta de motivación en el estudio.',
    solucion: 'Entorno de estudio donde el usuario sube apuntes y genera material gamificado que alimenta un motor de juego RPG.',
    mecanicas: [
      'Generación de Campañas: 6 nodos secuenciales basados estrictamente en tus apuntes.',
      'Sistema de Combate: Turnos estratégicos con límites de uso para obligar a dominar todos los temas.',
      'Economía: Recompensas en el juego según el desempeño en los tests.',
      'Gestión de Estado: Lógicas de supervivencia local y global para mayor reto.'
    ],
    githubUrl: '',
    liveUrl: '',
    images: []
  },
]

/* ─────────────────────────────────────────────────────
   COMPONENTS
   ───────────────────────────────────────────────────── */

function TabButton({ id, label, active, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`relative px-6 py-2 text-sm font-medium transition-colors duration-300 ${
        active ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
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
      <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10 bg-${skill.color}-500`} 
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

function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group relative cursor-pointer rounded-2xl border border-white/5 bg-gradient-to-br from-neutral-900 to-black overflow-hidden"
    >
      <div className="aspect-video relative overflow-hidden bg-neutral-800">
        <div className="absolute inset-0 flex items-center justify-center text-neutral-600 group-hover:scale-110 transition-transform duration-700">
          <project.Icon size={64} strokeWidth={1} />
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
          <span className="flex items-center gap-2 text-white font-medium text-sm">
            Ver detalles <ExternalLink size={14} />
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] font-bold tracking-widest uppercase py-1 px-2 rounded bg-white/5 text-neutral-400 border border-white/5">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00f5ff] transition-colors">{project.title}</h3>
        <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">{project.description}</p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────
   MAIN SECTION
   ───────────────────────────────────────────────────── */

export default function Projects() {
  const [activeTab, setActiveTab] = useState('web')
  const [selectedProject, setSelectedProject] = useState(null)

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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Proyectos & Skillset</h2>
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
                    onClick={() => setSelectedProject(project)}
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

      {/* Modal Integration */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
