import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Catalog from './components/Catalog';
import ProductDetail from './components/ProductDetail';
import GaciStepByStep from './components/GaciStepByStep';
import ARLandingPage from './components/ARLandingPage';
import ScrollToTop from './components/ScrollToTop';
import Nosotros from './components/Nosotros';
import Novedades from './components/Novedades';
import SinglePost from './components/SinglePost';
import AdminNewsDraft from './components/AdminNewsDraft';
import { Product } from './types/product';
import GaciBot from './components/GaciBot';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import WarrantyPolicy from './components/WarrantyPolicy';
import FAQ from './components/FAQ';
import ClaimsForm from './components/ClaimsForm';
import WorkWithUs from './components/WorkWithUs';
import Contacto from './components/Contacto';
import Aberturas from './components/Aberturas';
import Prueba from './components/Prueba';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // We keep a temporary state for the selected product to pass full objects to components
  // until the full CMS / data fetching by ID is implemented in Phase 2/3.
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    
    // Attempt to extract Linea and SKU. Support both Product interface and the raw JSON fields.
    const lineaRaw = (product as any).linea || (product as any).Linea || 'producto';
    const lineaSlug = typeof lineaRaw === 'string' ? lineaRaw.toLowerCase().replace(/\s+/g, '-') : 'producto';
    const sku = product.sku || product.id;
    
    navigate(`/${lineaSlug}/${sku}`);
  };

  const handleLogoClick = () => {
    navigate('/');
    setSelectedProduct(null);
  };

  const handleStartAssembly = (product: Product) => {
    setSelectedProduct(product);
    navigate(`/armado/${product.id}`);
  };

  const handleBackToPdp = () => {
    navigate(-1); // Go back to previous route
  };

  const handleStartAR = (product: Product | null) => {
    setSelectedProduct(product);
    navigate(`/ar`);
  };

  // We need to map the view name for ScrollToTop compatibility during transition
  const currentView = location.pathname === '/' ? 'home' : 
                      location.pathname.includes('/productos/') ? 'pdp' : 
                      location.pathname.includes('/armado/') ? 'gaciStepByStep' : 
                      location.pathname.includes('/ar') ? 'arLandingPage' : 
                      location.pathname.includes('/terminos-y-condiciones') || 
                      location.pathname.includes('/politica-de-privacidad') ||
                      location.pathname.includes('/politica-de-garantia') ||
                      location.pathname.includes('/preguntas-frecuentes') ||
                      location.pathname.includes('/formulario-de-reclamos') ||
                      location.pathname.includes('/trabaja-con-nosotros') ? 'legal' : 'home';

  return (
    <div className="bg-brand-bg font-sans text-brand-primary">
      <ScrollToTop />
      <TopBar />
      <Navbar onLogoClick={handleLogoClick} onProductClick={handleProductClick} />

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route 
              path="/" 
              element={<Home onProductClick={handleProductClick} onStartAR={handleStartAR} />} 
            />
            <Route 
              path="/nosotros" 
              element={<Nosotros />} 
            />
            <Route 
              path="/novedades" 
              element={<Novedades />} 
            />
            <Route 
              path="/novedades/:slug" 
              element={<SinglePost />} 
            />
            <Route 
              path="/productos" 
              element={<Catalog />} 
            />
            {/* Phase 3: Products Route using /:linea/:sku */}
            <Route 
              path="/:linea/:sku" 
              element={
                <ProductDetail 
                  product={selectedProduct} // Pass it if coming from home, ProductDetail will fallback to JSON if missing
                  onBackClick={handleLogoClick} 
                  onStartAssembly={handleStartAssembly} 
                  onStartAR={handleStartAR} 
                />
              } 
            />
            <Route 
              path="/armado/:slug" 
              element={
                selectedProduct ? (
                  <GaciStepByStep 
                    product={selectedProduct} 
                    onBackToPdp={handleBackToPdp} 
                    onBackToHome={handleLogoClick} 
                  />
                ) : (
                  <div className="py-24 text-center">Producto no encontrado. <button onClick={() => navigate('/')} className="text-brand-support underline">Volver al inicio</button></div>
                )
              } 
            />
            <Route 
              path="/ar" 
              element={
                <ARLandingPage 
                  onBackToPdp={handleBackToPdp} 
                  initialSelectedProduct={selectedProduct} 
                />
              } 
            />
            <Route 
              path="/terminos-y-condiciones" 
              element={<TermsAndConditions />} 
            />
            <Route 
              path="/politica-de-privacidad" 
              element={<PrivacyPolicy />} 
            />
            <Route 
              path="/politica-de-garantia" 
              element={<WarrantyPolicy />} 
            />
            <Route 
              path="/preguntas-frecuentes" 
              element={<FAQ />} 
            />
            <Route 
              path="/formulario-de-reclamos" 
              element={<ClaimsForm />} 
            />
            <Route 
              path="/trabaja-con-nosotros" 
              element={<WorkWithUs />} 
            />
            <Route 
              path="/contacto" 
              element={<Contacto />} 
            />
            <Route 
              path="/aberturas" 
              element={<Aberturas />} 
            />
            <Route 
              path="/admin-novedades" 
              element={<AdminNewsDraft />} 
            />
            <Route 
              path="/prueba" 
              element={<Prueba />} 
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />

      {/* GaciBot Persistente */}
      {/* <GaciBot /> */}
    </div>
  );
};

export default App;