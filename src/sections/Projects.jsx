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
    id: 'notebooklm',
    title: 'NotebookLM RPG AI',
    accent: '#a78bfa',
    gradient: 'linear-gradient(135deg, #1a0830 0%, #2d1060 50%, #4c1d95 100%)',
    patternColor: 'rgba(167,139,250,0.12)',
    Icon: Bot,
    tags: ['Gemini API', 'Python', 'AI/ML'],
    description: 'Plataforma de estudio gamificada que transforma documentos en sesiones de combate interactivas impulsadas por IA.',
    highlights: [
      'Modo Combate Pokémon con 6 niveles de dificultad',
      'Control total sobre las fuentes de estudio',
      'Generación dinámica con Gemini API',
    ],
    // ── Modal content ──
    reto: 'Convertir el estudio pasivo en una experiencia activa y motivadora usando IA. El mayor desafío fue diseñar un sistema de gamificación coherente que se adaptara dinámicamente a cualquier tipo de documento o fuente de conocimiento.',
    solucion: 'Una plataforma que utiliza Gemini API para analizar en tiempo real los documentos del estudiante y generar preguntas de combate personalizadas. El sistema adapta la dificultad de las preguntas automáticamente según el nivel del jugador y el contexto del material.',
    funciones: [
      'Integración nativa con Gemini API para análisis semántico',
      'Soporte para PDFs, URLs, texto libre y documentos de texto',
      'Motor de generación de preguntas contextual y adaptativo',
      'Sistema de progresión con 6 niveles de dificultad',
      'Panel de estadísticas con progreso histórico del estudiante',
      'Modo multijugador asíncrono (en desarrollo)',
    ],
    mecanicas: [
      'Sistema de 6 niveles: Novato, Aprendiz, Intermedio, Avanzado, Experto y Maestro',
      '3 vidas por sesión de combate — cada error penaliza',
      'Preguntas por turnos con contador de tiempo dinámico',
      'Combo multiplier por rachas de respuestas correctas',
      'Sistema de XP acumulable entre sesiones',
      'Jefes de fase con preguntas de síntesis al finalizar cada nivel',
    ],
  },
  {
    id: 'crm',
    title: 'CRM & Workflow Tracker',
    accent: '#00f5ff',
    gradient: 'linear-gradient(135deg, #001a20 0%, #013040 50%, #014a5a 100%)',
    patternColor: 'rgba(0,245,255,0.10)',
    Icon: Kanban,
    tags: ['React', 'Supabase', 'Kanban'],
    description: 'Sistema de seguimiento de proyectos con interfaz estilo tracking de paquetería y vista Kanban integrada.',
    highlights: [
      'Seguimiento dinámico en tiempo real',
      'Vista Kanban para gestión de estados',
      'Dashboard de métricas y analytics',
    ],
    reto: 'El cliente necesitaba una plataforma propia para gestionar múltiples proyectos web con visibilidad total para sus clientes finales, sin depender de herramientas genéricas como Trello o Notion que no se adaptaban a su flujo de trabajo.',
    solucion: 'Un CRM a medida con sistema de tracking visual estilo seguimiento de paquetería, donde el cliente puede ver el estado exacto de su proyecto en cada fase. Integra Supabase Realtime para sincronización instantánea y una vista Kanban personalizable.',
    funciones: [
      'Vista de tracking estilo paquetería para clientes',
      'Tablero Kanban drag-and-drop con estados personalizables',
      'Dashboard de métricas y KPIs en tiempo real',
      'Sistema de notificaciones automáticas al cambiar de fase',
      'Historial de cambios con timestamps auditables',
      'Panel de administración multi-proyecto',
    ],
  },
  {
    id: 'cms-clinica',
    title: 'CMS Clínica Capilar',
    accent: '#34d399',
    gradient: 'linear-gradient(135deg, #011a0e 0%, #023520 50%, #065f46 100%)',
    patternColor: 'rgba(52,211,153,0.10)',
    Icon: Heart,
    tags: ['React', 'Supabase', 'Automation'],
    description: 'Panel de administración completo para clínica con gestión de leads, automatizaciones y blog integrado.',
    highlights: [
      'Gestión de leads con funnel de conversión',
      'Notificaciones automáticas personalizadas',
      'Programador de posts del blog integrado',
    ],
    reto: 'La clínica capilar necesitaba centralizar la gestión de leads, el blog corporativo y las comunicaciones con clientes en una única herramienta manejable por personal sin conocimientos técnicos, eliminando dependencias de terceros.',
    solucion: 'Un CMS intuitivo construido con React y Supabase que unifica todas las operaciones en un panel de admin simplificado. Incluye automatizaciones de email/WhatsApp mediante Make y un editor de blog WYSIWYG con publicación programada.',
    funciones: [
      'Funnel de leads con etapas y seguimiento de conversión',
      'Notificaciones automáticas via Make (email y WhatsApp)',
      'Editor de blog WYSIWYG con programador de publicaciones',
      'Galería de fotos del antes/después con gestión de categorías',
      'Sistema de citas online integrado',
      'Dashboard de rendimiento y métricas de captación',
    ],
  },
  {
    id: 'restaurante',
    title: 'Menú Real-time Restaurante',
    accent: '#fbbf24',
    gradient: 'linear-gradient(135deg, #1c1000 0%, #3d2500 50%, #78350f 100%)',
    patternColor: 'rgba(251,191,36,0.10)',
    Icon: Utensils,
    tags: ['React', 'Supabase', 'Real-time'],
    description: 'Menú digital con edición in-line y sincronización instantánea. Lo que el admin edita, el cliente lo ve al momento.',
    highlights: [
      'Edición "In-line" — lo que ves es lo que editas',
      'Actualización instantánea para clientes',
      'Panel admin con gestión de disponibilidad',
    ],
    reto: 'El restaurante quería un menú digital que su equipo pudiera actualizar en segundos sin depender de ningún técnico, sin formularios complejos ni sistemas de CMS genéricos. La actualización debía verse reflejada al instante en las tablets de los clientes.',
    solucion: 'Interfaz de edición in-line directamente sobre el menú visible: el camarero toca cualquier plato y edita el nombre, precio o descripción en su lugar. Sincronizado via Supabase Realtime, el cambio aparece en todos los dispositivos conectados en menos de 500ms.',
    funciones: [
      'Edición in-line WYSIWYG sobre el menú (sin formularios)',
      'Sincronización Realtime < 500ms via Supabase',
      'Marcado de platos agotados con un solo tap',
      'Galería de fotos por plato con subida rápida',
      'Separación por categorías y carta del día',
      'Modo pantalla completa optimizado para tablets de mesa',
    ],
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
