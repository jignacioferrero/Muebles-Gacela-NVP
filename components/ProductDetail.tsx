
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, BoxSelect, Wrench, Star } from 'lucide-react';
import { Product } from '../types/product'; // Importa la interfaz Product

interface ProductDetailProps {
  product: Product;
  onBackClick: () => void;
  onStartAssembly: (product: Product) => void; // Nueva prop
  onStartAR: (product: Product) => void; // Nueva prop
}

// Mock de datos completos para un producto (similar a la estructura de la PDP)
const mockProductDetail: Product = {
  id: 1,
  title: 'Set de mesas OSLO', // Título actualizado
  rating: 5,
  image: 'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91369-bc36b6e0/Escena%20Art%20116.webp', // Imagen principal para la Home
  shortDescription: 'Además de decorar su sala, este producto también es muy funcional, es un óptimo apoyo para vasos, control de la TV y es un excelente soporte para servir visitas y ofrecer más confort al ambiente.', // Descripción ajustada
  longDescription: `
    El Set de mesas OSLO redefine la funcionalidad y el estilo en tu hogar. Inspirado en la simplicidad y la calidez del diseño nórdico, cada mesa es una pieza versátil que se adapta a tus necesidades. Fabricadas con la más alta calidad y acabados impecables, estas mesas no solo embellecen tu espacio, sino que también ofrecen durabilidad y resistencia. Su diseño apilable y ligero las hace ideales para espacios pequeños, permitiendo una fácil reconfiguración según la ocasión. Descubre la elegancia sutil y la practicidad que el Set OSLO aporta a tu sala de estar, creando un ambiente acogedor y moderno.
  `, // Descripción ajustada
  sku: 'GAC-OSLO-SM-001', // SKU ajustado
  assemblyTime: '30 minutos', // Tiempo de armado ajustado
  difficulty: 'Fácil', // Dificultad ajustada
  assemblyTools: [ // Herramientas de armado ajustadas
    { name: 'Martillo de carpintero', icon: 'Hammer', included: false }, // Nuevo: Martillo
    { name: 'Destornillador Phillips', icon: 'Wrench', included: false }, // Modificado: No incluido
    { name: 'Llave Allen', icon: 'Hexagon', included: true },
    { name: 'Manual de instrucciones', icon: 'BookOpen', included: true },
  ],
  mainImages: [ // Imágenes principales actualizadas
    'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91369-bc36b6e0/Escena%20Art%20116.webp',
    'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/29549-0ae220bf/116R%20Real%20gris%20FF.jpg',
    'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/29550-7517ec64/116R%20Real%20FF.jpg',
    'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/29551-6986a0d5/116R%20real%203.jpg',
    'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/29581-1467c049/116R%20Real%20patas%20FF.jpg',
  ],
  thumbnails: [ // Miniaturas actualizadas (usando las mismas mainImages por simplicidad)
    'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91369-bc36b6e0/Escena%20Art%20116.webp',
    'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/29549-0ae220bf/116R%20Real%20gris%20FF.jpg',
    'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/29550-7517ec64/116R%20Real%20FF.jpg',
    'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/29551-6986a0d5/116R%20real%203.jpg',
    'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/29581-1467c049/116R%20Real%20patas%20FF.jpg',
  ],
  technicalImage: 'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/29553-d31928df/Art%20116%20%28Roble%20Natural-Blanco%29%20-%20Cotas.jpg', // Imagen técnica actualizada
  specs: [ // Especificaciones ajustadas para las mesas
    { label: 'Materiales', value: 'Madera de Paraíso / Melamina Blanca' },
    { label: 'Dimensiones (Mesa Grande)', value: 'Alto: 40cm | Diámetro: 60cm' },
    { label: 'Dimensiones (Mesa Pequeña)', value: 'Alto: 35cm | Diámetro: 40cm' },
    { label: 'Peso máximo soportado', value: '20 kg por mesa' },
    { label: 'Origen', value: 'Argentina' },
    { label: 'Garantía', value: '1 año' },
  ],
  inspirationImages: [ // Imágenes de inspiración actualizadas
    'https://i.postimg.cc/wjVv3sF3/Gemini-Generated-Image-1inlfe1inlfe1inl.png',
    'https://i.postimg.cc/N0Cjkq3L/Gemini-Generated-Image-97bfic97bfic97bf.png',
    'https://i.postimg.cc/wB4jQ8C7/Gemini-Generated-Image-t314xqt314xqt314.png',
  ],
  suggestedProducts: [ // Productos sugeridos actualizados
    { id: 201, title: 'Torre HELSINKI', rating: 4, image: 'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91372-597a4125/Escena%20Art%20322020.webp' },
    { id: 202, title: 'Torre TROMSO', rating: 5, image: 'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91367-b135e62f/Escena%20Art%20322021.webp' },
    { id: 203, title: 'Barra desayunadora VIKEN', rating: 4, image: 'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91374-1243c00e/Escena%20Art%20455090.webp' },
    { id: 204, title: 'Mesa de comedor LEIR', rating: 3, image: 'https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/91392-c9ad79ed/Escena%20%28combo%20comedor%20557%29.webp' },
  ],
};

