
import React from 'react';
import { motion } from 'framer-motion';
import { BoxSelect } from 'lucide-react';

interface AugmentedRealityProps {
  onStartAR: () => void;
}

const AugmentedReality: React.FC<AugmentedRealityProps> = ({ onStartAR }) => {
  return (
    <section className="py-24 md:py-32 bg-[#FBFBFB] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Columna Izquierda: Texto y CTA con Subrayado */}
          <div className="w-full lg:w-5/12 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Título editorial ahora dentro del bloque izquierdo */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase text-brand-text leading-[1.3] mb-8"
              >
                IMAGINA TU ESPACIO,<br />
                <span className="italic text-brand-dark-green/40">ANTES DE CREARLO.</span>
              </motion.h2>

              <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-12 text-left">
                Nuestra tecnología de Realidad Aumentada te permite proyectar cada pieza de nuestra colección directamente en tu ambiente. 
                Sin medidas confusas, solo la certeza de que encaja perfectamente en tu hogar antes de realizar la compra.
              </p>
              
              <button 
                onClick={onStartAR}
                className="group flex items-center space-x-6 text-brand-dark-green transition-all duration-300"
              >
                <span className="text-[12px] font-bold tracking-[0.3em] uppercase border-b-[1.5px] border-brand-dark-green pb-2 transition-all group-hover:border-brand-text group-hover:text-brand-text">
                  Probar en mi espacio ahora
                </span>
                <div className="w-12 h-12 rounded-full border border-brand-dark-green/20 flex items-center justify-center group-hover:bg-brand-dark-green group-hover:text-white transition-all shadow-sm">
                  <BoxSelect size={20} strokeWidth={1.2} />
                </div>
              </button>
            </motion.div>
          </div>

          {/* Columna Derecha: Imagen del Smartphone AR (Mockup Gacela Específico) */}
          <div className="w-full lg:w-7/12 flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full max-w-[550px]"
            >
              <div className="relative group">
                {/* Imagen proporcionada por el usuario */}
                <img 
                  src="https://i.postimg.cc/257sRZMD/Adobe-Express-file.png" 
                  alt="Smartphone con Realidad Aumentada Gacela" 
                  className="w-full h-auto drop-shadow-[0_50px_80px_rgba(0,0,0,0.15)] transition-transform duration-700 group-hover:scale-[1.02]"
                />
                
                {/* Overlay sutil para realzar la profundidad */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark-green/5 to-transparent pointer-events-none rounded-[3rem]" />
              </div>

              {/* Halo de luz decorativo de fondo */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-dark-green/5 blur-[100px] rounded-full opacity-60" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AugmentedReality;