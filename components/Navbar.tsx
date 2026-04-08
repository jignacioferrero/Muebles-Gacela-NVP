import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BedDouble,
  Bot,
  MessageCircle,
  Users,
  Search,
  Instagram,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Product } from '../types/product';
import { productData } from './PopularProducts';

// Custom icons to visually represent specific pieces of furniture
const TvStandIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="5" y="4" width="14" height="10" rx="1" />
    <path d="M9 14v4" />
    <path d="M15 14v4" />
    <rect x="3" y="18" width="18" height="4" rx="1" />
  </svg>
);

const DiningTableIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Table top */}
    <rect x="2" y="10" width="20" height="3" rx="1" />
    {/* Table legs */}
    <path d="M4 13v8" />
    <path d="M20 13v8" />
    {/* Chair behind table */}
    <path d="M12 10V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v6" />
    <path d="M12 10V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6" />
  </svg>
);

const KitchenCabinetIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M4 11h16" />
    <path d="M12 11v10" />
    <circle cx="10" cy="16" r="1" />
    <circle cx="14" cy="16" r="1" />
    <path d="M8 7h8" />
  </svg>
);

const DeskIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="11" width="20" height="3" rx="1" />
    <path d="M4 14v7" />
    <path d="M20 14v7" />
    {/* Monitor */}
    <rect x="7" y="3" width="10" height="6" rx="1" />
    <path d="M12 9v2" />
  </svg>
);

const megamenuData = {
  lineas: ['Clásica', 'Curvalba', 'Gamer', 'Infantil', 'Kyoto', 'Lumo', 'Nordik', 'Cocina Lumo', 'Cocina Nordik'],
  ambientes: [
    { name: 'Living', icon: TvStandIcon, lineas: ['Clásica', 'Curvalba', 'Kyoto', 'Lumo', 'Nordik'] },
    { name: 'Comedor', icon: DiningTableIcon, lineas: ['Clásica'] },
    { name: 'Dormitorio', icon: BedDouble, lineas: ['Clásica', 'Curvalba', 'Infantil', 'Lumo', 'Nordik'] },
    { name: 'Cocina', icon: KitchenCabinetIcon, lineas: ['Cocina Lumo', 'Cocina Nordik'] },
    { name: 'Oficina', icon: DeskIcon, lineas: ['Clásica', 'Curvalba', 'Gamer', 'Kyoto', 'Lumo', 'Nordik'] }
  ]
};

const topNavItems = ['Productos', 'Nosotros', 'Novedades', 'Aberturas', 'Contacto'];

