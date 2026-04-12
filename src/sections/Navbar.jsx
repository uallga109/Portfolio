import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Sobre Mí', href: '#sobre-mi' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto', href: '#contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const smoothScroll = (href) => {
    if (!href) return;
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-[family-name:var(--font-mono)] ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Logo */}
        <a 
          href="#hero"
          onClick={(e) => { e.preventDefault(); smoothScroll('#hero'); }}
          className="text-white font-bold text-lg tracking-wider hover:text-[#00f5ff] transition-colors"
        >
          {'>_'} LUISGARCIA
        </a>

        {/* Links */}
        <ul className="hidden sm:flex items-center gap-8 text-[#a3a3a3] text-sm tracking-widest uppercase">
          {NAV_LINKS.map((item, i) => (
            <li key={`link-${i}`}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScroll(item.href);
                }}
                className="hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

      </div>
    </motion.nav>
  );
}
