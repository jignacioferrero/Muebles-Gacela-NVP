import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Environment, Html, Line } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Box, MousePointer2, Ruler } from 'lucide-react';
import * as THREE from 'three';

interface PieceViewer3DProps {
    isOpen: boolean;
    onClose: () => void;
    pieceName: string;
    dimensions: string; // Formato 'Largo x Ancho x Espesor' (cm) ej: '120x40x1.5'
}

const DimensionLabel: React.FC<{ position: [number, number, number], label: string, value: string }> = ({ position, label, value }) => (
    <Html position={position} center distanceFactor={12}>
        <div className="flex flex-col items-center pointer-events-none select-none">
            <div className="bg-white/95 backdrop-blur-sm border border-brand-dark-green/20 px-2 py-1 rounded-full shadow-md flex items-center space-x-1.5 whitespace-nowrap">
                <span className="text-[8px] font-bold text-brand-dark-green/50 uppercase tracking-tighter">{label}</span>
                <span className="text-xs font-black text-brand-dark-green font-mono">{value}</span>
                <span className="text-[8px] font-bold text-brand-dark-green/40">cm</span>
            </div>
            <div className="w-px h-2 bg-brand-dark-green/30 mt-0.5"></div>
        </div>
    </Html>
);

const MaderaPieza: React.FC<{ dimensions: string }> = ({ dimensions }) => {
    // Parsear dimensiones con seguridad
    const parts = (dimensions || '10x10x1.5').split('x').map(d => parseFloat(d) || 1);
    const [largo, ancho, espesor] = parts.length === 3 ? parts : [10, 10, 1.5];

    // Convertimos cm a unidades de escena (escala 0.1)
    const w = largo * 0.1;
    const h = espesor * 0.1;
    const d = ancho * 0.1;

    return (
        <group>
            {/* La Pieza de Madera */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[w, h, d]} />
                <meshStandardMaterial
                    color="#e1c19d"
                    roughness={0.6}
                    metalness={0.1}
                />
            </mesh>

            {/* Líneas de Medida (Cotas) usando Line de Drei para mayor estabilidad */}
            <group>
                {/* Largo (X) */}
                <group position={[0, -h / 2 - 0.3, d / 2 + 0.3]}>
                    <Line
                        points={[[-w / 2, 0, 0], [w / 2, 0, 0]]}
                        color="#2D5A27"
                        lineWidth={2}
                    />
                    <DimensionLabel position={[0, 0, 0]} label="Largo" value={largo.toString()} />
                </group>

                {/* Ancho (Z) */}
                <group position={[w / 2 + 0.3, -h / 2 - 0.3, 0]}>
                    <Line
                        points={[[0, 0, -d / 2], [0, 0, d / 2]]}
                        color="#2D5A27"
                        lineWidth={2}
                    />
                    <DimensionLabel position={[0, 0, 0]} label="Ancho" value={ancho.toString()} />
                </group>

                {/* Espesor (Y) */}
                <group position={[-w / 2 - 0.3, 0, d / 2 + 0.3]}>
                    <Line
                        points={[[0, -h / 2, 0], [0, h / 2, 0]]}
                        color="#2D5A27"
                        lineWidth={2}
                    />
                    <DimensionLabel position={[0, 0, 0]} label="Espes." value={espesor.toString()} />
                </group>
            </group>
        </group>
    );
};

const PieceViewer3D: React.FC<PieceViewer3DProps> = ({ isOpen, onClose, pieceName, dimensions }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        className="bg-white w-full max-w-5xl h-[85vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Premium */}
                        <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-brand-bg rounded-2xl">
                                    <Ruler className="text-brand-dark-green" size={24} />
                                </div>
                                <div className="text-left">
                                    <h2 className="text-xl md:text-2xl font-black text-brand-text tracking-tight uppercase leading-none">{pieceName}</h2>
                                    <p className="text-xs md:text-sm text-gray-400 font-medium flex items-center mt-1">
                                        <Box size={14} className="mr-2" />
                                        Componente de precisión en madera
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 md:p-3 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-brand-text"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {/* 3D Canvas */}
                        <div className="flex-1 bg-[#FDFDFD] relative cursor-grab active:cursor-grabbing">
                            <Suspense fallback={
                                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-dark-green"></div>
                                    <p className="text-brand-dark-green text-xs font-bold uppercase tracking-widest">Cargando 3D...</p>
                                </div>
                            }>
                                <Canvas shadows dpr={[1, 2]}>
                                    <PerspectiveCamera makeDefault position={[8, 8, 8]} fov={40} />
                                    <OrbitControls
                                        makeDefault
                                        minDistance={3}
                                        maxDistance={25}
                                        enableDamping={true}
                                    />

                                    <Stage intensity={0.6} environment="city" adjustCamera={false}>
                                        <MaderaPieza dimensions={dimensions} />
                                    </Stage>

                                    <Environment preset="city" />
                                    <ambientLight intensity={0.4} />
                                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                                </Canvas>
                            </Suspense>

                            {/* Controles Overlay */}
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
                                <div className="px-6 py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100 flex items-center space-x-3 transition-transform hover:scale-105">
                                    <MousePointer2 size={16} className="text-brand-dark-green" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text/60">
                                        Arrastra para rotar la pieza
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Footer con dimensiones reales */}
                        <div className="p-4 md:p-6 bg-brand-dark-green/5 flex justify-center space-x-8 md:space-x-16 border-t border-brand-dark-green/10">
                            {(dimensions || '10x10x1.5').split('x').map((dim, idx) => {
                                const labels = ['LARGO', 'ANCHO', 'ESPESOR'];
                                return (
                                    <div key={idx} className="flex flex-col items-center">
                                        <span className="text-[9px] font-bold text-brand-dark-green/40 tracking-widest uppercase mb-1">{labels[idx]}</span>
                                        <span className="text-lg md:text-xl font-black text-brand-dark-green">{dim} cm</span>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PieceViewer3D;
