
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Armchair,
  Layers,
  Wrench,
  Sparkles,
  MapPin,
  Search,
  Instagram,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

import { Product } from '../types/product';
import { productData } from './PopularProducts';

interface NavItem {
  label: string;
  icon: React.ElementType;
  submenu: { label: string; isHighlight?: boolean }[];
}

const navItems: NavItem[] = [
  {
    label: 'Productos',
    icon: Armchair,
    submenu: [{ label: 'Living' }, { label: 'Dormitorio' }, { label: 'Home Office' }, { label: 'Comedor' }, { label: 'Lo Nuevo' }]
  },
  {
    label: 'Líneas',
    icon: Layers,
    submenu: [{ label: 'Escandinava' }, { label: 'Industrial' }, { label: 'Kids' }, { label: 'Office' }]
  },
  {
    label: 'Guías de Armado',
    icon: Wrench,
    submenu: [{ label: 'Asistente Gaci', isHighlight: true }, { label: 'Buscador de Manuales' }, { label: 'Video Tips' }]
  },
  {
    label: 'Inspiración',
    icon: Sparkles,
    submenu: [{ label: 'Galería de Clientes' }, { label: 'Ideas de Deco' }, { label: 'Espacios Gacela' }]
  },
  {
    label: 'Dónde Comprar',
    icon: MapPin,
    submenu: [{ label: 'Tienda Online' }, { label: 'Distribuidores' }, { label: 'Venta Mayorista' }]
  },
];

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

      // Inteligencia Artificial / Lógica de Negocio: 
      // Si busca "mesa" y "living", sugerir específicamente OSLO
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
      className="sticky top-0 left-0 right-0 z-[100] bg-white border-b border-gray-100 py-4 shadow-sm"
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">

        {/* Logo */}
        <div className="flex-shrink-0">
          <button onClick={onLogoClick} className="block group cursor-pointer">
            <img
              src="https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/website/1/logo/Muebles%20Gacela?unique=c3c510b"
              alt="Gacela"
              className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105 duration-500"
            />
          </button>
        </div>

        {/* Menú Desktop */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center px-4 py-2 text-[13px] font-medium text-brand-text/70 hover:text-brand-text transition-colors group">
                <item.icon size={15} className="mr-2 opacity-60 stroke-[1.5px]" />
                <span className="relative">
                  {item.label}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeDropdown === item.label ? 1 : 0 }}
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-brand-dark-green origin-left"
                  />
                </span>
                <ChevronDown size={12} className={`ml-1 transition-transform duration-300 opacity-40 ${activeDropdown === item.label ? 'rotate-180' : ''}`} strokeWidth={1} />
              </button>

              <AnimatePresence>
                {activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 min-w-[220px] bg-white shadow-[0_15px_50px_-15px_rgba(0,0,0,0.12)] rounded-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="p-2">
                      {item.submenu.map((sub) => (
                        <a
                          key={sub.label}
                          href="#"
                          className={`block px-4 py-2.5 text-[13px] rounded-lg transition-all ${sub.isHighlight
                            ? 'text-brand-dark-green font-bold bg-brand-bg/50'
                            : 'text-gray-600 hover:bg-brand-bg hover:text-brand-text'
                            }`}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Acciones Derecha */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="flex items-center relative">
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
                    className="bg-brand-bg border-none px-4 py-1.5 text-[13px] rounded-full focus:ring-1 focus:ring-brand-dark-green/30 outline-none"
                  />

                  {/* Sugerencias Inteligentes */}
                  <AnimatePresence>
                    {suggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 w-[280px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col z-50"
                      >
                        <div className="px-4 py-2 bg-gray-50 text-[10px] uppercase tracking-widest font-bold text-gray-400 border-b border-gray-100">
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
                            className="flex items-center p-3 hover:bg-brand-bg group transition-colors text-left w-full border-none cursor-pointer"
                          >
                            <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover mr-3 bg-gray-100" />
                            <div>
                              <p className="text-[12px] font-bold text-brand-text group-hover:text-brand-dark-green transition-colors">{product.title}</p>
                              <p className="text-[10px] text-gray-400 line-clamp-1">{product.shortDescription}</p>
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
              className="p-2 text-brand-text/50 hover:text-brand-text transition-colors"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
          </div>

          <a href="#" className="hidden md:block p-2 text-brand-text/50 hover:text-brand-text transition-colors">
            <Instagram size={18} strokeWidth={1.5} />
          </a>

          <button
            className="lg:hidden p-2 text-brand-text"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-gray-100">
              <img
                src="https://petit-muebles-gacela-srl-mueblesgacela-odoo-sh.odoo.com/web/image/website/1/logo/Muebles%20Gacela?unique=c3c510b"
                alt="Gacela"
                className="h-8 w-auto"
              />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X size={28} strokeWidth={1} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {navItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                    <item.icon size={14} className="mr-2" />
                    {item.label}
                  </div>
                  <div className="space-y-4 pl-6">
                    {item.submenu.map((sub) => (
                      <a
                        key={sub.label}
                        href="#"
                        className={`block text-lg font-light ${sub.isHighlight ? 'text-brand-dark-green font-medium' : 'text-brand-text'}`}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


export default Navbar;
