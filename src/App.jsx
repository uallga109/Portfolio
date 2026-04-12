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
    <div id="wrapper" className="min-h-screen">
      
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
            
            <main id="main-content" className="w-full">
              <Hero />
              <About />
              <Education />

              <Projects />
              <Contact />
              <Footer />
            </main>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
