import { motion } from 'framer-motion';

export default function Education() {
  return (
    <section className="py-20 flex flex-col items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Formación Académica
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl rounded-2xl bg-gradient-to-b from-[#111111] to-[#0a0a0a] border border-[#171717] p-8 md:p-12 text-center shadow-xl relative overflow-hidden group"
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00f5ff]/5 blur-[100px] transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Escuela Superior de Ingeniería de la Universidad de Almería
            </h3>
            <p className="text-xl text-[#00f5ff] font-[family-name:var(--font-mono)]">
              2023 — Presente
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
