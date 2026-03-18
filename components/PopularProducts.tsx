
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { Product } from '../types/product'; // Importa la interfaz Product

// Datos de productos (simplificados para la Home, se expandirán para la PDP)
export const productData: Record<string, Product[]> = {
  Escandinava: [
    // Added assemblyTime and difficulty to match Product interface
    // Added assemblyTools to match Product interface
    { id: 1, title: 'Set de mesas OSLO', rating: 5, image: 'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91369-bc36b6e0/Escena%20Art%20116.webp', shortDescription: 'Minimalista y funcional para tu living.', longDescription: '', sku: 'SN-ALB-001', assemblyTime: '60 minutos', difficulty: 'Fácil', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
    // Added assemblyTime and difficulty to match Product interface
    // Added assemblyTools to match Product interface
    { id: 2, title: 'Torre HELSINKI', rating: 4, image: 'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91372-597a4125/Escena%20Art%20322020.webp', shortDescription: 'Diseño escandinavo con acabados premium.', longDescription: '', sku: 'MC-BER-002', assemblyTime: '45 minutos', difficulty: 'Fácil', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
    // Corrected: Removed the extra `[]` before `suggestedProducts: []`
    // Added assemblyTools to match Product interface
    { id: 3, title: 'Escritorio RIBE', rating: 5, image: 'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91389-62be22c8/Escena%20Art%20234093%20%28blanco%29.webp', shortDescription: 'Funcionalidad y estilo para tu home office.', longDescription: '', sku: 'ES-OSL-003', assemblyTime: '90 minutos', difficulty: 'Media', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
    // Added assemblyTime and difficulty to match Product interface
    // Added assemblyTools to match Product interface
    { id: 4, title: 'Placard LOM', rating: 4, image: 'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91381-745d9bec/Escena%20Art%20742022.webp', shortDescription: 'Organiza con elegancia cualquier espacio.', longDescription: '', sku: 'ET-FJO-004', assemblyTime: '75 minutos', difficulty: 'Media', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
  ],
  Kyoto: [
    // Nuevos productos para la línea Kyoto
    { id: 9, title: 'Mesa de centro OSAKA', rating: 5, image: 'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91423-81fc70c8/Escena%20Art%20326250.webp', shortDescription: 'Diseño funcional para tu sala de estar.', longDescription: '', sku: 'MC-OSA-009', assemblyTime: '45 minutos', difficulty: 'Fácil', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
    { id: 10, title: 'Organizador AKI', rating: 4, image: 'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91424-1ac29a4b/Escena%20Art%20540253.webp', shortDescription: 'Solución práctica para mantener el orden.', longDescription: '', sku: 'OR-AKI-010', assemblyTime: '60 minutos', difficulty: 'Media', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
    { id: 11, title: 'Bahiut NAGOYA', rating: 5, image: 'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91420-b316f6a3/Escena%20Art%20760250.webp', shortDescription: 'Elegancia y almacenamiento para tu comedor.', longDescription: '', sku: 'BH-NAG-011', assemblyTime: '90 minutos', difficulty: 'Difícil', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
    { id: 12, title: 'Escritorio NIKKO', rating: 4, image: 'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91431-1278f77c/Escena%20Art%20334250.webp', shortDescription: 'Espacio de trabajo minimalista y funcional.', longDescription: '', sku: 'ES-NIK-012', assemblyTime: '75 minutos', difficulty: 'Media', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
  ],
  Industrial: [
    // Added assemblyTime and difficulty to match Product interface
    // Added assemblyTools to match Product interface
    { id: 9, title: 'Mesa Loft Hierro y Roble', rating: 5, image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=400&auto=format&fit=crop', shortDescription: 'Robusta y con carácter industrial.', longDescription: '', sku: 'ML-HIE-009', assemblyTime: '90 minutos', difficulty: 'Media', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
    // Added assemblyTime and difficulty to match Product interface
    // Added assemblyTools to match Product interface
    { id: 10, title: 'Silla Tolix Oxidada', rating: 4, image: 'https://images.unsplash.com/photo-1503602642458-2321159af561?q=80&w=400&auto=format&fit=crop', shortDescription: 'Icono del diseño industrial, cómoda y duradera.', longDescription: '', sku: 'SI-TOL-010', assemblyTime: '40 minutos', difficulty: 'Fácil', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
    // Added assemblyTime and difficulty to match Product interface
    // Added assemblyTools to match Product interface
    { id: 11, title: 'Lámpara Colgante Factory', rating: 5, image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=400&auto=format&fit=crop', shortDescription: 'Iluminación con estilo vintage industrial.', longDescription: '', sku: 'LC-FAC-011', assemblyTime: '30 minutos', difficulty: 'Fácil', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
    // Added assemblyTime and difficulty to match Product interface
    // Added assemblyTools to match Product interface
    { id: 12, title: 'Estantería Pipe-Wood', rating: 4, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=400&auto=format&fit=crop', shortDescription: 'Combina madera y metal para un look auténtico.', longDescription: '', sku: 'ET-PIP-012', assemblyTime: '75 minutos', difficulty: 'Media', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
  ],
  Gamer: [
    // Added assemblyTime and difficulty to match Product interface
    // Added assemblyTools to match Product interface
    { id: 13, title: 'Escritorio Gaci-Pro Carbon', rating: 5, image: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=400&auto=format&fit=crop', shortDescription: 'Diseñado para el máximo rendimiento gamer.', longDescription: '', sku: 'EG-PRO-013', assemblyTime: '120 minutos', difficulty: 'Media', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
    // Added assemblyTime and difficulty to match Product interface
    // Added assemblyTools to match Product interface
    { id: 14, title: 'Silla Ergonómica Titan', rating: 5, image: 'https://images.unsplash.com/photo-1598550476439-6847785fce66?q=80&w=400&auto=format&fit=crop', shortDescription: 'Comodidad superior para largas sesiones.', longDescription: '', sku: 'SE-TIT-014', assemblyTime: '90 minutos', difficulty: 'Media', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
    // Added assemblyTime and difficulty to match Product interface
    // Added assemblyTools to match Product interface
    { id: 15, title: 'Soporte Monitor Dual-G', rating: 4, image: 'https://images.unsplash.com/photo-1510511459019-5dee99cd4ff5?q=80&w=400&auto=format&fit=crop', shortDescription: 'Optimiza tu setup con doble monitor.', longDescription: '', sku: 'SM-DUAL-015', assemblyTime: '45 minutos', difficulty: 'Fácil', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
    // Added assemblyTime and difficulty to match Product interface
    // Added assemblyTools to match Product interface
    { id: 16, title: 'Módulo LED AmbiLight', rating: 4, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop', shortDescription: 'Ambienta tu espacio gaming con luces dinámicas.', longDescription: '', sku: 'ML-AMB-016', assemblyTime: '20 minutos', difficulty: 'Fácil', assemblyTools: [], mainImages: [], thumbnails: [], technicalImage: '', specs: [], inspirationImages: [], suggestedProducts: [] },
  ],
};

interface PopularProductsProps {
  onProductClick: (product: Product) => void;
}

const PopularProducts: React.FC<PopularProductsProps> = ({ onProductClick }) => {
  const [activeTab, setActiveTab] = useState('Escandinava');
  const [isTitleHovered, setIsTitleHovered] = useState(false);

  return (
    <section className="pt-32 pb-24 bg-brand-bg transition-all duration-700">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Título alineado a la izquierda con línea animada */}
        <div 
          className="mb-14 inline-block group"
          onMouseEnter={() => setIsTitleHovered(true)}
          onMouseLeave={() => setIsTitleHovered(false)}
        >
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase text-brand-text mb-4"
          >
            NUESTRAS LÍNEAS MÁS BUSCADAS
          </motion.h2>
          
          {/* Línea decorativa (Subtítulo visual) */}
          <motion.div 
            initial={{ width: 60 }}
            animate={{ 
              width: isTitleHovered ? 120 : 60,
              backgroundColor: isTitleHovered ? '#5F6C5C' : '#D1D5DB'
            }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="h-[1.5px]"
          />
        </div>

        {/* Mini Menú de Filtro (Tabs) */}
        <div className="flex justify-center mb-16">
          <div className="flex space-x-4 md:space-x-12 border-b border-gray-200 w-full md:w-auto justify-center">
            {Object.keys(productData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-[13px] md:text-[14px] uppercase tracking-[0.2em] font-medium transition-all relative ${
                  activeTab === tab ? 'text-brand-dark-green' : 'text-gray-400 hover:text-brand-text'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-dark-green"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Grilla de Productos con Animación */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            >
              {productData[activeTab].map((product) => (
                <div 
                  key={product.id} 
                  className="group cursor-pointer"
                  onClick={() => onProductClick(product)} // Llama a onProductClick con el producto
                >
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-white mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Star size={12} className="text-yellow-500 inline-block fill-yellow-500 mr-1" />
                      <span className="text-[10px] font-bold">{product.rating}.0</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[14px] font-medium text-brand-text/90 group-hover:text-brand-dark-green transition-colors">{product.title}</h3>
                    {/* Eliminado: <p className="text-[13px] text-gray-400 font-light">{product.price}</p> */}
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} className={`${i < product.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200'}`} />
                        ))}
                      </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Acceso a Colección */}
        <div className="mt-8 text-right">
          <a 
            href="#" 
            className="inline-flex items-center text-[12px] md:text-[13px] uppercase tracking-[0.2em] text-brand-dark-green hover:text-brand-text font-medium transition-colors group"
          >
            Ver toda la línea 
            <motion.span 
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;