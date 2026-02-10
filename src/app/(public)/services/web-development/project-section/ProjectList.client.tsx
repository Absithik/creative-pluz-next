// components/PopularServices/ProjectList.client.tsx
'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ProjectListProps } from './types';
import PerspectiveCanvasClient from './PerspectiveCanvas.client';

gsap.registerPlugin(ScrollTrigger);

const ProjectListClient: React.FC<ProjectListProps> = ({ destinations }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
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

    // Mobile Navigation Handlers
    const handlePrev = () => setActiveIndex(prev => (prev - 1 + destinations.length) % destinations.length);
    const handleNext = () => setActiveIndex(prev => (prev + 1) % destinations.length);

    return (
        <div ref={containerRef} className="relative w-full flex flex-col lg:flex-row">

            {/* LEFT SIDE: SCROLLING CONTENT (Desktop Only) */}
            <div className="hidden lg:block w-1/2 relative z-10">
                {destinations.map((dest, idx) => (
                    <article
                        key={dest.id}
                        className="project-section h-screen flex flex-col justify-center px-6 lg:px-20 py-32 lg:py-0"
                    >
                        <div className="max-w-xl">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                // CHANGED: Used font-display and adjusted tracking for a sharper look
                                className="text-brand-primary text-xs font-display uppercase tracking-[0.3em] font-bold mb-4 block"
                            >
                                Project 0{idx + 1}
                            </motion.span>

                            <motion.h3
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                // CHANGED: Applied 'font-display font-black italic' for the signature style
                                className="text-white text-5xl lg:text-7xl font-display font-black italic uppercase tracking-tighter leading-[0.9] mb-8"
                            >
                                {dest.title}
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                // CHANGED: Used 'font-sans' (Inter) for clean readability
                                className="text-white/60 text-base lg:text-lg font-sans font-light leading-relaxed mb-10 max-w-md"
                            >
                                {dest.description}
                            </motion.p>

                            {dest.projectUrl ? (
                                <Link
                                    href={dest.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    // CHANGED: Updated button font to match the new aesthetic
                                    className="inline-block px-10 py-4 border border-white/20 text-xs font-display font-bold uppercase tracking-[0.2em] text-white hover:bg-brand-primary hover:text-black hover:border-brand-primary transition-all duration-300"
                                >
                                    Explore Project
                                </Link>
                            ) : (
                                <button disabled className="px-10 py-4 border border-white/5 text-xs font-display font-bold uppercase tracking-[0.2em] text-white/20 cursor-not-allowed">
                                    Coming Soon
                                </button>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {/* RIGHT SIDE: STICKY IMAGE / INTERACTIVE CANVAS */}
            <div className="w-full lg:w-1/2 h-[100dvh] lg:h-screen sticky top-0 z-20 bg-zinc-650/50">
                <div className="w-full h-full flex items-center justify-center p-6 lg:p-10">
                    <PerspectiveCanvasClient activeItem={destinations[activeIndex]} />
                </div>

                {/* Index Indicator (Desktop) */}
                <div className="hidden lg:flex absolute bottom-20 right-20 items-center gap-6 pointer-events-none select-none">
                    <span className="text-6xl font-black text-white/90">0{activeIndex + 1}</span>
                    <div className="h-10 w-[1px] bg-white/20 rotate-[25deg]" />
                    <span className="text-xl text-white/30">0{destinations.length}</span>
                </div>

                {/* Mobile Navigation Controls */}
                <div className="lg:hidden absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-8 bg-black/50 backdrop-blur-md px-6 py-4 rounded-full border border-white/10">
                    <button
                        onClick={handlePrev}
                        aria-label="Previous Project"
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-brand-primary hover:border-brand-primary transition-colors active:scale-90"
                    >
                        ←
                    </button>
                    <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-2xl font-black text-brand-primary">0{activeIndex + 1}</span>
                        <span className="text-[8px] text-white/30 uppercase tracking-widest mt-1">Project</span>
                    </div>
                    <button
                        onClick={handleNext}
                        aria-label="Next Project"
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-brand-primary hover:border-brand-primary transition-colors active:scale-90"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectListClient;