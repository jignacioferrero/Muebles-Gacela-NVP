
import React from 'react';
import { motion } from 'framer-motion';
import { LeafIcon, RecycleIcon, ShieldCheckIcon, RtaIcon } from './Icons';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center text-center px-4 group"
    >
      <div className="w-16 h-16 mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-[14px] font-bold tracking-[0.2em] uppercase text-brand-text mb-3">
        {title}
      </h3>
      <p className="text-[13px] text-gray-500 leading-relaxed max-w-[240px] font-light">
        {description}
      </p>
    </motion.div>
  );
};

const QualitySustainability: React.FC = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Título de la Sección */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase text-brand-text mb-4"
          >
            CALIDAD Y SOSTENIBILIDAD
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            className="h-[1px] bg-brand-dark-green mx-auto"
          />
        </div>

        {/* Grilla de Características */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
          <Feature 
            icon={<ShieldCheckIcon className="h-12 w-12 text-brand-dark-green" />} 
            title="ISO 9001" 
            delay={0.1}
            description="Cumplimos con estándares internacionales que garantizan la excelencia en cada proceso de fabricación." 
          />
          <Feature 
            icon={<LeafIcon className="h-12 w-12 text-brand-dark-green" />} 
            title="ECO-FRIENDLY" 
            delay={0.2}
            description="Nuestro compromiso ambiental nos lleva a utilizar procesos de bajo impacto y acabados no tóxicos." 
          />
          <Feature 
            icon={<RtaIcon className="h-12 w-12 text-brand-dark-green" />} 
            title="SISTEMA RTA" 
            delay={0.3}
            description="Diseño inteligente 'Ready to Assemble' que optimiza la logística y reduce la huella de carbono." 
          />
          <Feature 
            icon={<RecycleIcon className="h-12 w-12 text-brand-dark-green" />} 
            title="MATERIALES NOBLES" 
            delay={0.4}
            description="Utilizamos maderas de fuentes renovables y materiales reciclables para muebles que duran toda la vida." 
          />
        </div>
      </div>
    </section>
  );
};

export default QualitySustainability;
