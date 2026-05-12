
import React from 'react';
import { User } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="bg-[#333333] text-[#F5F5F0] py-2 px-6 lg:px-12 transition-colors duration-500">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-[10px] md:text-[11px] font-light tracking-[0.15em] uppercase opacity-80">
          FÁBRICA ARGENTINA DE MUEBLES
        </div>
        
        <div className="flex items-center">
          <a 
            href="#" 
            className="flex items-center text-[10px] md:text-[11px] font-medium tracking-wider hover:text-white transition-colors duration-300 group"
          >
            <User size={14} className="mr-2 opacity-60 group-hover:opacity-100 transition-opacity stroke-[1.5px]" />
            <span className="uppercase">Venta Mayorista</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
