import './index.css'
import ScrollProgress from './components/ScrollProgress'
import CustomCursor   from './components/CustomCursor'
import Navbar         from './sections/Navbar'
import Hero           from './sections/Hero'
import Stack          from './sections/Stack'
import Projects       from './sections/Projects'
import Contact        from './sections/Contact'
import Footer         from './sections/Footer'

/* ──────────────────────────────────────────────────────────────
   App — Root component
   Layout: global utilities → fixed overlay → main content
   ────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div id="wrapper">

      {/* ── Global utilities (fixed, above everything) ── */}
      <ScrollProgress />
      <CustomCursor />

      {/* ── Navigation ── */}
      <Navbar />

      {/* ── Main content ── */}
      <main id="main-content">
        <Hero />
        <Stack />
        <Projects />
        <Contact />
      </main>

      {/* ── Footer ── */}
      <Footer />

    </div>
  )
}
