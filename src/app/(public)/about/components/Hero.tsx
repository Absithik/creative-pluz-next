'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '@/components/Magnetic';
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const bigLetterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial Hero Assembly
            gsap.from(".portal-frame", {
                opacity: 0,
                scale: 0.5,
                z: -1000,
                duration: 1.5,
                ease: "power4.out"
            });

            // 2. STATS PARALLAX (Horizontal drift)
            gsap.to(".stat-item", {
                x: (i) => (i % 2 === 0 ? -100 : 100),
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef}
            className="relative min-h-screen md:h-[120vh] w-full bg-brand-dark flex flex-col items-center justify-center overflow-hidden py-20"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[80vw] h-[120vw] md:h-[80vw] bg-brand-primary/5 rounded-full blur-[80px] md:blur-[150px]"></div>
                <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                    className="w-full h-full object-cover opacity-10 md:opacity-20 grayscale"
                    alt="Background Team"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark"></div>
            </div>

            {/* Massive Clipping Letter */}
            <div ref={bigLetterRef} className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none">
                <h2 className="text-[80vw] md:text-[60vw] font-display font-black text-white/[0.03] leading-none uppercase tracking-tighter">
                    C
                </h2>
            </div>

            {/* Hero Content */}
            <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 border border-brand-primary/30 rounded-full bg-brand-primary/5 mb-6 md:mb-8"
                >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand-primary animate-pulse"></div>
                    <span className="text-brand-primary font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-[10px]">Designing & Printing Salem's Success Stories</span>
                </motion.div>

                {/* Main Title */}
                <h2 ref={heroTitleRef} className="text-[7vw] sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-white mb-8 md:mb-12 leading-[0.9] md:leading-[0.85] uppercase italic">
                    <span className="word block">Creative</span>
                    <span className="word block text-brand-primary">Pluz</span>
                    <span className="word block relative inline-block">
                        Agency
                        <svg className="absolute w-full h-2 md:h-3 -bottom-2 md:-bottom-4 left-0 text-brand-primary/50" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </span>
                </h2>

                {/* Stats Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-24 mt-12 md:mt-20 max-w-3xl mx-auto">
                    {[
                        { label: "Deep Expertise", val: "10Y+", color: "text-brand-primary" },
                        { label: "Brands Built", val: "250+", color: "text-white" },
                        { label: "Client Retention", val: "98%", color: "text-brand-primary" }
                    ].map((stat, i) => (
                        <div key={i} className="stat-item flex flex-col items-center">
                            <span className={`text-5xl md:text-7xl font-display font-black mb-1 md:mb-2 ${stat.color}`}>{stat.val}</span>
                            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-500">{stat.label}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-12 md:mt-20">
                    <Magnetic strength={0.2}>
                        <Button href="/contact" className="group w-full sm:w-auto bg-white text-black px-8 py-4 md:px-12 md:py-6 text-base md:text-lg rounded-none hover:bg-brand-primary transition-all font-bold uppercase tracking-widest overflow-hidden relative">
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                Start Your Project <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </span>
                        </Button>
                    </Magnetic>
                </div>
            </div>

            {/* Scroll Hint */}
            <div className="hidden md:flex absolute bottom-24 left-1/2 -translate-x-1/2 flex-col items-center gap-4 opacity-30">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] [writing-mode:vertical-lr] mb-2">Manifesto</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-brand-primary to-transparent"></div>
            </div>
        </section>
    );
}
