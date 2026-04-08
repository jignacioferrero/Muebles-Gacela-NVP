
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Camera, Upload, Home, BoxSelect, ArrowRight, Check, Sparkles, Loader2, Download, RefreshCw, XCircle, Star } from 'lucide-react';
import { Product } from '../types/product';
import { productData } from './PopularProducts'; // Importa productData

type ARStep = 'welcome' | 'upload' | 'selectProduct' | 'generate' | 'result';

interface ARLandingPageProps {
  onBackToPdp: () => void;
  initialSelectedProduct: Product | null;
}

const ARLandingPage: React.FC<ARLandingPageProps> = ({ onBackToPdp, initialSelectedProduct }) => {
  const [currentStep, setCurrentStep] = useState<ARStep>('welcome');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedLine, setSelectedLine] = useState<string>(Object.keys(productData)[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(initialSelectedProduct);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Scroll to top on step change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor, sube un archivo de imagen válido.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setCurrentStep('selectProduct'); // Avanza automáticamente al siguiente paso
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor, sube un archivo de imagen válido.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setCurrentStep('selectProduct'); // Avanza automáticamente al siguiente paso
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = () => {
    if (!uploadedImage || !selectedProduct) {
      setError('Por favor, sube una imagen y selecciona un mueble antes de generar.');
      return;
    }

    setIsLoading(true);
    setError(null);
    // Simulación de la llamada a la API y generación de imagen
    setTimeout(() => {
      // Mock de una imagen generada. En un escenario real, esto sería una combinación
      // de la imagen de fondo y el mueble.
      const mockGenerated = 'https://i.postimg.cc/wjxwx0K3/Gemini-Generated-Image-m0wdc2m0wdc2m0wd.png'; // Reemplazar con una URL real o manipulación de imágenes
      setGeneratedImageUrl(mockGenerated);
      setIsLoading(false);
      setCurrentStep('result');
    }, 2000); // Simula 2 segundos de carga
  };

  const resetAll = () => {
    setCurrentStep('welcome');
    setUploadedImage(null);
    setSelectedLine(Object.keys(productData)[0]);
    setSelectedProduct(initialSelectedProduct);
    setGeneratedImageUrl(null);
    setIsLoading(false);
    setError(null);
    setIsLightboxOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleBackNavigation = () => {
    if (currentStep === 'upload') setCurrentStep('welcome');
    else if (currentStep === 'selectProduct') {
      if (uploadedImage) setCurrentStep('upload');
      else setCurrentStep('welcome'); // Si no hay imagen, volver a la bienvenida
    }
    else if (currentStep === 'generate') setCurrentStep('selectProduct');
    else if (currentStep === 'result') setCurrentStep('generate');
  };

  const handleNextStep = () => {
    if (currentStep === 'welcome') setCurrentStep('upload');
    else if (currentStep === 'upload' && uploadedImage) setCurrentStep('selectProduct');
    else if (currentStep === 'selectProduct' && selectedProduct) setCurrentStep('generate');
  };

  const currentProducts = productData[selectedLine] || [];

  return (
    <div className="bg-brand-bg min-h-screen flex flex-col items-center py-16 px-6 relative overflow-hidden">
      {/* Lightbox para Imagen del Resultado */}
      <AnimatePresence>
        {isLightboxOpen && generatedImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setIsLightboxOpen(false)}
            >
              <XCircle size={40} strokeWidth={1} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={generatedImageUrl}
              alt="Tu espacio ampliado"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest uppercase pointer-events-none">
              Click fuera para cerrar
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón de Volver Global */}
      <motion.button
        onClick={onBackToPdp}
        className="absolute top-8 left-8 flex items-center text-brand-primary hover:text-brand-primary transition-colors text-sm font-semibold group z-30"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Volver a la página del producto"
      >
        <ChevronLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Volver al Producto
      </motion.button>

      <AnimatePresence mode="wait">
        {/* Paso 1: Bienvenida */}
        {currentStep === 'welcome' && (
          <motion.div
            key="ar-welcome"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl text-center z-10 flex flex-col justify-center min-h-[calc(100vh-8rem)]"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight leading-tight text-brand-primary mb-8 font-serif">
              Visualiza tu Futuro Espacio con <span className="font-medium text-brand-primary">Realidad Aumentada</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-light mb-12 max-w-2xl mx-auto">
              Proyecta virtualmente nuestros muebles en tu propia casa antes de comprar. ¡La decisión perfecta, garantizada!
            </p>
            <motion.button
              onClick={() => setCurrentStep('upload')}
              className="inline-flex items-center justify-center px-10 py-4 rounded-md text-lg font-bold uppercase tracking-widest shadow-xl group transition-all duration-300 bg-brand-support text-brand-bg hover:bg-brand-support-hover"
              aria-label="Comenzar la experiencia de Realidad Aumentada"
            >
              <BoxSelect size={24} className="mr-3 group-hover:scale-110 transition-transform" />
              Comenzar la Experiencia
            </motion.button>
          </motion.div>
        )}

        {/* Paso 2: Subir foto */}
        {currentStep === 'upload' && (
          <motion.div
            key="ar-upload"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl w-full text-center z-10 flex flex-col justify-center items-center py-16"
          >
            <h2 className="text-3xl md:text-5xl font-extralight leading-tight text-brand-primary mb-8 font-serif">
              1. Tu espacio, tu lienzo.
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-light mb-10 max-w-2xl">
              Saca una foto o sube una imagen de la habitación donde quieres probar tu mueble. Asegúrate de que haya buena luz.
            </p>

            <div className="relative w-full max-w-xl aspect-video bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-8 overflow-hidden">
              {uploadedImage ? (
                <img src={uploadedImage} alt="Espacio del usuario" className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400 text-center p-8">
                  <Upload size={48} className="mx-auto mb-4" />
                  <p className="text-lg">Sube tu foto aquí o usa tu cámara</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                aria-label="Subir foto de tu espacio"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center px-8 py-3 bg-brand-support text-brand-bg rounded-md text-sm font-semibold uppercase tracking-widest hover:bg-brand-support-hover transition-colors shadow-lg"
                aria-label="Subir foto"
              >
                <Upload size={18} className="mr-3" />
                Subir Foto
              </button>
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="flex items-center justify-center px-8 py-3 border border-gray-300 text-brand-primary rounded-md text-sm font-semibold uppercase tracking-widest hover:bg-gray-100 transition-colors"
                aria-label="Tomar foto con cámara"
              >
                <Camera size={18} className="mr-3 text-gray-500" />
                Usar Cámara
              </button>
              <input
                type="file"
                accept="image/*"
                capture="environment" // Para abrir la cámara trasera en móviles
                ref={cameraInputRef}
                onChange={handleCameraCapture}
                className="hidden"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center max-w-md mb-4"
                role="alert"
              >
                <XCircle size={20} className="mr-2 flex-shrink-0" />
                <span className="block sm:inline">{error}</span>
              </motion.div>
            )}

            <motion.button
              onClick={() => setCurrentStep('selectProduct')}
              disabled={!uploadedImage}
              className={`inline-flex items-center justify-center px-10 py-4 rounded-md text-lg font-bold uppercase tracking-widest shadow-xl group transition-all duration-300 mt-12 ${!uploadedImage
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-brand-support text-brand-bg hover:bg-brand-support-hover'
                }`}
              aria-label="Siguiente paso: seleccionar mueble"
            >
              Siguiente <ArrowRight size={24} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}

        {/* Paso 3: Seleccionar producto */}
        {currentStep === 'selectProduct' && (
          <motion.div
            key="ar-select-product"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-6xl w-full text-center z-10 flex flex-col items-center py-16"
          >
            <h2 className="text-3xl md:text-5xl font-extralight leading-tight text-brand-primary mb-8 font-serif">
              2. Elige tu Gacela ideal.
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-light mb-10 max-w-3xl">
              Explora nuestras líneas y selecciona el mueble que quieres probar en tu espacio.
            </p>

            {/* Mini Menú de Filtro (Tabs) */}
            <div className="flex justify-center mb-10 w-full">
              <div className="flex flex-wrap justify-center gap-4 md:space-x-8 border-b border-gray-200 w-full md:w-auto pb-4">
                {Object.keys(productData).map((line) => (
                  <button
                    key={line}
                    onClick={() => setSelectedLine(line)}
                    className={`pb-2 text-[13px] md:text-[14px] uppercase tracking-[0.2em] font-medium transition-all relative ${selectedLine === line ? 'text-brand-primary' : 'text-gray-400 hover:text-brand-primary'
                      }`}
                    aria-pressed={selectedLine === line}
                  >
                    {line}
                    {selectedLine === line && (
                      <motion.div
                        layoutId="activeArLineUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-support"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Grilla de Productos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLine}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="grid grid-cols-subgrid col-span-full gap-6 md:gap-8" // Trick to make grid animation work with dynamic children
                >
                  {currentProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      onClick={() => setSelectedProduct(product)}
                      className={`group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all relative ${selectedProduct?.id === product.id ? 'border-4 border-brand-support ring-2 ring-brand-dark-green/50' : 'border-2 border-gray-100 hover:border-brand-support/30'
                        }`}
                      role="radio"
                      aria-checked={selectedProduct?.id === product.id}
                      tabIndex={0}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="p-4 bg-white">
                        <h3 className="text-sm font-medium text-brand-primary/90 font-serif">{product.title}</h3>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={`${i < product.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      </div>
                      {selectedProduct?.id === product.id && (
                        <div className="absolute top-2 right-2 bg-brand-support text-brand-bg rounded-md p-1">
                          <Check size={16} />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.button
              onClick={() => setCurrentStep('generate')}
              disabled={!selectedProduct}
              className={`inline-flex items-center justify-center px-10 py-4 rounded-md text-lg font-bold uppercase tracking-widest shadow-xl group transition-all duration-300 mt-12 ${!selectedProduct
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-brand-support text-brand-bg hover:bg-brand-support-hover'
                }`}
              aria-label="Siguiente paso: generar imagen"
            >
              Siguiente <ArrowRight size={24} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}

        {/* Paso 4: Generar imagen */}
        {currentStep === 'generate' && (
          <motion.div
            key="ar-generate"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl w-full text-center z-10 flex flex-col justify-center items-center py-16"
          >
            <h2 className="text-3xl md:text-5xl font-extralight leading-tight text-brand-primary mb-8 font-serif">
              3. ¡La magia sucede!
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-light mb-10 max-w-2xl">
              Estás a un solo click de ver tu mueble Gacela en tu propio espacio. Confirma tus selecciones y prepárate para visualizar tu hogar.
            </p>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-12">
              <div className="relative w-40 h-40 rounded-lg overflow-hidden shadow-md border border-gray-200">
                <img src={uploadedImage || ''} alt="Tu espacio" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold uppercase p-2">
                  Tu Espacio
                </div>
              </div>
              <ArrowRight size={32} className="text-brand-primary" />
              <div className="relative w-40 h-40 rounded-lg overflow-hidden shadow-md border border-gray-200">
                <img src={selectedProduct?.image || ''} alt={selectedProduct?.title || 'Mueble'} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-bold uppercase p-2">
                  {selectedProduct?.title || 'Mueble'}
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleGenerateImage}
              disabled={isLoading}
              className={`inline-flex items-center justify-center px-10 py-4 rounded-md text-lg font-bold uppercase tracking-widest shadow-xl group transition-all duration-300 mt-12 ${isLoading
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-brand-support text-brand-bg hover:bg-brand-support-hover'
                }`}
              aria-label="Probar en mi espacio ahora"
            >
              {isLoading ? (
                <>
                  <Loader2 size={24} className="mr-3 animate-spin" />
                  Generando imagen...
                </>
              ) : (
                <>
                  <Sparkles size={24} className="mr-3 group-hover:scale-110 transition-transform" />
                  Probar en mi espacio ahora
                </>
              )}
            </motion.button>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center max-w-md mt-8"
                role="alert"
              >
                <XCircle size={20} className="mr-2 flex-shrink-0" />
                <span className="block sm:inline">{error}</span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Paso 5: Resultado */}
        {currentStep === 'result' && generatedImageUrl && (
          <motion.div
            key="ar-result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl w-full text-center z-10 flex flex-col justify-center items-center py-16"
          >
            <h2 className="text-3xl md:text-5xl font-extralight leading-tight text-brand-primary mb-8 font-serif">
              ¡Tu nuevo espacio, visualizado!
            </h2>
            <p className="text-lg md:text-xl text-gray-700 font-light mb-10 max-w-2xl">
              Así es como se ve tu selección de Gacela en tu propio espacio. ¡Esperamos que te encante!
            </p>

            <motion.div
              layoutId="ar-image-container"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
              className="relative w-full max-w-xl aspect-[4/3] rounded-xl shadow-2xl border-4 border-white mb-12 overflow-hidden cursor-zoom-in group"
              onClick={() => setIsLightboxOpen(true)}
            >
              <img src={generatedImageUrl} alt="Imagen de realidad aumentada generada" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                <Sparkles size={32} className="mr-3 animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-widest">Ver pantalla completa</span>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={generatedImageUrl}
                download="gacela-ar-space.png"
                className="flex items-center justify-center px-8 py-3 bg-brand-support text-brand-bg rounded-md text-sm font-semibold uppercase tracking-widest hover:bg-brand-support-hover transition-colors shadow-lg"
                aria-label="Descargar imagen generada"
              >
                <Download size={18} className="mr-3" />
                Descargar Imagen
              </a>
              <button
                onClick={() => setCurrentStep('selectProduct')}
                className="flex items-center justify-center px-8 py-3 border border-gray-300 text-brand-primary rounded-md text-sm font-semibold uppercase tracking-widest hover:bg-gray-100 transition-colors"
                aria-label="Probar otro mueble"
              >
                <RefreshCw size={18} className="mr-3 text-gray-500" />
                Probar otro mueble
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button
                onClick={resetAll}
                className="flex items-center justify-center px-8 py-3 border border-gray-300 text-brand-primary rounded-md text-sm font-semibold uppercase tracking-widest hover:bg-gray-100 transition-colors"
                aria-label="Volver a empezar todo el proceso"
              >
                <Home size={18} className="mr-3 text-gray-500" />
                Volver a Empezar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default ARLandingPage;