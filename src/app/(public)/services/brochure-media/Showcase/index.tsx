'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Button from '@/components/Button'; // Assuming you have this from previous code
import { portfolioItems } from './content';
import { motionVariants } from './animation';

const ShowcaseSection: React.FC = () => {
    return (
        <section className="py-20 bg-black relative z-10">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

                {/* --- 1. HEADER SECTION (Matches your Brand Style) --- */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                        <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                            Our Portfolio
                        </span>
                        <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter text-white uppercase leading-[0.9]">
                            Selected <br /> Works
                        </h2>
                    </div>
                    <div className="flex flex-col items-end gap-6">
                        <p className="text-zinc-400 max-w-sm text-right text-sm leading-relaxed">
                            A showcase of digital craftsmanship and physical branding. Where strategy meets execution.
                        </p>
                        <Button href="/work" className="hidden md:flex bg-white text-black hover:bg-brand-primary hover:text-black border-none">
                            View All Projects
                        </Button>
                    </div>
                </div>

                {/* --- 2. PROJECT GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {portfolioItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={motionVariants.initial}
                            whileInView={motionVariants.whileInView}
                            transition={motionVariants.transition}
                            viewport={{ once: true, amount: 0.2 }}
                            // Stagger effect: Pushes every second item down slightly on desktop for a dynamic look
                            className={`${index % 2 === 1 ? 'md:translate-y-16' : ''}`}
                        >
                            <div className="group cursor-pointer relative block">

                                {/* Image Container */}
                                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] border border-zinc-800 group-hover:border-brand-primary/50 transition-colors duration-500">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                    {/* Hover Reveal: Arrow */}
                                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>

                                {/* Content Below Image (Cleaner Look) */}
                                <div className="mt-6 flex justify-between items-start">
                                    <div>
                                        <h4 className="text-2xl font-heading font-bold text-white uppercase mb-2 group-hover:text-brand-primary transition-colors">
                                            {item.title}
                                        </h4>
                                        <div className="flex gap-2">
                                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 border border-zinc-800 px-3 py-1 rounded-full">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-zinc-600 font-mono text-sm">0{index + 1}</span>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Button (Visible only on mobile) */}
                <div className="mt-16 md:hidden flex justify-center">
                    <Button href="/work" className="w-full bg-white text-black">
                        View All Projects
                    </Button>
                </div>

            </div>
        </section>
    );
};

export default ShowcaseSection;