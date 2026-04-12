import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="sobre-mi" className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text */}
          <div className="flex flex-col gap-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Sobre Mí
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#a3a3a3] text-lg leading-relaxed flex flex-col gap-4"
            >
              <p>
                Soy un desarrollador de software apasionado por la creación de soluciones digitales limpias, funcionales y de alto rendimiento. Mi enfoque se centra en construir aplicaciones que no solo luzcan bien, sino que ofrezcan la mejor experiencia de usuario posible.
              </p>
              <p>
                Me encanta el diseño moderno estructurado y la resolución de problemas lógicos usando tecnologías de vanguardia como React y Python. Siempre estoy en constante aprendizaje, explorando nuevas integraciones y mejorando la calidad del código.
              </p>
            </motion.div>
          </div>

          {/* Right: Circular Photo Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-gray-800 border border-gray-700 shadow-2xl relative overflow-hidden">
              {/* Optional glow or placeholder effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent object-cover" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
