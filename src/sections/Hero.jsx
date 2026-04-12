import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const REVEAL_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4
    }
  }
};

const TEXT_REVEAL = {
  hidden: { y: '100%', opacity: 0, filter: 'blur(10px)' },
  visible: { 
    y: '0%', 
    opacity: 1,
    filter: 'blur(0px)',
    transition: { ease: [0.16, 1, 0.3, 1], duration: 1 }
  }
};

const FADE_UP = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { ease: [0.16, 1, 0.3, 1], duration: 0.8 }
  }
};

export default function Hero() {
  const STACK_DATA = [
    { key: 'OS', value: 'Windows / Linux' },
    { key: 'Frontend', value: 'React, Tailwind, Vite' },
    { key: 'Backend', value: 'Python, Node.js' },
    { key: 'Database', value: 'Supabase, PostgreSQL' },
    { key: 'Status', value: 'Active / Coding' }
  ];

  return (
    <section id="hero" className="relative min-h-[100dvh] pt-32 pb-16 flex items-center bg-transparent overflow-hidden selection:bg-white/10 selection:text-white">
      {/* Background static gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] sm:top-[-20%] left-[-10%] w-[40%] h-[50%] bg-[#00f5ff]/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Column: Text & Buttons */}
          <motion.div 
            variants={REVEAL_CONTAINER}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8 max-w-2xl"
          >
            {/* Title (Text Reveal) */}
            <div className="flex flex-col gap-2 font-bold tracking-tighter text-white">
              <div className="overflow-hidden">
                <motion.h1 variants={TEXT_REVEAL} className="text-4xl sm:text-6xl md:text-7xl leading-[1.1]">
                  Transformo
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 variants={TEXT_REVEAL} className="text-4xl sm:text-6xl md:text-7xl leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-neutral-500">
                  problemas reales
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 variants={TEXT_REVEAL} className="text-4xl sm:text-6xl md:text-7xl leading-[1.1]">
                  en soluciones web.
                </motion.h1>
              </div>
            </div>

            {/* Subtitle */}
            <motion.p variants={FADE_UP} className="text-[#a3a3a3] text-lg sm:text-xl max-w-xl leading-relaxed">
              <strong className="text-white font-medium">Estudiante de Ingeniería Informática | Desarrollador Fullstack.</strong><br/>
              Especializado en crear herramientas internas y aplicaciones web que optimizan el trabajo, impulsado por el diseño minimalista y la lógica de sistemas.
            </motion.p>

            {/* Buttons Group */}
            <motion.div variants={FADE_UP} className="flex flex-wrap items-center gap-4 mt-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="group relative flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              >
                Ver proyectos
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-transparent text-white border border-white/20 px-6 py-3 rounded-full font-medium text-sm transition-colors hover:bg-white/5"
              >
                Contacto
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={FADE_UP} className="flex items-center gap-6 mt-6 md:mt-12 text-neutral-500">
              <a href="https://github.com/uallga109" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-300" aria-label="GitHub">
                <GithubIcon />
              </a>
              <a href="https://linkedin.com/in/uallga109" target="_blank" rel="noreferrer" className="hover:text-[#0077b5] transition-colors duration-300" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
              <a href="https://instagram.com/uallga109" target="_blank" rel="noreferrer" className="hover:text-[#E1306C] transition-colors duration-300" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </motion.div>

          </motion.div>

          {/* Right Column: Data Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0 z-10"
          >
            <div className="rounded-xl border border-[#171717] bg-[#0a0a0a]/80 backdrop-blur-sm overflow-hidden shadow-2xl relative">
              
              {/* Terminal Header */}
              <div className="flex items-center px-4 py-3 border-b border-[#171717] bg-[#111111]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="mx-auto select-none font-[family-name:var(--font-mono)] text-[10px] text-neutral-500 uppercase tracking-widest">
                  sys_info_node
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-[family-name:var(--font-mono)] text-sm space-y-4">
                {STACK_DATA.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border-b border-white/5 pb-2 last:border-0 last:pb-0 gap-1 sm:gap-4">
                    <span className="text-[#a3a3a3] capitalize">
                      {idx === 0 ? '$ ' : ''}{item.key}
                    </span>
                    <span className="text-white text-right">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.02)_50%,rgba(255,255,255,0))] bg-[length:100%_4px]" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
