import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

import Loader from './components/Loader';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';

// Keeping these for future replacement (if they exist)

import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div id="wrapper" className="bg-[#000000] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black bg-fixed min-h-screen text-[#a3a3a3] font-sans selection:bg-white/10 selection:text-white">
      
      {/* GLobal utilities */}
      <CustomCursor />
      <ScrollProgress />
      
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <Loader key="loader" onComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            key="main-layout"
            initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Navbar />
            
            <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <Hero />
              <About />
              <Education />

              <Projects />
              <Contact />
            </main>
            
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
