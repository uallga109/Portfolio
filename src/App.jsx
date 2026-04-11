import './index.css'
import Navbar from './sections/Navbar'
import Hero   from './sections/Hero'
import Stack  from './sections/Stack'

/* ──────────────────────────────────────────────────────────────
   App — Root component
   Layout: Navbar (fixed) + main > Hero | Stack | Proyectos | Contacto
   ────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div id="wrapper">

      <Navbar />

      <main id="main-content">

        <Hero />

        <Stack />

        {/* ── Proyectos (próximamente) ── */}
        <section id="proyectos" aria-labelledby="proyectos-heading" className="section">
          <div className="container">
            {/* Projects content — próximamente */}
          </div>
        </section>

        {/* ── Contacto (próximamente) ── */}
        <section id="contacto" aria-labelledby="contacto-heading" className="section">
          <div className="container">
            {/* Contact content — próximamente */}
          </div>
        </section>

      </main>

    </div>
  )
}
