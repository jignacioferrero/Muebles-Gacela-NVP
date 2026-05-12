
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Bot, ChevronLeft, Timer, HardHat, Hammer, Hexagon, Droplet, Wrench, ArrowRight, Check, AlertTriangle, Crown, Sparkles, BookOpen, Music, ExternalLink } from 'lucide-react';
import ImageViewer from './ImageViewer';
import VideoViewer from './VideoViewer';
import PieceViewer3D from './PieceViewer3D';
import confetti from 'canvas-confetti';

const LucideIcons: { [key: string]: React.ComponentType<any> } = {
  Hammer: Hammer,
  Wrench: Wrench,
  Hexagon: Hexagon,
  Droplet: Droplet,
  BookOpen: BookOpen,
  Music: Music,
};

interface GaciStepByStepProps {
  product: {
    title: string;
    assemblyTime: string;
    difficulty: string;
    assemblyTools: { name: string; icon: string; included: boolean }[];
  };
  onBackToPdp: () => void;
  onBackToHome: () => void; // New prop for navigating to home
}

type GaciView = 'welcome' | 'tools' | 'step1' | 'step2' | 'step3' | 'step4'; // Add step4

const GaciStepByStep: React.FC<GaciStepByStepProps> = ({ product, onBackToPdp, onBackToHome }) => {
  const [currentView, setCurrentView] = useState<GaciView>('welcome');
  const [userName, setUserName] = useState<string>(''); // Nuevo estado para el nombre del usuario
  const [checklistItems, setChecklistItems] = useState([
    { id: 'A', label: 'Tapa', checked: false, imageUrl: 'https://accesorioscocina.com/wp-content/uploads/2018/01/juego-protector-campana90.png', dimensions: '120x60x1.5', modelUrl: '/Modelos 3d/primera pieza terminada.obj' },
    { id: 'B', label: 'Piso', checked: false, imageUrl: 'https://accesorioscocina.com/wp-content/uploads/2018/01/juego-protector-campana90.png', dimensions: '120x60x1.5', modelUrl: '/maderita.gltf', finishes: ['roble', 'roble', 'blanco', 'roble', 'roble', 'roble'] },
    { id: 'C/D', label: 'Costados (Izquierdo y Derecho)', checked: false, imageUrl: 'https://accesorioscocina.com/wp-content/uploads/2018/01/juego-protector-campana90.png', dimensions: '80x60x1.5' },
    { id: 'F', label: 'Entrepiso', checked: false, imageUrl: 'https://accesorioscocina.com/wp-content/uploads/2018/01/juego-protector-campana90.png', dimensions: '117x58x1.5' },
    { id: 'E', label: 'Separador abajo', checked: false, imageUrl: 'https://accesorioscocina.com/wp-content/uploads/2018/01/juego-protector-campana90.png', dimensions: '30x58x1.5' },
    { id: 'H', label: 'Separador arriba', checked: false, imageUrl: 'https://accesorioscocina.com/wp-content/uploads/2018/01/juego-protector-campana90.png', dimensions: '15x58x1.5' },
    { id: 'I', label: 'Base de patas', checked: false, imageUrl: 'https://accesorioscocina.com/wp-content/uploads/2018/01/juego-protector-campana90.png', dimensions: '110x10x3' },
    { id: 'L', label: 'Frentes de cajón', checked: false, imageUrl: 'https://accesorioscocina.com/wp-content/uploads/2018/01/juego-protector-campana90.png', dimensions: '58x20x1.5' },
    { id: 'M', label: 'Costados de cajón', checked: false, imageUrl: 'https://accesorioscocina.com/wp-content/uploads/2018/01/juego-protector-campana90.png', dimensions: '50x15x1.2' },
    { id: 'N', label: 'Fondos de cajón', checked: false, imageUrl: 'https://accesorioscocina.com/wp-content/uploads/2018/01/juego-protector-campana90.png', dimensions: '55x48x0.3' },
    { id: 'FondoMueble', label: 'Fondo de mueble', checked: false, imageUrl: 'https://accesorioscocina.com/wp-content/uploads/2018/01/juego-protector-campana90.png', dimensions: '120x80x0.3' },
    { id: 'Herrajes', label: 'Bolsa con herrajes', checked: false, imageUrl: 'https://verduonlinestore.com/img/cms/Blog/embolsado%20de%20herrajes%20ferreteria.jpg' },
  ]);

  const [hardwareChecklistItems, setHardwareChecklistItems] = useState([
    { id: 'pernos', label: '19 Pernos Minifix con caja', description: 'Los vas a usar para las uniones principales.', checked: false, imageUrl: 'https://renk-herrajes.com.ar/wp-content/uploads/2018/04/herrajes-renk-minifix-metalico-1.jpg' },
    { id: 'tornillos_allen', label: '17 Tornillos Allen (7x50)', description: 'Los más largos, se ajustan con la llave que viene en la caja.', checked: false, imageUrl: 'https://i.postimg.cc/sX13d964/tornillos-allen.png' },
    { id: 'tarugos', label: '30 Tarugos de madera (6x30)', description: '', checked: false, imageUrl: 'https://i.postimg.cc/Qtx1zD5D/tarugos-demadera.png' },
    { id: 'guias_metalicas', label: '4 Pares de guías metálicas', description: 'Fíjate que son 8 piezas en total.', checked: false, imageUrl: 'https://i.postimg.cc/q733G5tq/guias-metalicas.png' },
    { id: 'cola_vinilica', label: '1 Envase de cola vinílica', description: 'Úsala sin miedo pero con cuidado.', checked: false, imageUrl: 'https://i.postimg.cc/MGgH1N7x/cola-vinilica.png' },
    { id: 'tornilleria_variada', label: 'Tornillería variada', description: '16 Varianta, 16 de 3.5x20, 8 de 4x40 y 6 de 3.5x25.', checked: false, imageUrl: 'https://i.postimg.cc/CKbVn7tM/tornilleria-variada.png' },
    { id: 'manijas_clavos', label: '4 Manijas y el Set de clavos', description: '', checked: false, imageUrl: 'https://i.postimg.cc/y8B3fV8B/manijas-clavos.png' },
  ]);

  const [step3ChecklistItems, setStep3ChecklistItems] = useState([
    { id: 'pernos_c_d', label: 'Atornillá 2 pernos mini fix en cada pieza (C y D).', checked: false, videoUrl: 'https://youtu.be/uq2onhSMbOY?si=bqcTseh57_1bV3ek&t=77' },
    { id: 'guias_c_d', label: 'Atornillá 2 guías en cada lateral usando los tornillos Varianta.', checked: false, videoUrl: 'https://www.w3schools.com/html/movie.mp4' },
    { id: 'cajas_c_d', label: 'Colocá a presión 2 cajas para mini fix en los agujeros grandes de cada pieza.', checked: false, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  ]);

  const [feedbackFormData, setFeedbackFormData] = useState({ name: '', email: '', comments: '' });
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'sending' | 'success'>('idle');


  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [viewerImageUrl, setViewerImageUrl] = useState<string | null>(null);
  const [isVideoViewerOpen, setIsVideoViewerOpen] = useState(false); // New state for video viewer
  const [viewerVideoUrl, setViewerVideoUrl] = useState<string | null>(null); // New state for video URL

  // Estado para el visor 3D
  const [is3DViewerOpen, setIs3DViewerOpen] = useState(false);
  const [selectedPiece3D, setSelectedPiece3D] = useState<{ name: string, dimensions: string, modelUrl?: string, finishes?: string[] } | null>(null);
  const [showMusicOption, setShowMusicOption] = useState(false);


  const allChecked = checklistItems.every(item => item.checked);
  const allHardwareChecked = hardwareChecklistItems.every(item => item.checked);
  const allStep3Checked = step3ChecklistItems.every(item => item.checked);

  const handleStartAssemblyClick = () => {
    if (userName.trim() !== '') {
      setShowMusicOption(true);
    }
  };

  const handleSkipMusic = () => {
    setCurrentView('tools');
  };

  const handleOpenPlaylist = () => {
    window.open('https://open.spotify.com/playlist/37i9dQZF1DX5Ejj0oXST8k', '_blank'); // Ejemplo de playlist "Deep Focus" o similar
    setCurrentView('tools');
  };

  const handleToolsReadyClick = () => {
    setCurrentView('step1'); // Transiciona a la vista del paso 1
  };

  const handleNextStepClick = () => {
    if (currentView === 'step1' && allChecked) {
      setCurrentView('step2');
      console.log("¡Todo identificado! Vamos a los herrajes. Pasando al paso 2...");
    } else if (currentView === 'step2' && allHardwareChecked) {
      setCurrentView('step3'); // Transiciona a la vista del paso 3
      console.log("¡Tengo todo! Empecemos a armar. Pasando al paso 3...");
    } else if (currentView === 'step3' && allStep3Checked) {
      setCurrentView('step4'); // Transiciona a la vista del paso 4
      console.log("Laterales listos, ¡sigamos! Pasando al paso 4...");
    }
    // No hacer nada si el checklist del paso actual no está completo
  };

  const handleCheckboxChange = (id: string) => {
    setChecklistItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleHardwareCheckboxChange = (id: string) => {
    setHardwareChecklistItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleStep3CheckboxChange = (id: string) => {
    setStep3ChecklistItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleFeedbackFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedbackFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setFeedbackStatus('success');
      setFeedbackFormData({ name: '', email: '', comments: '' });
      setTimeout(() => setFeedbackStatus('idle'), 3000); // Reset status after 3 seconds
    }, 1500);
  };

  const openImageViewer = (url: string) => {
    setViewerImageUrl(url);
    setIsImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsImageViewerOpen(false);
    setViewerImageUrl(null);
  };

  const openVideoViewer = (url: string) => { // New function to open video viewer
    setViewerVideoUrl(url);
    setIsVideoViewerOpen(true);
  };

  const closeVideoViewer = () => { // New function to close video viewer
    setIsVideoViewerOpen(false);
    setViewerVideoUrl(null);
  };

  const openPieceViewer3D = (name: string, dims: string, modelUrl?: string, finishes?: string[]) => {
    setSelectedPiece3D({ name, dimensions: dims, modelUrl, finishes });
    setIs3DViewerOpen(true);
  };

  const closePieceViewer3D = () => {
    setIs3DViewerOpen(false);
    setSelectedPiece3D(null);
  };

  const handleGlobalBackClick = () => {
    if (currentView === 'step4') {
      setCurrentView('step3'); // De step4 a step3
    } else if (currentView === 'step3') {
      setCurrentView('step2'); // De step3 a step2
    } else if (currentView === 'step2') {
      setCurrentView('step1'); // De step1 a step2
    } else if (currentView === 'step1') {
      setCurrentView('tools'); // De step1 a tools
    } else if (currentView === 'tools') { // Si estamos en tools, volvemos a welcome para que pueda cambiar el nombre
      setCurrentView('welcome');
    } else {
      onBackToPdp(); // Por defecto, volver a la PDP
    }
  };

  // Lógica para determinar el estado y texto del botón "Siguiente"
  let isNextButtonDisabled = true;
  let nextButtonText = "Siguiente";
  let nextButtonIcon: React.ReactElement = <ArrowRight size={24} className="ml-2" />;

  if (currentView === 'step1') {
    isNextButtonDisabled = !allChecked;
    nextButtonText = allChecked ? "¡Todo identificado! Vamos a los herrajes" : "Me falta un material";
    nextButtonIcon = allChecked ? <Check size={24} className="mr-2" /> : <ArrowRight size={24} className="mr-2 rotate-90" />;
  } else if (currentView === 'step2') {
    isNextButtonDisabled = !allHardwareChecked;
    nextButtonText = allHardwareChecked ? "¡Tengo todo! Empecemos a armar" : "Me falta un material";
    nextButtonIcon = allHardwareChecked ? <Check size={24} className="mr-2" /> : <ArrowRight size={24} className="mr-2 rotate-90" />;
  } else if (currentView === 'step3') {
    isNextButtonDisabled = !allStep3Checked;
    nextButtonText = allStep3Checked ? "Laterales listos, ¡sigamos!" : "Me falta un material";
    nextButtonIcon = allStep3Checked ? <Check size={24} className="mr-2" /> : <ArrowRight size={24} className="mr-2 rotate-90" />;
  } else if (currentView === 'step4') {
    // En el paso 4, el botón "Siguiente" ya no es relevante en el flujo de armado.
    // Podríamos ocultarlo o cambiar su función, pero la petición solo aplica a los steps 1-3 para 'Siguiente'.
    // Para el step 4, los botones finales son "Dejanos tu reseña" y "Mirá todos nuestros productos".
    // Por lo tanto, el botón flotante general de "Siguiente" no debería mostrarse en step 4.
  }

  // Confetti effect for Step 4
  useEffect(() => {
    if (currentView === 'step4') {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#D2B48C', '#5F6C5C', '#F8F5F1'] // Wood, Dark Green, Brand BG
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#D2B48C', '#5F6C5C', '#F8F5F1']
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [currentView]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);



  return (
    <div className="bg-brand-bg min-h-screen flex flex-col items-center py-16 px-6 relative overflow-hidden">
      {/* Botón de Volver */}
      <motion.button
        onClick={handleGlobalBackClick}
        className="absolute top-8 left-8 flex items-center text-brand-primary hover:text-brand-primary transition-colors text-sm font-semibold group z-30"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        {currentView === 'step4' ? 'Volver al Paso 3' : currentView === 'step3' ? 'Volver al Paso 2' : currentView === 'step2' ? 'Volver al Paso 1' : currentView === 'step1' ? 'Volver a Herramientas' : currentView === 'tools' ? 'Volver a Bienvenida' : 'Volver al Producto'}
      </motion.button>

      <AnimatePresence mode="wait">
        {currentView === 'welcome' && (
          <motion.div
            key="welcome-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-3xl text-center z-10 flex flex-col justify-center min-h-[calc(100vh-8rem)]" // Centra verticalmente el contenido
          >
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extralight leading-tight text-brand-primary mb-8"
            >
              Hola, vamos a armar tu <span className="font-medium text-brand-primary">{product.title}</span> juntos. ¿Me puedes decir tu nombre?
            </h1>

            <div className="relative w-full">
              <AnimatePresence mode="wait">
                {!showMusicOption ? (
                  <motion.div
                    key="name-input-section"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <motion.input
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      type="text"
                      placeholder="Tu nombre"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="mb-8 w-full max-w-sm p-4 bg-white border border-gray-300 rounded-xl text-lg text-center focus:outline-none focus:ring-2 focus:ring-brand-dark-green/50 shadow-md"
                      aria-label="Introduce tu nombre"
                    />

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
                      <div className="flex items-center text-lg text-gray-700 font-light">
                        <Timer size={20} className="mr-2 text-brand-primary opacity-70" />
                        Tiempo estimado: <span className="font-semibold ml-1">{product.assemblyTime}</span>
                      </div>
                      <div className="flex items-center text-lg text-gray-700 font-light">
                        <HardHat size={20} className="mr-2 text-brand-primary opacity-70" />
                        Nivel: <span className="font-semibold ml-1">{product.difficulty}</span>
                      </div>
                    </div>

                    <motion.button
                      onClick={handleStartAssemblyClick}
                      disabled={userName.trim() === ''}
                      className={`inline-flex items-center justify-center px-10 py-4 rounded-md text-lg font-bold uppercase tracking-widest shadow-xl group transition-all duration-300 ${userName.trim() === ''
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-brand-support text-brand-bg hover:bg-brand-support-hover'
                        }`}
                    >
                      <Play size={24} className="mr-3 group-hover:scale-110 transition-transform" />
                      Comenzar Armado
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="music-option-section"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center space-y-8 bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-white"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="p-3 bg-brand-bg rounded-2xl">
                        <Music className="text-brand-primary" size={32} />
                      </div>
                      <p className="text-2xl md:text-3xl font-light text-brand-primary max-w-lg">
                        ¡Hola <span className="font-bold text-brand-primary">{userName}</span>! ¿te gustaría poner algo de música para armar con onda?
                      </p>
                    </div>

                    <div className="flex flex-col items-center space-y-6">
                      <button
                        onClick={handleOpenPlaylist}
                        className="flex items-center space-x-3 px-8 py-4 bg-[#1DB954] text-white rounded-md font-bold text-base hover:bg-[#1ed760] transition-all shadow-lg transform hover:scale-105 active:scale-95 group"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.305c-.215.353-.675.465-1.028.249-2.835-1.734-6.405-2.126-10.609-1.168-.403.093-.81-.157-.902-.56-.093-.404.157-.811.56-.902 4.607-1.054 8.549-.607 11.731 1.34.352.216.464.675.248 1.029zm1.467-3.262c-.27.439-.846.58-1.285.31-3.246-1.996-8.194-2.574-12.031-1.408-.493.15-1.021-.129-1.171-.622-.15-.494.13-.1021.623-1.171 4.385-1.33 9.845-.689 13.554 1.59.439.27.58.846.31 1.285zm.126-3.411C15.485 8.291 9.53 8.094 6.082 9.14c-.542.164-1.11-.144-1.275-.686-.164-.543.144-1.11.686-1.275 4 1.213 10.589 1.442 14.789-1.053.488-.29 1.125-.132 1.415.355.29.488.132 1.125-.355 1.415z" />
                        </svg>
                        <span>Abrir playlist recomendada</span>
                        <ExternalLink size={16} className="ml-2" />
                      </button>

                      <button
                        onClick={handleSkipMusic}
                        className="text-gray-400 hover:text-brand-primary text-sm font-semibold tracking-widest uppercase hover:underline transition-all underline-offset-8 decoration-brand-dark-green/30"
                      >
                        Saltear y empezar manual
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {currentView === 'tools' && (
          <motion.div
            key="tools-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl w-full text-center z-10 flex flex-col justify-center items-center min-h-[calc(100vh-8rem)]"
          >
            <h1 className="text-3xl md:text-5xl font-extralight leading-tight text-brand-primary mb-10 font-serif">
              ¡Hola <span className="font-medium text-brand-primary">{userName}!</span> Soy Gaci. Vamos a armar tu <span className="font-medium text-brand-primary">{product.title}</span> juntos!
              Antes de empezar, asegúrate de tener estas herramientas a mano.
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 w-full">
              {product.assemblyTools.map((tool, index) => {
                const IconComponent = LucideIcons[tool.icon];
                return (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100"
                  >
                    {IconComponent && <IconComponent size={48} className="text-brand-primary mb-4 opacity-80" />}
                    <h3 className="text-lg font-semibold text-brand-primary mb-2 font-serif">{tool.name}</h3>
                    <p className={`text-sm ${tool.included ? 'text-green-600' : 'text-orange-600'} font-medium`}>
                      {tool.included ? '¡Tranquilo! Esta viene dentro de la caja.' : 'Herramienta adicional necesaria.'}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <motion.button
              onClick={handleToolsReadyClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="inline-flex items-center justify-center px-12 py-5 bg-brand-support text-white rounded-md text-xl font-bold uppercase tracking-widest hover:bg-brand-support transition-colors shadow-2xl mb-12"
              style={{ minWidth: '300px' }} // Asegura que el botón sea grande
            >
              Tengo las herramientas, ¡vamos!
            </motion.button>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-gray-500 italic text-md md:text-lg max-w-2xl"
            >
              <span className="font-bold text-brand-primary">Consejo de Gaci:</span> Busca un lugar amplio y usa el mismo cartón de la caja para no rayar el piso ni el mueble.
            </motion.p>
          </motion.div>
        )}

        {currentView === 'step1' && (
          <motion.div
            key="step1-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl w-full text-center z-10 flex flex-col justify-center items-center min-h-[calc(100vh-8rem)] pb-32 lg:pb-16" // Añadido padding bottom para el botón flotante móvil
          >
            {/* Imagen/Video de Unboxing */}
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              src="https://i.postimg.cc/RZdf6TB8/Gemini-Generated-Image-ur2452ur2452ur24.png" // Placeholder, reemplazar con GIF/Video real
              alt="Proceso de unboxing"
              className="w-full max-w-xl h-auto object-cover rounded-lg shadow-lg mb-12 border-4 border-white"
            />

            <h1 className="text-3xl md:text-5xl font-extralight leading-tight text-brand-primary mb-8 font-serif">
              Paso 1: Unboxing y Reconocimiento
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-light mb-6 max-w-2xl">
              Al abrir la caja, verás un film protector contra la humedad. Quítalo con mucho cuidado para no rayar la melamina.
            </p>
            <p className="text-lg md:text-xl text-gray-700 font-light mb-10 max-w-2xl">
              Cada pieza tiene un identificador impreso (A, B, C...). Separá las maderas y búscalos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-16 w-full max-w-3xl">
              {checklistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 bg-white rounded-lg shadow-sm flex flex-col items-start space-y-1 hover:bg-brand-bg transition-colors"
                  aria-checked={item.checked}
                  role="checkbox"
                  tabIndex={0}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <input
                      type="checkbox"
                      id={`item-${item.id}`}
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="h-6 w-6 text-brand-primary rounded focus:ring-brand-dark-green border-gray-300"
                      aria-label={item.label}
                    />
                    <div className="flex-1 text-left">
                      <label
                        htmlFor={`item-${item.id}`}
                        className="text-base font-medium text-brand-primary cursor-pointer hover:text-brand-primary transition-colors"
                      >
                        {item.label}
                      </label>
                      {item.dimensions && (
                        <button
                          onClick={(e) => { e.stopPropagation(); openPieceViewer3D(item.label, item.dimensions!, (item as any).modelUrl); }}
                          className="ml-2 px-2 py-0.5 bg-brand-bg text-brand-primary text-[10px] font-bold uppercase tracking-wider rounded border border-brand-support/20 hover:bg-brand-support-hover hover:text-brand-primary transition-all shadow-sm"
                        >
                          Ver 3D
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-4 pl-9 pt-1">
                    {item.imageUrl && (
                      <button
                        onClick={(e) => { e.stopPropagation(); openImageViewer(item.imageUrl!); }}
                        className="text-brand-primary underline text-xs font-medium cursor-pointer hover:text-brand-primary transition-colors"
                        aria-label={`Ver imágen de ${item.label}`}
                        role="button"
                      >
                        Ver imágen
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + (checklistItems.length * 0.05) }}
              className="text-gray-500 italic text-md md:text-lg max-w-2xl mt-4 mb-20 lg:mb-12" // Ajustado mb para desktop
            >
              <span className="font-bold text-brand-primary">Consejo de Gaci:</span> ¡Organizar las piezas ahora te ahorrará tiempo más tarde!
            </motion.p>
          </motion.div>
        )}

        {currentView === 'step2' && (
          <motion.div
            key="step2-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl w-full text-center z-10 flex flex-col justify-center items-center min-h-[calc(100vh-8rem)] pb-32 lg:pb-16"
          >
            <h1 className="text-3xl md:text-5xl font-extralight leading-tight text-brand-primary mb-8 font-serif">
              Paso 2: ¡No perdamos ni un tornillo!
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-light mb-10 max-w-2xl">
              Abrí las bolsitas de herrajes y separalos. Es muy importante que verifiques que tenés las cantidades exactas antes de empezar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-16 w-full max-w-3xl">
              {hardwareChecklistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 bg-white rounded-lg shadow-sm flex flex-col items-start space-y-1 hover:bg-brand-bg transition-colors"
                  aria-checked={item.checked}
                  role="checkbox"
                  tabIndex={0}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <input
                      type="checkbox"
                      id={`hardware-item-${item.id}`}
                      checked={item.checked}
                      onChange={() => handleHardwareCheckboxChange(item.id)}
                      className="h-6 w-6 text-brand-primary rounded focus:ring-brand-dark-green border-gray-300"
                      aria-label={item.label}
                    />
                    <label htmlFor={`hardware-item-${item.id}`} className="text-base font-medium text-brand-primary flex-1 text-left cursor-pointer">
                      {item.label}
                    </label>
                    {item.imageUrl && (
                      <span
                        onClick={(e) => { e.stopPropagation(); openImageViewer(item.imageUrl); }}
                        className="text-brand-primary underline text-sm font-medium cursor-pointer ml-auto hover:text-brand-primary transition-colors"
                        aria-label={`Ver imagen de ${item.label}`}
                        role="button"
                      >
                        Ver imagen
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-500 text-left pl-9">
                      <span className="font-medium">Para qué sirve:</span> {item.description}
                    </p>
                  )}
                  {/* Eliminado: el botón "Ver video" */}
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + (hardwareChecklistItems.length * 0.05) }}
              className="text-gray-500 italic text-md md:text-lg max-w-2xl mt-4 mb-20 lg:mb-12"
            >
              <span className="font-bold text-brand-primary">Consejo de Gaci:</span> ¡Clasificar los herrajes te evitará dolores de cabeza y búsquedas interminables durante el armado!
            </motion.p>
          </motion.div>
        )}

        {currentView === 'step3' && (
          <motion.div
            key="step3-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl w-full text-center z-10 flex flex-col justify-center items-center min-h-[calc(100vh-8rem)] pb-32 lg:pb-16"
          >
            <h1 className="text-3xl md:text-5xl font-extralight leading-tight text-brand-primary mb-8 font-serif">
              Paso 3: Preparando los laterales
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-light mb-10 max-w-2xl">
              Buscá los costados C (Izquierdo) y D (Derecho). Vamos a colocarles los herrajes básicos.
            </p>

            <div className="grid grid-cols-1 gap-4 md:gap-6 mb-12 w-full max-w-2xl">
              {step3ChecklistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-4 bg-white rounded-lg shadow-sm flex flex-col items-start space-y-1 hover:bg-brand-bg transition-colors"
                  aria-checked={item.checked}
                  role="checkbox"
                  tabIndex={0}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <input
                      type="checkbox"
                      id={`step3-item-${item.id}`}
                      checked={item.checked}
                      onChange={() => handleStep3CheckboxChange(item.id)}
                      className="h-6 w-6 text-brand-primary rounded focus:ring-brand-dark-green border-gray-300"
                      aria-label={item.label}
                    />
                    <label htmlFor={`step3-item-${item.id}`} className="text-base font-medium text-brand-primary flex-1 text-left cursor-pointer">
                      {item.label}
                    </label>
                  </div>
                  {item.videoUrl && (
                    <button
                      onClick={(e) => { e.stopPropagation(); openVideoViewer(item.videoUrl!); }}
                      className="text-brand-primary underline text-sm font-medium cursor-pointer text-left pl-9 pt-1 block hover:text-brand-primary transition-colors"
                      aria-label={`Ver video de ${item.label}`}
                      role="button"
                    >
                      Ver video
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Consejo de Oro de Gaci */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + (step3ChecklistItems.length * 0.05) }}
              className="mt-8 p-6 bg-yellow-100 rounded-xl shadow-md flex items-start space-x-4 max-w-2xl w-full text-left"
            >
              <AlertTriangle size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
              <p className="text-base text-yellow-800 font-medium">
                <span className="font-bold">¡Ojo acá!</span> La flecha de la caja mini fix debe estar alineada hacia el orificio del borde para que el perno entre bien.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + (step3ChecklistItems.length * 0.05) }}
              className="text-gray-500 italic text-md md:text-lg max-w-2xl mt-8 mb-20 lg:mb-12"
            >
              <span className="font-bold text-brand-primary">Consejo de Gaci:</span> La precisión en este paso asegura la estabilidad y alineación perfecta de tu mueble.
            </motion.p>
          </motion.div>
        )}

        {currentView === 'step4' && (
          <motion.div
            key="step4-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl w-full text-center z-10 flex flex-col justify-center items-center min-h-[calc(100vh-8rem)] pb-32 lg:pb-16"
          >
            {/* Triumph Block */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-4xl md:text-6xl font-extralight leading-tight text-brand-primary mb-12 drop-shadow-md"
            >
              <Sparkles size={48} className="inline-block text-yellow-500 mb-4 mr-2" />
              ¡Misión cumplida{userName ? `, ${userName}` : ''}! Tu <span className="font-medium text-brand-primary">{product.title}</span> ya es parte de tu hogar.
              <Sparkles size={48} className="inline-block text-yellow-500 mb-4 ml-2" />
            </motion.h1>

            {/* Digital Badge */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -15 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.8 }}
              className="relative bg-white text-brand-primary p-6 md:p-8 rounded-xl shadow-2xl mb-20 flex flex-col items-center justify-center w-full max-w-sm border-4 border-yellow-400"
            >
              <Crown size={64} className="text-yellow-500 mb-4 drop-shadow-lg" />
              <p className="text-3xl md:text-4xl font-dancing-script text-brand-primary drop-shadow-lg leading-none mb-2">
                {userName || 'Maestro'}
              </p>
              <p className="text-2xl font-black uppercase tracking-wider text-brand-primary drop-shadow-lg">
                MAESTRO ARMADOR
              </p>
              <p className="text-lg font-bold uppercase tracking-widest text-gray-700/80 drop-shadow-sm">NIVEL EXPERTO</p>
              <div className="absolute inset-0 border-4 border-yellow-300 rounded-xl animate-pulse-slow pointer-events-none" />
            </motion.div>

            {/* Cuidados y Consejos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mb-16 w-full max-w-2xl text-left bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            >
              <h2 className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-brand-primary mb-6 flex items-center font-serif">
                <Sparkles size={20} className="text-brand-primary mr-3" />
                Mirá los cuidados y consejos de fábrica
              </h2>
              <ul className="space-y-4 text-gray-700 text-base md:text-lg font-light">
                <li>
                  <strong className="font-semibold text-brand-primary">Ajuste Pro:</strong> Dentro de 15 días, dale un último apretón a los tornillos Allen. Con el uso, la madera se asienta y esto le dará rigidez eterna.
                </li>
                <li>
                  <strong className="font-semibold text-brand-primary">Limpieza:</strong> Usá solo un paño apenas humedecido. Evitá productos abrasivos.
                </li>
                <li>
                  <strong className="font-semibold text-brand-primary">Borrá los códigos:</strong> Borrá el código impreso en el canto con un poco de algodón y alcohol para un acabado perfecto.
                </li>
              </ul>
            </motion.div>

            {/* Feedback Form (GACI LISTEN) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="w-full max-w-2xl text-left bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-16"
            >
              <h2 className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-brand-primary mb-6 font-serif">
                ¿Gaci te ayudó?
              </h2>
              <p className="text-gray-700 text-base md:text-lg font-light mb-6">
                Contanos tu experiencia y ayudanos a mejorar.
              </p>
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre y Apellido"
                  value={feedbackFormData.name}
                  onChange={handleFeedbackFormChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-dark-green/50 bg-brand-bg text-brand-primary"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={feedbackFormData.email}
                  onChange={handleFeedbackFormChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-dark-green/50 bg-brand-bg text-brand-primary"
                  required
                />
                <textarea
                  name="comments"
                  placeholder="Observaciones (¿Hubo algún paso donde te trabaste?)"
                  rows={4}
                  value={feedbackFormData.comments}
                  onChange={handleFeedbackFormChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-dark-green/50 bg-brand-bg text-brand-primary resize-y"
                  required
                ></textarea>
                <button
                  type="submit"
                  disabled={feedbackStatus === 'sending'}
                  className={`w-full px-6 py-3 rounded-md text-white font-bold uppercase tracking-wider transition-all duration-300 ${feedbackStatus === 'sending'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : feedbackStatus === 'success'
                      ? 'bg-green-600'
                      : 'bg-brand-support hover:bg-brand-support-hover'
                    }`}
                >
                  {feedbackStatus === 'sending' ? 'Enviando...' : feedbackStatus === 'success' ? '¡Gracias por ayudarnos a mejorar!' : 'Enviar mis comentarios'}
                </button>
              </form>
            </motion.div>

            {/* Closure and Conversion Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="flex flex-col gap-6 w-full max-w-sm mt-8"
            >
              <button className="flex items-center justify-center px-8 py-4 bg-yellow-400 text-brand-primary rounded-md text-lg font-bold uppercase tracking-widest hover:bg-yellow-500 transition-colors shadow-lg">
                Dejanos tu reseña en Google ⭐⭐⭐⭐⭐
              </button>
              <button
                onClick={onBackToHome} // Navigate to home
                className="flex items-center justify-center px-8 py-4 border-2 border-brand-support text-brand-primary rounded-md text-lg font-bold uppercase tracking-widest hover:bg-brand-support-hover hover:text-brand-primary transition-colors shadow-lg"
              >
                Mirá todos nuestros productos
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante de Siguiente (para mobile y desktop) */}
      <AnimatePresence>
        {(currentView === 'step1' || currentView === 'step2' || currentView === 'step3') && (
          // Botón para desktop (flujo normal)
          <motion.button
            key="next-step-button-desktop"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: currentView === 'step1' ? (0.5 + (checklistItems.length * 0.05)) : currentView === 'step2' ? (0.5 + (hardwareChecklistItems.length * 0.05)) : (0.5 + (step3ChecklistItems.length * 0.05)) }}
            onClick={handleNextStepClick}
            disabled={isNextButtonDisabled}
            className={`hidden lg:flex items-center justify-center px-10 py-4 rounded-md shadow-xl text-lg font-bold uppercase tracking-widest transition-all duration-300 max-w-md w-full ${isNextButtonDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-brand-support text-brand-bg hover:bg-brand-support-hover'
              }`}
            aria-label={isNextButtonDisabled ? 'Completa el checklist para continuar' : 'Siguiente paso'}
          >
            {nextButtonIcon}
            <span>{nextButtonText}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(currentView === 'step1' || currentView === 'step2' || currentView === 'step3') && (
          // Botón para mobile (fijo en la parte inferior)
          <motion.button
            key="next-step-button-mobile"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100, delay: currentView === 'step1' ? (0.5 + (checklistItems.length * 0.05)) : currentView === 'step2' ? (0.5 + (hardwareChecklistItems.length * 0.05)) : (0.5 + (step3ChecklistItems.length * 0.05)) }}
            onClick={handleNextStepClick}
            disabled={isNextButtonDisabled}
            className={`lg:hidden fixed bottom-0 left-0 right-0 w-full px-8 py-5 rounded-none shadow-2xl flex items-center justify-center space-x-3 text-lg font-bold uppercase tracking-widest transition-all duration-300 z-40 ${isNextButtonDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-brand-support text-brand-bg hover:bg-brand-support-hover'
              }`}
            aria-label={isNextButtonDisabled ? 'Completa el checklist para continuar' : 'Siguiente paso'}
          >
            {nextButtonIcon}
            <span>{nextButtonText}</span>
          </motion.button>
        )}
      </AnimatePresence>



      {/* ImageViewer Modal */}
      <ImageViewer imageUrl={viewerImageUrl} onClose={closeImageViewer} />

      {/* VideoViewer Modal */}
      <VideoViewer videoUrl={viewerVideoUrl} onClose={closeVideoViewer} />

      {/* PieceViewer3D Modal */}
      <PieceViewer3D
        isOpen={is3DViewerOpen}
        onClose={closePieceViewer3D}
        pieceName={selectedPiece3D?.name || ''}
        dimensions={selectedPiece3D?.dimensions || '10x10x1.5'}
        modelUrl={selectedPiece3D?.modelUrl}
        finishes={selectedPiece3D?.finishes}
      />

      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
          className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-brand-support/10 rounded-md blur-3xl"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
          className="absolute -bottom-1/4 -right-1/4 w-2/3 h-2/3 bg-brand-support/10 rounded-md blur-3xl"
        />
      </div>
    </div>
  );
};

export default GaciStepByStep;