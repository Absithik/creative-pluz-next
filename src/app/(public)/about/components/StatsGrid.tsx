'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Smile, Coffee } from 'lucide-react';

export default function StatsGrid() {
    const stats = [
        { label: "Market Leaders", val: "50+", icon: <Award className="w-8 h-8 mb-6 mx-auto text-brand-primary/40" /> },
        { label: "Design Iterations", val: "∞", icon: <Coffee className="w-8 h-8 mb-6 mx-auto text-brand-primary/40" /> },
        { label: "Average Growth", val: "4.5x", icon: <Zap className="w-8 h-8 mb-6 mx-auto text-brand-primary/40" /> },
        { label: "Global Reach", val: "12", icon: <Smile className="w-8 h-8 mb-6 mx-auto text-brand-primary/40" /> }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
            {stats.map((stat, idx) => (
                <motion.div key={idx} whileHover={{ y: -10 }} className="group">
                    {stat.icon}
                    <div className="text-5xl md:text-7xl font-display font-black text-white mb-3 group-hover:text-brand-primary transition-colors italic">{stat.val}</div>
                    <div className="text-slate-500 font-black uppercase tracking-[0.3em] text-[9px]">{stat.label}</div>
                </motion.div>
            ))}
        </div>
    );
}
