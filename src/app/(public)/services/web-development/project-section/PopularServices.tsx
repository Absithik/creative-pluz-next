'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INITIAL_DESTINATIONS } from './data/destinations';
import { PerspectiveCanvas } from './components/PerspectiveCanvas';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const PopularServices: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Track sections on the left to update the sticky image on the right
        const sections = gsap.utils.toArray('.project-section');

        sections.forEach((section: any, idx: number) => {
            ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onEnter: () => setActiveIndex(idx),
                onEnterBack: () => setActiveIndex(idx),
            });
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative bg-black">
            {/* TOP CENTER TITLE (Global for this section) */}
            <div className="absolute top-8 lg:top-12 left-1/2 -translate-x-1/2 z-50 text-center">
                <span className="text-brand-primary text-[8px] lg:text-[10px] uppercase tracking-[0.6em] font-bold block mb-1 lg:mb-2 opacity-50">
                    Portfolio
                </span>
                <h2 className="text-white text-lg lg:text-2xl font-sans font-black uppercase tracking-[0.2em]">
                    Service <span className="text-brand-primary">Excellence</span>
                </h2>
                <div className="w-8 lg:w-12 h-[1px] bg-brand-primary/50 mx-auto mt-2 lg:mt-4" />
            </div>

            <div className="relative w-full flex flex-col lg:flex-row">

                {/* LEFT SIDE: SCROLLING CONTENT (Desktop Only) */}
                <div className="hidden lg:block w-1/2 relative z-10">
                    {INITIAL_DESTINATIONS.map((dest, idx) => (
                        <div
                            key={dest.id}
                            className="project-section h-screen flex flex-col justify-center px-6 lg:px-20 py-32 lg:py-0"
                        >
                            <div className="max-w-xl">
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="text-brand-primary text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block"
                                >
                                    Project 0{idx + 1}
                                </motion.span>
                                <motion.h3
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="text-white text-4xl lg:text-7xl font-sans font-black uppercase tracking-tighter leading-none mb-8"
                                >
                                    {dest.title}
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-white/40 text-sm lg:text-base leading-relaxed mb-10 max-w-md"
                                >
                                    {dest.description}
                                </motion.p>
                                <button className="px-10 py-4 rounded-full border border-white/10 text-[10px] uppercase font-bold tracking-widest text-white/60 hover:bg-brand-primary hover:text-black hover:border-brand-primary transition-all duration-500">
                                    Explore Project
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* RIGHT SIDE: STICKY IMAGE (Full screen on mobile) */}
                <div className="w-full lg:w-1/2 h-[100dvh] lg:h-screen sticky top-0 z-20 bg-zinc-650/50">
                    <div className="w-full h-full flex items-center justify-center p-6 lg:p-10">
                        <PerspectiveCanvas activeItem={INITIAL_DESTINATIONS[activeIndex]} />
                    </div>

                    {/* Index Indicator (Desktop) */}
                    <div className="hidden lg:flex absolute bottom-20 right-20 items-center gap-6">
                        <span className="text-6xl font-black text-white/90">0{activeIndex + 1}</span>
                        <div className="h-10 w-[1px] bg-white/20 rotate-[25deg]" />
                        <span className="text-xl text-white/30">0{INITIAL_DESTINATIONS.length}</span>
                    </div>

                    {/* Mobile Navigation Controls */}
                    <div className="lg:hidden absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-8 bg-black/50 backdrop-blur-md px-6 py-4 rounded-full border border-white/10">
                        <button
                            onClick={() => setActiveIndex(prev => (prev - 1 + INITIAL_DESTINATIONS.length) % INITIAL_DESTINATIONS.length)}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-brand-primary hover:border-brand-primary transition-colors active:scale-90"
                        >
                            ←
                        </button>
                        <div className="flex flex-col items-center min-w-[60px]">
                            <span className="text-2xl font-black text-brand-primary">0{activeIndex + 1}</span>
                            <span className="text-[8px] text-white/30 uppercase tracking-widest mt-1">Project</span>
                        </div>
                        <button
                            onClick={() => setActiveIndex(prev => (prev + 1) % INITIAL_DESTINATIONS.length)}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-brand-primary hover:border-brand-primary transition-colors active:scale-90"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularServices;
