
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulación de envío
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="py-24 bg-white border-t border-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
          <div className="text-left mb-16">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[14px] font-thin tracking-[0.4em] uppercase text-brand-support mb-4 font-outersans"
            >
              Newsletter
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-godber font-normal tracking-[0.05em] uppercase text-brand-primary leading-tight"
            >
              MANTENETE INSPIRADO.
            </motion.h3>
            <p className="text-lg font-clofie font-light text-[#594A42] leading-relaxed mt-6 max-w-2xl">
              El diseño evoluciona y nosotros con él. Sumate para estar al tanto de la transformación 4.0 de Gacela.
            </p>
          </div>

          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-stretch mt-12"
          >
            <div className="flex-1 max-w-xs mx-auto md:mx-0">
              <input
                type="text"
                placeholder="Nombre"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-brand-bg/50 border-b border-gray-200 px-6 py-4 text-sm focus:outline-none focus:border-brand-support transition-colors font-clofie"
              />
            </div>
            <div className="flex-1 max-w-xs mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-brand-bg/50 border-b border-gray-200 px-6 py-4 text-sm focus:outline-none focus:border-brand-support transition-colors font-clofie"
              />
            </div>
            <button
              type="submit"
              disabled={status !== 'idle'}
              className="px-10 py-4 bg-brand-support text-brand-bg text-[14px] tracking-widest uppercase hover:bg-brand-support/90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg font-clofie font-bold italic rounded-md"
            >
              <span>{status === 'success' ? '¡Enviado!' : status === 'sending' ? 'Enviando...' : 'Enviar'}</span>
              {status === 'idle' && <Send size={14} className="ml-1 opacity-70" />}
            </button>
          </motion.form>

          {status === 'success' && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-brand-primary font-medium text-sm text-center"
            >
              Gracias por sumarte a nuestra comunidad.
            </motion.p>
          )}
      </div>
    </section>
  );
};

export default Newsletter;
