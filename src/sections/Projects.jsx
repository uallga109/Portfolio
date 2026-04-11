import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, CheckCircle2, Bot, Kanban, Heart, Utensils } from 'lucide-react'
import ProjectModal from '../components/ProjectModal'
import '../styles/projects.css'

/* ─────────────────────────────────────────────────────
   Project data — base + extended modal content
   ───────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'crm',
    title: 'CRM y Gestor de Flujos',
    accent: '#00f5ff',
    gradient: 'linear-gradient(135deg, #001a20 0%, #013040 50%, #014a5a 100%)',
    patternColor: 'rgba(0,245,255,0.10)',
    Icon: Kanban,
    tags: ['React', 'Supabase', 'Make'],
    description: 'Panel integral para la toma de requisitos con tablero Kanban y seguimiento de progreso estilo paquetería.',
    highlights: [
      'Seguimiento para cliente',
      'Dashboard estadísticas',
      'Vista Kanban de proyectos',
    ],
    reto: 'Centralizar la toma de requisitos de clientes (tipo de web, pasarelas de pago, dominios) y mejorar la transparencia del proceso de desarrollo sin tener que enviar correos manuales constantemente.',
    solucion: 'Desarrollo de un panel de gestión integral. Incluye un dashboard con estadísticas, gestión de proyectos mediante vista Kanban (Nuevo, En progreso, En revisión, Completado) e historial.',
    funciones: [
      'Función Destacada: Un sistema de "tracking" para el cliente. Genera un enlace único donde el cliente puede ver en tiempo real el porcentaje de avance de su proyecto (al estilo del seguimiento de un paquete), alimentado dinámicamente por la base de datos.',
    ],
    github: 'https://github.com/',
    live: 'https://example.com'
  },
  {
    id: 'cms-clinica',
    title: 'CMS Clínica Cirugía Capilar',
    accent: '#34d399',
    gradient: 'linear-gradient(135deg, #011a0e 0%, #023520 50%, #065f46 100%)',
    patternColor: 'rgba(52,211,153,0.10)',
    Icon: Heart,
    tags: ['PHP', 'SQL', 'HTML/CSS/JS'],
    description: 'Sistema interno para automatizar la captación de leads y gestionar publicaciones del blog corporativo.',
    highlights: [
      'Automatización leads',
      'Kanban de contactos',
      'CMS de blog a medida',
    ],
    reto: 'Crear un sistema interno para que los administradores de la clínica pudieran gestionar la captación de pacientes (leads) y el contenido de su web de forma unificada.',
    solucion: 'Un dashboard personalizado que automatiza el envío de notificaciones al dueño cuando entra un nuevo contacto. Incluye un sistema de gestión de formularios (con vista Kanban para separar nuevos contactos de los ya gestionados) y analíticas de datos.',
    funciones: [
      'Función Destacada: Desarrollo de un gestor de contenidos (CMS) propio para el blog de la clínica, permitiendo crear, editar y programar publicaciones.'
    ],
    github: 'https://github.com/'
  },
  {
    id: 'notebooklm',
    title: 'Plataforma Inteligente & RPG',
    accent: '#a78bfa',
    gradient: 'linear-gradient(135deg, #1a0830 0%, #2d1060 50%, #4c1d95 100%)',
    patternColor: 'rgba(167,139,250,0.12)',
    Icon: Bot,
    wip: true,
    tags: ['React', 'Python', 'Gemini API', 'SQL'],
    description: 'Entorno de estudio gamificado donde apuntes son analizados por IA para generar batallas RPG por turnos.',
    highlights: [
      'Campañas auto-generadas',
      'Combate por turnos',
      'Economía y tiempo',
    ],
    // ── Modal content ──
    reto: 'Superar las limitaciones de herramientas de IA actuales (que procesan todas las fuentes de golpe sin dar control al usuario) y combatir la falta de motivación en el estudio tradicional mediante gamificación profunda.',
    solucion: 'Un entorno de estudio basado en cuadernos donde el usuario puede subir apuntes, chatear con ellos y generar material hiperpersonalizado (tests, flashcards). Todo esto sirve como base para alimentar un motor de juego RPG integrado.',
    mecanicas: [
      'Generación de Campañas: Integración con Gemini API para crear un mapa de 6 nodos bloqueados secuencialmente, basados estrictamente en los apuntes.',
      'Sistema de Combate (Jefe): Combate por turnos (15 HP). 4 tipos de ataques con límite de 5 usos por tipo para obligar a dominar todos los formatos de pregunta.',
      'Economía in-game y Temporizadores: Recompensas en base a vidas conservadas. Tienda para comprar tiempo (~15s) o vidas extra.',
      'Gestión de Estado: Dos lógicas de supervivencia (local con 3 vidas/nivel y global con 5 vidas/campaña).',
    ],
    github: 'https://github.com/'
  },
  {
    id: 'restaurante',
    title: 'Menú Dinámico & CMS Real-time',
    accent: '#fbbf24',
    gradient: 'linear-gradient(135deg, #1c1000 0%, #3d2500 50%, #78350f 100%)',
    patternColor: 'rgba(251,191,36,0.10)',
    Icon: Utensils,
    tags: ['React', 'Supabase Auth/DB'],
    description: 'Carta digital para restaurante con edición visual directa (WYSIWYG) y despliegue instantáneo a clientes.',
    highlights: [
      'Edición in-line WYSIWYG',
      'Cambios instantáneos',
      'Gestión granular stock',
    ],
    reto: 'Un restaurante necesitaba una carta digital que el propio dueño pudiera actualizar a diario o semanalmente, sin depender de un programador y sin tener que aprender a usar paneles de administración complejos.',
    solucion: 'Desarrollo de la web pública del restaurante conectada a un sistema de gestión oculto y seguro (acceso mediante URL específica y autenticación con Supabase Auth).',
    funciones: [
      'Edición In-line (WYSIWYG): El administrador visualiza la misma interfaz que el cliente final, con controles integrados para editar texto y precio en el sitio.',
      'Gestión de Stock y Visibilidad: Permite cambiar el estado de los platos de forma granular (marcar como agotado, ocultar temporalmente o eliminar definitivamente).',
      'Sincronización en Tiempo Real: Gracias a la base de datos de Supabase, los cambios se reflejan instantáneamente en las pantallas o móviles de los clientes sin necesidad de recargar.',
    ],
    github: 'https://github.com/',
    live: 'https://example.com'
  },
]

/* ─────────────────────────────────────────────────────
   ProjectVisual — Abstract gradient placeholder
   ───────────────────────────────────────────────────── */
