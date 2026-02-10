'use client';
import React from 'react';
import Link from 'next/link';
import Magnetic from '@/components/Magnetic';
import { motion, useTransform } from 'framer-motion';
import { ArrowRight, Crosshair, Terminal } from 'lucide-react';
import { useHeroAnimation } from './animation';
import { HERO_CONTENT } from './content';

const Hero: React.FC = () => {
    const { springX, springY, handleMouseMove } = useHeroAnimation();

    return (
        <div onMouseMove={handleMouseMove} className="bg-brand-dark text-white selection:bg- selection:text-black">
            {/* --- 1. RE-STYLED KINETIC HERO --- */}
            <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#030303]">

                {/* Technical Drawing Grid */}
                <div className="absolute inset-0 z-0 overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A1A1A_1px,transparent_1px),linear-gradient(to_bottom,#1A1A1A_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                    <motion.div
                        style={{ x: useTransform(springX, [-0.5, 0.5], [-100, 100]), y: useTransform(springY, [-0.5, 0.5], [-100, 100]) }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-brand-primary/20 rounded-full"
                    />
                </div>

                {/* Floating HUD Elements */}
                <div className="absolute top-32 left-12 z-10 flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">{HERO_CONTENT.monitorResult}</span>
                    </div>
                    <div className="text-[8px] font-mono text-slate-600 uppercase">{HERO_CONTENT.sysCoord}</div>
                </div>

                <div className="absolute bottom-32 right-12 z-10 text-right hidden lg:block">
                    <Terminal size={16} className="text-brand-primary mb-2 ml-auto" />
                    <p className="text-[9px] font-mono text-slate-500 uppercase max-w-[150px] leading-relaxed">
                        {HERO_CONTENT.specs.material} <br />
                        {HERO_CONTENT.specs.finish} <br />
                        {HERO_CONTENT.specs.tolerance}
                    </p>
                </div>

                <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 text-brand-primary font-bold uppercase tracking-[0.6em] text-[10px] mb-6 px-4 py-1 border-x border-brand-primary/40"
                    >
                        <Crosshair size={12} /> {HERO_CONTENT.labLabel}
                    </motion.div>

                    <div className="relative">
                        {/* Main Title with Stroke Effect */}
                        <h1 className="text-[14vw] font-display font-black uppercase leading-[0.75] tracking-tighter italic mb-12 flex flex-col items-center">
                            <motion.span
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "circOut" }}
                                className="block"
                            >
                                {HERO_CONTENT.title.line1}
                            </motion.span>
                            <motion.span
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "circOut", delay: 0.1 }}
                                className="text-brand-primary"
                            >
                                {HERO_CONTENT.title.line2}
                            </motion.span>
                        </h1>

                        {/* Decorative Corner Brackets */}
                        <div className="absolute -top-10 -left-10 w-20 h-20 border-t-2 border-l-2 border-brand-primary/20"></div>
                        <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-2 border-r-2 border-brand-primary/20"></div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-24">
                        <p className="max-w-[280px] text-slate-500 text-[11px] font-bold uppercase tracking-widest text-center leading-relaxed">
                            {HERO_CONTENT.description}
                        </p>
                        <Magnetic strength={0.3}>
                            <Link href="/contact">
                                <div className="group relative bg-white text-black p-8 text-xl font-black uppercase tracking-widest transition-all hover:bg-brand-primary overflow-hidden">
                                    <span className="relative z-10 flex items-center gap-4">
                                        {HERO_CONTENT.cta} <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                                    </span>
                                    {/* Animated Scanner Glow */}
                                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary group-hover:left-full transition-all duration-700 ease-in-out"></div>
                                </div>
                            </Link>
                        </Magnetic>
                    </div>
                </div>

                {/* Mouse-reactive Coordinate Ring */}
                <motion.div
                    style={{
                        x: useTransform(springX, [-0.5, 0.5], [-200, 200]),
                        y: useTransform(springY, [-0.5, 0.5], [-200, 200]),
                        opacity: 0.1
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-2 border-brand-primary pointer-events-none flex items-center justify-center rounded-full"
                >
                    <div className="w-[1px] h-full bg-brand-primary absolute left-1/2 -translate-x-1/2"></div>
                    <div className="h-[1px] w-full bg-brand-primary absolute top-1/2 -translate-y-1/2"></div>
                </motion.div>
            </section>
        </div>
    );
};

export default Hero;
