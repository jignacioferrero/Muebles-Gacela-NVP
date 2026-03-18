
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative h-[80vh] md:h-[90vh] bg-cover bg-center flex items-center" 
      style={{ backgroundImage: "url('https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91132-dcace947/Recurso%2015.webp')" }}
    >
      {/* Superposición sutil para garantizar la legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
      
      <div className="relative container mx-auto px-6 lg:px-16 text-left">
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 max-w-3xl leading-[1.1] tracking-tight drop-shadow-lg">
          Encontrá el mueble ideal para complementar tu hogar
        </h1>
        
        <p className="text-white/90 text-lg md:text-xl mb-10 max-w-xl leading-relaxed drop-shadow-md">
          Diseños exclusivos que combinan elegancia, calidad y sostenibilidad para transformar cada rincón de tu casa.
        </p>
        
        <div className="flex flex-col sm:flex-row items-start justify-start gap-5">
          <button className="w-full sm:w-auto bg-brand-dark-green text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-brand-dark-green transition-all duration-300 transform hover:-translate-y-1 shadow-2xl">
            Ver catálogo
          </button>
          <button className="w-full sm:w-auto border-2 border-white text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-brand-text transition-all duration-300 transform hover:-translate-y-1 shadow-xl backdrop-blur-sm">
            Hablemos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
