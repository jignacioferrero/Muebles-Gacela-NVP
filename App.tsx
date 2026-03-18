
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'; // Importa AnimatePresence y motion
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import PopularProducts from './components/PopularProducts';
import QualitySustainability from './components/QualitySustainability';
import AugmentedReality from './components/AugmentedReality';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail'; // Nuevo componente PDP
import GaciStepByStep from './components/GaciStepByStep'; // Nuevo componente GaciStepByStep
import ARLandingPage from './components/ARLandingPage'; // Nuevo componente ARLandingPage
import ScrollToTop from './components/ScrollToTop'; // Importar ScrollToTop
import { Product } from './types/product'; // Importa la interfaz Product
import GaciBot from './components/GaciBot'; // Importar GaciBot

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'pdp' | 'gaciStepByStep' | 'arLandingPage'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('pdp');
  };

  const handleLogoClick = () => {
    setView('home');
    setSelectedProduct(null); // Limpiar producto seleccionado al volver a Home
  };

  const handleStartAssembly = (product: Product) => {
    setSelectedProduct(product);
    setView('gaciStepByStep');
  };

  const handleBackToPdp = () => {
    setView('pdp');
  }

  const handleStartAR = (product: Product | null) => {
    // Si se viene desde PDP, el producto ya estará seleccionado.
    // Si se llega de otra forma, se podría establecer aquí.
    setSelectedProduct(product);
    setView('arLandingPage');
  }

  return (
    <div className="bg-brand-bg font-sans text-brand-text">
      <ScrollToTop view={view} selectedProductId={selectedProduct?.id} />
      <TopBar />
      <Navbar onLogoClick={handleLogoClick} onProductClick={handleProductClick} />

      <main>
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Hero />
              <CategoryGrid />
              <PopularProducts onProductClick={handleProductClick} />
              <QualitySustainability />
              <AugmentedReality onStartAR={() => handleStartAR(null)} /> {/* Pasa null si no hay un producto específico desde la Home */}
              <Newsletter />
            </motion.div>
          )}
          {view === 'pdp' && selectedProduct && (
            <motion.div
              key="pdp"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ProductDetail
                product={selectedProduct}
                onBackClick={handleLogoClick}
                onStartAssembly={handleStartAssembly}
                onStartAR={handleStartAR}
              />
            </motion.div>
          )}
          {view === 'gaciStepByStep' && selectedProduct && (
            <motion.div
              key="gaciStepByStep"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GaciStepByStep product={selectedProduct} onBackToPdp={handleBackToPdp} onBackToHome={handleLogoClick} />
            </motion.div>
          )}
          {view === 'arLandingPage' && (
            <motion.div
              key="arLandingPage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ARLandingPage
                onBackToPdp={handleBackToPdp}
                initialSelectedProduct={selectedProduct} // Pasa el producto seleccionado si lo hay
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />

      {/* GaciBot Persistente */}
      <GaciBot />
    </div>
  );
};


export default App;