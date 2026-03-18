
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
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-4xl font-light tracking-[0.2em] uppercase text-brand-text mb-6">
              Mantené el contacto
            </h2>
            <p className="text-gray-500 font-light text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Suscribite a nuestro newsletter y enterate de todas nuestras novedades.
            </p>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-stretch"
          >
            <div className="flex-1 max-w-xs mx-auto md:mx-0">
              <input
                type="text"
                placeholder="Nombre"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-brand-bg/50 border-b border-gray-200 px-6 py-4 text-sm focus:outline-none focus:border-brand-dark-green transition-colors font-light"
              />
            </div>
            <div className="flex-1 max-w-xs mx-auto md:mx-0">
              <input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-brand-bg/50 border-b border-gray-200 px-6 py-4 text-sm focus:outline-none focus:border-brand-dark-green transition-colors font-light"
              />
            </div>
            <button
              type="submit"
              disabled={status !== 'idle'}
              className="px-10 py-4 bg-brand-dark-green text-white text-xs font-bold tracking-[0.3em] uppercase rounded-full hover:bg-brand-text transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg md:shadow-none"
            >
              <span>{status === 'success' ? '¡Enviado!' : status === 'sending' ? 'Enviando...' : 'Enviar'}</span>
              {status === 'idle' && <Send size={14} className="ml-1 opacity-70" />}
            </button>
          </motion.form>

          {status === 'success' && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-brand-dark-green font-medium text-sm"
            >
              Gracias por sumarte a nuestra comunidad.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
