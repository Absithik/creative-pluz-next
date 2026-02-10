'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SURFACE_CONTENT } from './content';
import { surfaceCardHover } from './animation';
import Image from 'next/image';

const Surface: React.FC = () => {
    return (
        <section className="py-40 bg-[#050505] relative overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap opacity-[0.02] pointer-events-none select-none">
                <span className="text-[30vw] font-display font-black uppercase italic">{SURFACE_CONTENT.backgroundText}</span>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-5xl md:text-7xl font-display font-bold text-white uppercase italic mb-6">
                        {SURFACE_CONTENT.title.line1} <br /> {SURFACE_CONTENT.title.line2}
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto uppercase tracking-widest text-xs font-bold">{SURFACE_CONTENT.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {SURFACE_CONTENT.cards.map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={surfaceCardHover.hover}
                            className="group relative h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10"
                        >
                            <img src={item.img} className="w-full h-full object-cover  transition-all duration-1000 group-hover:scale-110" alt={item.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"></div>
                            <div className="absolute bottom-12 left-12 right-12">
                                <h4 className={`text-4xl font-display font-black uppercase italic mb-4 ${item.color}`}>{item.title}</h4>
                                <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Surface;
