'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Destination } from '../types';

interface PerspectiveCanvasProps {
    activeItem: Destination;
}

export const PerspectiveCanvas: React.FC<PerspectiveCanvasProps> = ({ activeItem }) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current || !canvasRef.current) return;

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
            className="w-full flex items-center justify-center overflow-hidden bg-zinc-950 px-4 py-8 sm:py-12 lg:py-16"
        >
            <div
                ref={canvasRef}
                className="
          relative 
          w-full 
          max-w-5xl 
          aspect-[4/5] 
          sm:aspect-[3/4] 
          md:aspect-video 
          overflow-hidden 
          rounded-lg 
          shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] 
          transform-gpu 
          bg-zinc-900
        "
                style={{ transformStyle: 'preserve-3d' }}
            >
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeItem.id}
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* IMAGE */}
                        <img
                            src={
                                typeof activeItem.imageUrl === 'string'
                                    ? activeItem.imageUrl
                                    : activeItem.imageUrl.src
                            }
                            alt={activeItem.title}
                            className="w-full h-full object-cover brightness-75 pointer-events-none"
                        />

                        {/* SHUTTER */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 1.2, ease: 'easeInOut' }}
                            className="absolute inset-0 bg-brand-primary/10 backdrop-blur-sm z-10 pointer-events-none"
                        />

                        {/* CONTENT */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10">

                            {/* VIBE */}
                            <motion.span
                                initial={{ y: 12, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="
      text-brand-primary 
      text-[9px] 
      sm:text-[10px] 
      md:text-xs 
      uppercase 
      tracking-[0.22em] 
      font-semibold 
      mb-1.5
      opacity-90
    "
                            >
                                {activeItem.vibe}
                            </motion.span>

                            {/* TITLE */}
                            <motion.h3
                                initial={{ y: 14, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="
      text-white 
      text-lg 
      sm:text-xl 
      md:text-2xl 
      lg:text-3xl 
      xl:text-4xl 
      font-semibold 
      uppercase 
      tracking-tight 
      leading-snug
      max-w-[90%]
    "
                            >
                                {activeItem.title}
                            </motion.h3>

                            {/* LOCATION */}
                            <motion.p
                                initial={{ y: 14, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="
      text-gray-300 
      text-[10px] 
      sm:text-xs 
      md:text-sm 
      mt-1 
      font-normal
      opacity-80
    "
                            >
                                {activeItem.location}
                            </motion.p>

                        </div>

                    </motion.div>
                </AnimatePresence>

                {/* BORDER */}
                <div className="absolute inset-0 border border-white/10 rounded-lgpointer-events-none z-20" />
            </div>
        </div>
    );
};
