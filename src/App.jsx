import { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

import Loader from './components/Loader';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Education from './sections/Education';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ProjectDetail from './pages/ProjectDetail';

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
      animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
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
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <ScrollProgress />
      
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <Loader key="loader" onComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLoaded && (
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/proyecto/:id" element={<ProjectDetail />} />
          </Routes>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div id="wrapper" className="min-h-screen">
        <CustomCursor />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}
