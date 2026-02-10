'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Marquee = () => {
    return (
        <div className="py-12 bg-brand-primary overflow-hidden whitespace-nowrap border-y-4 border-black">
            <motion.div
                className="inline-block"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-6xl md:text-8xl font-display font-black text-black uppercase tracking-tight mx-8">
                        Branding • Design • Photography • Signage •
                    </span>
                ))}
            </motion.div>
        </div>
    );
};
