import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import db from '../data/productos.json';

const Catalog: React.FC = () => {
  const [selectedLinea, setSelectedLinea] = useState<string>('');
  const [selectedAmbiente, setSelectedAmbiente] = useState<string>('');

  // Extract unique lines and ambients for the filter dropdowns
  // Exact lines and environments as requested by the user
  const lineas = ["Clásica", "Kyoto", "Curvalba", "Lumo", "Nordik", "Infantil", "Gamer"];
  const ambientes = ["Living", "Comedor", "Dormitorio", "Cocina", "Oficina"];

  const filteredProducts = useMemo(() => {
    return db.products.filter(p => {
      const matchLinea = selectedLinea ? p.Linea === selectedLinea : true;
      const matchAmbiente = selectedAmbiente ? p.Ambiente === selectedAmbiente : true;
      return matchLinea && matchAmbiente;
    });
  }, [selectedLinea, selectedAmbiente]);

  return (
    <div className="bg-brand-bg min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-home.png" 
            alt="Catálogo Gacela" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-primary/40"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl font-godber font-normal uppercase tracking-[0.05em] text-white mb-6 drop-shadow-lg"
          >
            Nuestro Catálogo
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-4xl text-white font-clofie tracking-wider font-light italic"
          >
            Mobiliario que refleja el equilibrio perfecto entre diseño y funcionalidad.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="text-center mb-20 max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-godber font-normal text-brand-primary tracking-wide mb-12">
                Catálogo
            </h2>

            {/* FILTERS SECTION - DOS DESPLEGABLES */}
            <div className="flex flex-col md:flex-row gap-6 justify-center max-w-3xl mx-auto">
                <div className="w-full md:w-1/2 text-left">
                    <label className="block text-[12px] font-outersans font-thin text-[#A69785] mb-2 tracking-[0.4em] uppercase ml-2 text-center">Filtrar por Línea</label>
                    <div className="relative">
                        <select 
                            className="w-full bg-[#FAF8F5] border border-[#EAE3D9] text-[#594A42] font-clofie font-light text-[15px] px-6 py-4 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-support appearance-none cursor-pointer transition-all hover:bg-white shadow-sm"
                            value={selectedLinea}
                            onChange={(e) => setSelectedLinea(e.target.value)}
                        >
                            <option value="">Todas las líneas</option>
                            {lineas.map(linea => (
                                <option key={linea as string} value={linea as string}>{linea as string}</option>
                            ))}
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#A69785]">
                            <ChevronDown size={18} />
                        </div>
                    </div>
                </div>
                
                <div className="w-full md:w-1/2 text-left">
                    <label className="block text-[12px] font-outersans font-thin text-[#A69785] mb-2 tracking-[0.4em] uppercase ml-2 text-center">Filtrar por Ambiente</label>
                    <div className="relative">
                        <select 
                            className="w-full bg-[#FAF8F5] border border-[#EAE3D9] text-[#594A42] font-clofie font-light text-[15px] px-6 py-4 rounded-full focus:outline-none focus:ring-1 focus:ring-brand-support appearance-none cursor-pointer transition-all hover:bg-white shadow-sm"
                            value={selectedAmbiente}
                            onChange={(e) => setSelectedAmbiente(e.target.value)}
                        >
                            <option value="">Todos los ambientes</option>
                            {ambientes.map(ambiente => (
                                <option key={ambiente as string} value={ambiente as string}>{ambiente as string}</option>
                            ))}
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#A69785]">
                            <ChevronDown size={18} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Grid de Productos */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 text-brand-support">
            <p className="text-xl font-clofie font-light">No hay productos que coincidan con tu búsqueda.</p>
            <button 
              onClick={() => { setSelectedLinea(''); setSelectedAmbiente(''); }}
              className="mt-6 text-[14px] font-clofie font-bold italic tracking-widest uppercase border-b border-brand-support hover:opacity-70"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16 max-w-7xl mx-auto">
            <AnimatePresence>
                {filteredProducts.map((product, idx) => {
                const fotos = product.URLs_Fotos ? product.URLs_Fotos.split(';') : [];
                const mainPhoto = fotos.length > 0 ? fotos[0] : 'https://placehold.co/600x600/f2f2f2/1a1a1a?text=Foto+Pendiente';
                
                return (
                    <motion.div
                        layout
                        key={product.SKU}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="group flex flex-col items-center cursor-pointer"
                    >
                    <Link to={`/productos/${product.slug}`} className="block w-full text-center">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 flex items-center justify-center bg-transparent">
                            <img 
                                src={mainPhoto} 
                                alt={product.Nombre_Comercial as string} 
                                className="w-[85%] h-[85%] object-contain group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x600/f2f2f2/1a1a1a?text=Foto+Invalida'; }}
                            />
                        </div>
                        <h3 className="text-lg font-godber uppercase text-brand-primary tracking-wider group-hover:text-brand-support transition-colors">{product.Nombre_Comercial as string}</h3>
                        
                        <div className="flex gap-2 justify-center mt-3 mb-3">
                            <div className="w-3 h-3 rounded-full bg-[#8C7A6B]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#CFB59D]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#594A42]"></div>
                        </div>

                        {product.Precio && (
                            <p className="text-[13px] font-clofie font-light text-[#594A42]">${product.Precio}</p>
                        )}
                        <p className="text-[10px] font-clofie text-[#A69785] tracking-widest uppercase mt-1">{(product.Linea as string) || 'Gacela'}</p>
                    </Link>
                    </motion.div>
                );
                })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