const MegaMenu: React.FC<{ active: boolean, onMouseLeave: () => void }> = ({ active, onMouseLeave }) => {
  const [activeAmbiente, setActiveAmbiente] = useState(megamenuData.ambientes[0]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 w-full bg-[#ECE2D2] shadow-2xl border-t border-[#D9CDB8] overflow-hidden z-[200]"
          onMouseLeave={onMouseLeave}
        >
          <div className="container mx-auto px-6 lg:px-12 py-10 flex gap-8 xl:gap-12 justify-center max-w-[1200px]">
            {/* LÍNEAS */}
            <div className="w-[200px]">
              <h3 className="text-[14px] font-outersans font-thin text-[#8C7A6B] uppercase mb-6 tracking-[0.4em]">Líneas</h3>
              <ul className="space-y-4">
                {megamenuData.lineas.map(linea => (
                  <li key={linea}>
                    <Link to="/productos" className="text-base text-[#594A42] hover:text-[#2B341F] transition-all truncate block font-clofie font-light">{linea}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* AMBIENTES */}
            <div className="w-[220px]">
              <h3 className="text-[14px] font-outersans font-thin text-[#8C7A6B] uppercase mb-6 tracking-[0.4em]">Ambientes</h3>
              <ul className="space-y-2">
                {megamenuData.ambientes.map(amb => {
                  const isHovered = activeAmbiente.name === amb.name;
                  return (
                    <li key={amb.name}>
                      <button
                        onMouseEnter={() => setActiveAmbiente(amb)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all font-clofie font-light text-base ${isHovered ? 'bg-[#FDFBF7] shadow-sm text-[#2B341F]' : 'text-[#8C7A6B] hover:bg-[#E2D8CC]'}`}
                      >
                        <amb.icon size={18} className={`mr-3 ${isHovered ? 'opacity-100' : 'opacity-70'}`} />
                        {amb.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* LÍNEAS EN AMBIENTE */}
            <div className="w-[200px] relative px-6">
              <h3 className="text-[14px] font-outersans font-thin text-[#8C7A6B] uppercase mb-6 tracking-[0.4em] truncate">Líneas en {activeAmbiente.name}</h3>
              <div className="absolute left-0 top-14 bottom-0 w-[1px] bg-[#D9CDB8]"></div>
              <ul className="space-y-4">
                {activeAmbiente.lineas.map(linea => (
                  <li key={linea}>
                    <Link to="/productos" className="text-base font-clofie font-light text-[#594A42] hover:text-[#2B341F] hover:font-medium transition-all block">{linea}</Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 text-[12px] font-clofie font-light text-[#A69785] leading-relaxed pr-4">
                Estas líneas cuentan con piezas diseñadas específicamente para el ambiente {activeAmbiente.name}.
              </div>
            </div>

            {/* CONTACTO */}
            <div className="w-[300px] pl-6 flex flex-col justify-start">
              <h3 className="text-[14px] font-outersans font-thin text-[#8C7A6B] uppercase mb-6 tracking-[0.4em]">Contacto</h3>
              
              <div className="space-y-2 mb-6">
                <button className="w-full flex items-center justify-between px-5 py-4 bg-[#594A42] text-white rounded-xl hover:bg-[#403429] transition-colors group shadow-md shadow-[#ECE2D2]/50">
                  <div className="text-left">
                    <div className="text-[10px] tracking-widest uppercase font-bold text-white/70 mb-0.5">Asistente Gaci</div>
                    <div className="text-[13px] font-light text-white/90">Charla con nosotros</div>
                  </div>
                  <Bot size={24} className="opacity-90 group-hover:scale-110 transition-transform" />
                </button>
                <button className="w-full flex items-center px-5 py-3 hover:bg-[#E2D8CC] rounded-xl transition-colors text-[#594A42] hover:text-[#2B341F]">
                  <MessageCircle size={18} className="mr-4 opacity-70" />
                  <span className="text-[13px] font-medium">WhatsApp</span>
                </button>
                <button className="w-full flex items-center px-5 py-3 hover:bg-[#E2D8CC] rounded-xl transition-colors text-[#594A42] hover:text-[#2B341F]">
                  <Users size={18} className="mr-4 opacity-70" />
                  <span className="text-[13px] font-medium">Trabajá con nosotros</span>
                </button>
              </div>

              {/* PROMO CARD (Nueva Coleccion Kyoto) */}
              <div className="relative h-[220px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer border border-[#D9CDB8]">
                {/* Fallback image that gives the vibe */}
                <img src="https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=600&auto=format&fit=crop" alt="Esencia Kyoto 2024" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B341F]/90 via-[#2B341F]/40 to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-[14px] font-outersans font-thin uppercase tracking-[0.4em] text-[#ECE2D2] mb-1.5 opacity-90">Nueva Colección</div>
                  <div className="text-[#ECE2D2] text-2xl font-godber font-normal uppercase tracking-[0.05em] leading-tight">Esencia Kyoto 2024</div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


interface NavbarProps {
  onLogoClick: () => void;
  onProductClick: (product: Product) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogoClick, onProductClick }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 2) {
      const lowerValue = value.toLowerCase();

      // Sugerencia Inteligente: 
      if (lowerValue.includes('mesa') && lowerValue.includes('living')) {
        const oslo = Object.values(productData).flat().find(p => p.title.includes('OSLO'));
        if (oslo) {
          setSuggestions([oslo]);
          return;
        }
      }

      // Búsqueda genérica
      const filtered = Object.values(productData).flat().filter(p =>
        p.title.toLowerCase().includes(lowerValue) ||
        p.shortDescription.toLowerCase().includes(lowerValue)
      ).slice(0, 3);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (product: Product) => {
    onProductClick(product);
    setSearchQuery('');
    setSuggestions([]);
    setIsSearchExpanded(false);
  };

  return (
    <nav
      className="sticky top-0 left-0 right-0 z-[100] bg-[#FAF8F5] border-b border-[#EAE3D9] py-3 shadow-sm"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">

        {/* Logo */}
        <div className="flex-shrink-0">
          <button onClick={onLogoClick} className="block group cursor-pointer">
            <img
              src="https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/website/1/logo/Muebles%20Gacela?unique=c3c510b"
              alt="Gacela"
              className="h-9 md:h-11 w-auto object-contain transition-transform group-hover:scale-105 duration-500"
            />
          </button>
        </div>

        {/* Menú Desktop Principal */}
        <div className="hidden lg:flex items-center space-x-6">
          {topNavItems.map((item) => (
            <div
              key={item}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item)}
            >
              {item === 'Productos' ? (
                <button 
                  className={`flex items-center py-2 text-[14px] uppercase tracking-widest transition-colors group font-clofie font-bold italic ${activeDropdown === item ? 'text-[#2B341F]' : 'text-[#8C7A6B] hover:text-[#594A42]'}`}
                >
                  {item}
                  <ChevronDown size={14} className={`ml-1.5 transition-transform duration-300 ${activeDropdown === item ? 'rotate-180 text-[#2B341F]' : 'text-[#A69785]'}`} strokeWidth={2} />
                </button>
              ) : (
                <Link to={item === 'Nosotros' ? '/nosotros' : item === 'Novedades' ? '/novedades' : item === 'Contacto' ? '/contacto' : item === 'Aberturas' ? '/aberturas' : '#'}
                  className={`flex items-center py-2 text-[14px] uppercase tracking-widest transition-colors group font-clofie font-bold italic ${activeDropdown === item ? 'text-[#2B341F]' : 'text-[#8C7A6B] hover:text-[#594A42]'}`}
                >
                  {item}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mega Menu Dropdown */}
        <MegaMenu 
          active={activeDropdown === 'Productos'} 
          onMouseLeave={() => setActiveDropdown(null)} 
        />

        {/* Acciones Derecha */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="flex items-center relative z-[201]">
            <AnimatePresence>
              {isSearchExpanded && (
                <div className="relative">
                  <motion.input
                    autoFocus
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="¿Qué buscás para tu hogar?"
                    className="bg-[#EAE3D9] border-none px-4 py-1.5 text-[13px] rounded-md focus:ring-1 focus:ring-[#8C7A6B] outline-none text-[#594A42] placeholder:text-[#A69785]"
                  />

                  {/* Sugerencias Inteligentes */}
                  <AnimatePresence>
                    {suggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 w-[280px] bg-white rounded-2xl shadow-xl border border-[#EAE3D9] overflow-hidden flex flex-col z-[202]"
                      >
                        <div className="px-4 py-2 bg-[#FDFBF7] text-[10px] uppercase tracking-widest font-bold text-[#A69785] border-b border-[#EAE3D9]">
                          Sugerencias para vos
                        </div>
                        {suggestions.map((product) => (
                          <button
                            type="button"
                            key={product.id}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleSuggestionClick(product);
                            }}
                            className="flex items-center p-3 hover:bg-[#FDFBF7] group transition-colors text-left w-full border-b border-[#EAE3D9] last:border-0 cursor-pointer"
                          >
                            <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover mr-3 border border-[#EAE3D9]" />
                            <div>
                              <p className="text-[12px] font-bold text-[#2B341F] group-hover:text-[#594A42] transition-colors">{product.title}</p>
                              <p className="text-[10px] text-[#8C7A6B] line-clamp-1">{product.shortDescription}</p>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </AnimatePresence>
            <button
              onClick={() => {
                setIsSearchExpanded(!isSearchExpanded);
                if (isSearchExpanded) {
                  setSuggestions([]);
                  setSearchQuery('');
                }
              }}
              className="p-2 text-[#8C7A6B] hover:text-[#2B341F] transition-colors"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
          </div>

          <a href="https://www.instagram.com/gacelamuebles/" target="_blank" rel="noopener noreferrer" className="hidden md:block p-2 text-[#8C7A6B] hover:text-[#2B341F] transition-colors">
            <Instagram size={18} strokeWidth={1.5} />
          </a>

          <button
            className="lg:hidden p-2 text-[#2B341F]"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Menú Móvil Rediseñado */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[300] bg-[#FAF8F5] flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-[#EAE3D9] bg-white">
              <img
                src="https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/website/1/logo/Muebles%20Gacela?unique=c3c510b"
                alt="Gacela"
                className="h-8 w-auto"
              />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-[#594A42]">
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 flex flex-col space-y-6">
               <h2 className="text-[14px] font-outersans font-thin uppercase tracking-[0.4em] text-[#A69785] border-b border-[#EAE3D9] pb-3 mb-2">Menú Principal</h2>
               {topNavItems.map(item => (
                 <Link
                   key={item}
                   to={item === 'Productos' ? '/productos' : item === 'Nosotros' ? '/nosotros' : item === 'Novedades' ? '/novedades' : item === 'Contacto' ? '/contacto' : item === 'Aberturas' ? '/aberturas' : '#'}
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="font-godber text-4xl text-[#2B341F] active:text-[#594A42] uppercase tracking-[0.05em]"
                 >
                   {item}
                 </Link>
               ))}

               <div className="mt-8 pt-8 border-t border-[#EAE3D9]">
                 <h2 className="text-[14px] font-outersans font-thin uppercase tracking-[0.4em] text-[#A69785] pb-4">Contacto Directo</h2>
                 <button className="w-full flex items-center justify-between px-5 py-4 bg-[#594A42] text-white rounded-xl mb-3">
                   <div className="text-left">
                     <div className="text-[10px] tracking-widest uppercase font-bold text-white/70 mb-0.5">Asistente Gaci</div>
                     <div className="text-[13px] font-light">Charla con nosotros</div>
                   </div>
                   <Bot size={24} className="opacity-90" />
                 </button>
                 <button className="w-full flex items-center px-5 py-3 bg-[#EAE3D9] rounded-xl text-[#594A42] font-medium">
                   <MessageCircle size={18} className="mr-3 opacity-70" />
                   WhatsApp
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