function ProjectVisual({ gradient, patternColor, accent, Icon }) {
  return (
    <div className="project-visual" style={{ background: gradient }}>
      <div
        className="project-visual__pattern"
        style={{ '--pat-color': patternColor }}
        aria-hidden="true"
      />
      <motion.div
        className="project-visual__blob project-visual__blob--1"
        style={{ '--blob-color': accent }}
        animate={{ y: [-10, 10, -10], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="project-visual__blob project-visual__blob--2"
        style={{ '--blob-color': accent }}
        animate={{ y: [10, -10, 10], rotate: [0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="project-visual__icon"
        style={{ color: accent }}
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <Icon size={42} strokeWidth={1.2} />
      </motion.div>

      {/* Hover overlay — CSS controlled */}
      <div className="project-visual__overlay" aria-hidden="true">
        <span className="btn-details">
          Ver detalles
          <ExternalLink size={14} strokeWidth={2} />
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   Project Card
   ───────────────────────────────────────────────────── */
function ProjectCard({ project, index, onClick }) {
  const fromLeft = index % 2 === 0

  return (
    <motion.article
      id={`project-card-${project.id}`}
      className="project-card"
      style={{ '--accent': project.accent }}
      initial={{ opacity: 0, x: fromLeft ? -55 : 55, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${project.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      data-hover
    >
      <ProjectVisual
        gradient={project.gradient}
        patternColor={project.patternColor}
        accent={project.accent}
        Icon={project.Icon}
      />

      <div className="project-card__content">
        <div className="project-card__tags" aria-label="Tecnologías">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag" style={{ '--accent': project.accent }}>
              {tag}
            </span>
          ))}
          {project.wip && (
            <span className="project-tag project-tag--wip" style={{ '--accent': '#f43f5e' }}>
              🚧 WIP
            </span>
          )}
        </div>

        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        <ul className="project-card__highlights" aria-label="Características destacadas">
          {project.highlights.map((h) => (
            <li key={h} className="highlight-item">
              <CheckCircle2
                size={13}
                strokeWidth={2.2}
                style={{ color: project.accent, flexShrink: 0, marginTop: '2px' }}
                aria-hidden="true"
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

/* ─────────────────────────────────────────────────────
   Projects Section
   ───────────────────────────────────────────────────── */
export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section
      id="proyectos"
      className="section"
      aria-labelledby="proyectos-heading"
    >
      <div className="container">

        <header className="section-header">
          <p className="section-label" aria-hidden="true">
            <span className="section-label__dot" />
            Proyectos
          </p>
          <h2 id="proyectos-heading" className="section-title">
            Lo que he construido
          </h2>
          <p className="section-subtitle">
            Soluciones reales para clientes reales — del diseño al despliegue.
          </p>
        </header>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>

      </div>

      {/* Modal — rendered here, escapes stacking context via fixed positioning */}
      <ProjectModal
        project={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  )
}
