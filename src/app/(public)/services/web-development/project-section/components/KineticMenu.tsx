'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Destination } from '../types';

interface KineticMenuProps {
    items: Destination[];
    activeIndex: number;
    onHover: (index: number) => void;
}

export const KineticMenu: React.FC<KineticMenuProps> = ({ items, activeIndex, onHover }) => {
    return (
        <nav className="flex flex-col gap-4">
            {items.map((item, idx) => (
                <div
                    key={item.id}
                    onMouseEnter={() => onHover(idx)}
                    className="group relative cursor-pointer py-2"
                >
                    {/* Background Lettering (Kinetic Typography) */}
                    <div className="absolute -top-10 left-0 pointer-events-none transition-all duration-700 opacity-0 group-hover:opacity-10 translate-x-10 group-hover:translate-x-0">
                        <span className="text-8xl font-black text-white whitespace-nowrap uppercase tracking-tighter select-none">
                            {item.title}
                        </span>
                    </div>

                    {/* Main Title */}
                    <div className="relative z-10 flex items-center gap-6">
                        <motion.div
                            animate={{
                                width: idx === activeIndex ? 60 : 0,
                                opacity: idx === activeIndex ? 1 : 0
                            }}
                            className="h-[2px] bg-brand-primary"
                        />
                        <span
                            className={`text-2xl lg:text-5xl font-sans font-black uppercase tracking-tighter transition-all duration-500
                                ${idx === activeIndex
                                    ? 'text-brand-primary translate-x-4'
                                    : 'text-white/40 group-hover:text-white/70'
                                }
                            `}
                        >
                            {item.title}
                        </span>
                    </div>

                    {/* Metadata on hover */}
                    <AnimatePresence>
                        {idx === activeIndex && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="pl-20 mt-2"
                            >
                                <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-medium max-w-xs leading-relaxed">
                                    {item.description.split('. ')[0]}.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </nav>
    );
};

