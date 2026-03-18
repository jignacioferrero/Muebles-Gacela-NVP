
import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, ArrowRightIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark-green text-white font-sans">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h4 className="font-bold text-lg mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white">Inicio</a></li>
              <li><a href="#" className="hover:text-white">Nosotros</a></li>
              <li><a href="#" className="hover:text-white">Productos</a></li>
              <li><a href="#" className="hover:text-white">Novedades</a></li>
              <li><a href="#" className="hover:text-white">Tienda</a></li>
              <li><a href="#" className="hover:text-white">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">About Us</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Acerca de equips of personos apossonoronodos, ouyo objetivo de veido de tmees de traxes de productos.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="mailto:hola@mueblesgacela.com.ar" className="hover:text-white">hola@mueblesgacela.com.ar</a></li>
              <li><a href="tel:3554822342" className="hover:text-white">(355) 4822342</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Social Media</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-300 hover:text-white"><FacebookIcon className="h-6 w-6" /></a>
              <a href="#" className="text-gray-300 hover:text-white"><TwitterIcon className="h-6 w-6" /></a>
              <a href="#" className="text-gray-300 hover:text-white"><InstagramIcon className="h-6 w-6" /></a>
              <a href="#" className="text-gray-300 hover:text-white"><YoutubeIcon className="h-6 w-6" /></a>
            </div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <form className="flex">
              <input type="email" placeholder="Signuo newsletter" className="w-full bg-white/20 text-white placeholder-gray-300 text-sm px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-white/50" />
              <button type="submit" className="bg-white text-brand-dark-green px-4 py-2 rounded-r-full hover:bg-gray-200">
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="container mx-auto px-6 py-6 text-sm text-gray-400 text-center md:text-left">
          <p>&copy; 2024 Gacela Muebles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
