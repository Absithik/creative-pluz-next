"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MobileServices } from './MobileServices.client';
import { DesktopServices } from './DesktopServices.client';
import './ServicesScroll.css';

// Define the shape of your service data (optional, but good for TS)
type ServiceItem = {
    bgImage: string;
    title: string;
    description: string;
    // Add other properties from your data file
};

export const ServicesScrollClient = ({ services }: { services: any[] }) => {
    const containerRef = useRef<HTMLElement>(null);

    // Track scroll progress relative to this specific section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Animation Logic
    const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.05], [0, -100]);
    const pointerEvents = useTransform(scrollYProgress, (val) => (val > 0.05 ? 'none' : 'auto'));

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-black"
        >
            {/* HEADER OVERLAY (Sticky) */}
            <div className="sticky top-0 h-screen overflow-hidden pointer-events-none z-20">
                <motion.header
                    style={{
                        opacity: headerOpacity,
                        y: headerY,
                        pointerEvents
                    }}
                    className="w-full h-full flex flex-col justify-center items-center p-6 md:p-12"
                >
                    <div className="max-w-[1920px] w-full mx-auto pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h4 className="text-brand-primary font-bold uppercase tracking-widest text-sm mb-4">
                                Our Services
                            </h4>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
                                Our Services <br />
                                <span className="text-brand-primary">Partnership</span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-xl mb-8">
                                Comprehensive design and development solutions for your business.
                                Scroll to explore.
                            </p>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 text-white font-bold border-b border-brand-primary pb-1 hover:text-brand-primary transition-colors"
                            >
                                Explore Capabilities <ArrowRight className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    </div>
                </motion.header>
            </div>

            {/* SCROLL CONTENT */}
            <div className="relative z-10 w-full -mt-[20vh]">
                <div id="services-section" className="relative z-0">
                    <div className="hidden lg:block sticky-section">
                        <DesktopServices services={services} />
                    </div>
                    <div className="block lg:hidden sticky-section">
                        <MobileServices services={services} />
                    </div>
                </div>
            </div>
        </section>
    );
};