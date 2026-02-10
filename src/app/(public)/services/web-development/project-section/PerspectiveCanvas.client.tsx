// components/PopularServices/PerspectiveCanvas.client.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { PerspectiveCanvasProps } from './types';
import Image from 'next/image';

const PerspectiveCanvasClient: React.FC<PerspectiveCanvasProps> = ({ activeItem }) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current || !canvasRef.current) return;

            // Only run tilt effect on non-touch devices (width > 768px)
            if (window.innerWidth < 768) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const x = (clientX / innerWidth - 0.5) * 20;
            const y = (clientY / innerHeight - 0.5) * -20;

            gsap.to(canvasRef.current, {
                rotateY: x,
                rotateX: y,
                duration: 1.2,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full flex items-center justify-center overflow-hidden"
        >
            <div
                ref={canvasRef}
                className="relative w-full max-w-4xl aspect-[4/5] md:aspect-video overflow-hidden rounded-lg md:rounded-lg shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transform-gpu bg-zinc-900"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeItem.id}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Optimized Image Component */}
                        <div className="relative w-full h-full">
                            <Image
                                src={activeItem.imageUrl}
                                alt={activeItem.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover brightness-75 pointer-events-none"
                                priority={true}
                            />
                        </div>

                        {/* Shutter Reveal Overlay */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 1.2, ease: 'easeInOut' }}
                            className="absolute inset-0 bg-brand-primary/10 backdrop-blur-sm z-10 pointer-events-none"
                        />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10 lg:p-12 z-20">
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-brand-primary text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] font-black mb-2 md:mb-3"
                            >
                                {activeItem.vibe}
                            </motion.span>

                            <motion.h3
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-black uppercase tracking-tight leading-none"
                            >
                                {activeItem.title}
                            </motion.h3>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-gray-300 text-xs sm:text-sm mt-2 md:mt-3 font-medium max-w-[90%]"
                            >
                                {activeItem.location}
                            </motion.p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Glass Border Effect */}
                <div className="absolute inset-0 border border-white/10 rounded-lg md:rounded-lg pointer-events-none z-30" />
            </div>
        </div>
    );
};

export default PerspectiveCanvasClient;