import { useParams, useNavigate } from 'react-router-dom';
import db from '../data/productos.json';
import VideoViewer from './VideoViewer';

const ProductDetail: React.FC<ProductDetailProps> = ({ product: propProduct, onBackClick, onStartAssembly, onStartAR }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // 1. Try to find the product in the local CMS DB by slug
  const dbProduct = db.products.find(p => p.slug === slug);

  // 2. Map DB Product into Component format. DB fields: SKU, Nombre_Comercial, Linea, Ambiente, Medidas_Mueble, Medidas_Logistica, URLs_Fotos, Manual_PDF, Relacionados
  let parsedProduct = null;
  
  if (dbProduct) {
    const fotos = dbProduct.URLs_Fotos ? dbProduct.URLs_Fotos.split(';') : [];
    
    let productSpecs = [
      { label: 'Línea', value: dbProduct.Linea || '-' },
      { label: 'Ambiente', value: dbProduct.Ambiente || '-' },
      { label: 'Medidas', value: dbProduct.Medidas_Mueble || '-' },
      { label: 'Logística', value: dbProduct.Medidas_Logistica || '-' }
    ];

    if (dbProduct.Especificaciones_Tecnicas) {
      const extraSpecs = dbProduct.Especificaciones_Tecnicas.split('|').map(s => {
        const parts = s.split(':');
        if (parts.length >= 2) {
          return { label: parts[0].trim(), value: parts.slice(1).join(':').trim() };
        }
        return { label: 'Detalle', value: s.trim() };
      });
      productSpecs = [...productSpecs, ...extraSpecs].filter(spec => spec.value !== '-');
    }

    parsedProduct = {
      id: dbProduct.SKU, // use SKU as ID
      title: dbProduct.Nombre_Comercial,
      rating: 5,
      image: fotos.length > 0 ? fotos[0] : 'https://placehold.co/600x600/f2f2f2/1a1a1a?text=Pendiente',
      shortDescription: dbProduct.Descripcion_Corta || `${dbProduct.Linea || ''} - ${dbProduct.Ambiente || ''}. Medidas: ${dbProduct.Medidas_Mueble || 'N/A'}.`,
      longDescription: dbProduct.Descripcion_Larga || `Descubre la elegancia y funcionalidad de ${dbProduct.Nombre_Comercial}. Ideal para tu ${dbProduct.Ambiente || 'hogar'}. Logística: ${dbProduct.Medidas_Logistica || 'N/A'}.`,
      sku: dbProduct.SKU,
      assemblyTime: 'Pendiente',
      difficulty: 'Fácil',
      assemblyTools: [],
      mainImages: fotos.length > 0 ? fotos : ['https://placehold.co/600x600/f2f2f2/1a1a1a?text=Pendiente'],
      thumbnails: fotos.length > 0 ? fotos : ['https://placehold.co/600x600/f2f2f2/1a1a1a?text=Pendiente'],
      technicalImage: '',
      specs: productSpecs,
      inspirationImages: [],
      suggestedProducts: [],
      youtubeVideo: dbProduct.Video_YouTube || undefined
    };
  }

  // Use parsed DB product, fallback to prop state (if clicked from Home PopularItems mock), fallback to mockProductDetail if ID is 1
  const product = parsedProduct || (propProduct?.id === 1 ? mockProductDetail : propProduct);

  if (!product) {
    return <div className="py-24 text-center">Producto no encontrado. <button onClick={() => navigate('/productos')} className="text-brand-support underline">Ver Catálogo</button></div>;
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.mainImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.mainImages.length) % product.mainImages.length);
  };

  return (
    <div className="bg-brand-bg pt-12 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Botón de Volver */}
        <motion.button
          onClick={onBackClick}
          className="mb-8 flex items-center text-brand-primary hover:text-brand-primary transition-colors text-sm font-semibold group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver a Productos
        </motion.button>

        {/* BLOQUE HERO DE PRODUCTO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
          {/* Izquierda: Galería de Imágenes */}
          <div className="flex flex-col">
            <motion.div
              key={currentImageIndex} // Key para animar el cambio de imagen
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative aspect-square md:aspect-[5/4] rounded-xl overflow-hidden bg-white shadow-lg mb-6"
            >
              <img
                src={product.mainImages && product.mainImages.length > 0
                  ? product.mainImages[currentImageIndex]
                  : product.image}
                alt={`${product.title}`}
                className="w-full h-full object-cover"
              />
              {product.mainImages && product.mainImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/70 backdrop-blur-sm rounded-md shadow-md hover:bg-white transition-colors"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/70 backdrop-blur-sm rounded-md shadow-md hover:bg-white transition-colors"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </motion.div>

            {product.thumbnails && product.thumbnails.length > 0 && (
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.thumbnails.map((thumbnail, index) => (
                  <motion.img
                    key={index}
                    src={thumbnail}
                    alt={`Miniatura ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${currentImageIndex === index ? 'border-brand-support ring-2 ring-brand-dark-green/30' : 'border-gray-200 hover:border-brand-support/50'
                      }`}
                    onClick={() => setCurrentImageIndex(index)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Derecha: Info Rápida y Botones */}
          <div className="flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-godber font-normal tracking-[0.05em] uppercase text-brand-primary mb-6 leading-tight"
            >
              {product.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-[#594A42] font-clofie font-light leading-relaxed mb-8 max-w-lg"
            >
              {product.shortDescription}
            </motion.p>
            {/* Eliminado: Precio
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl font-bold text-brand-primary mb-10"
            >
              {product.price}
            </motion.p> */}

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                onClick={() => onStartAR(product)} // Llama a la nueva función onStartAR
                className="flex items-center justify-center px-8 py-3 bg-brand-support text-brand-bg rounded-md text-[14px] uppercase tracking-widest hover:bg-brand-support-hover transition-colors shadow-lg font-clofie font-bold italic"
              >
                <BoxSelect size={18} className="mr-3" />
                Probalo en tu espacio
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                onClick={() => onStartAssembly(product)} // Llama a la nueva función
                className="flex items-center justify-center px-8 py-3 border border-gray-300 text-brand-primary rounded-md text-[14px] uppercase tracking-widest hover:bg-gray-100 transition-colors font-clofie font-bold italic"
              >
                <Wrench size={18} className="mr-3 text-gray-500" />
                Instructivo de armado
              </motion.button>
            </div>
          </div>
        </div>

        {/* BLOQUE DE DESCRIPCIÓN ESTÉTICA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="my-24 py-16 px-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-godber font-normal tracking-[0.05em] uppercase text-brand-primary leading-tight mb-8">
            Filosofía de Diseño
          </h2>
          <p className="text-lg text-[#594A42] font-clofie font-light leading-relaxed">
            {product.longDescription}
          </p>
        </motion.div>

        {/* ESPECIFICACIONES TÉCNICAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center my-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <img
              src={product.technicalImage}
              alt="Plano técnico del producto"
              className="w-full max-w-md h-auto object-contain bg-white p-8 rounded-xl shadow-md"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-4xl md:text-6xl font-godber font-normal tracking-[0.05em] uppercase text-brand-primary leading-tight mb-8">
              Especificaciones Técnicas
            </h3>
            <ul className="space-y-4 text-[#594A42] font-clofie text-lg">
              {product.specs.map((spec, index) => (
                <li key={index} className="flex justify-between items-center pb-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-semibold text-brand-primary/90">{spec.label}:</span>
                  <span className="font-light text-right">{spec.value}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* COMPONENTE DE VIDEO */}
        {product.youtubeVideo && (
          <div className="my-24">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-godber font-normal tracking-[0.05em] uppercase text-brand-primary text-center leading-tight mb-12"
            >
              CONOCÉ MÁS DEL PRODUCTO
            </motion.h2>
            <div className="max-w-4xl mx-auto">
              <VideoViewer videoUrl={product.youtubeVideo} title={`Video sobre ${product.title}`} />
            </div>
          </div>
        )}

        {/* SECCIÓN "ESPACIOS GACELA" */}
        <div className="my-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-godber font-normal tracking-[0.05em] uppercase text-brand-primary text-center leading-tight mb-12"
          >
            INSPIRACIÓN PARA TU HOGAR
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.inspirationImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="aspect-video overflow-hidden rounded-xl shadow-md group"
              >
                <img
                  src={img}
                  alt={`Inspiración ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECCIÓN "COMBINALOS CON" */}
        <div className="my-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-godber font-normal tracking-[0.05em] uppercase text-brand-primary text-center leading-tight mb-12"
          >
            COMBINALOS CON
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {product.suggestedProducts.map((suggested, index) => (
              <motion.div
                key={suggested.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-white mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <img
                    src={suggested.image}
                    alt={suggested.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Star size={12} className="text-yellow-500 inline-block fill-yellow-500 mr-1" />
                    <span className="text-[10px] font-bold">{suggested.rating}.0</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-godber text-brand-primary group-hover:text-brand-support transition-colors">{suggested.title}</h3>
                  {/* Eliminado: <p className="text-[13px] text-gray-400 font-light">{suggested.price}</p> */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;