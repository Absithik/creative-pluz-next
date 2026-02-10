"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MasonryItem {
    id: number;
    title: string;
    category: string;
    img: string;
    aspect: string;
}

interface MasonryGridProps {
    items: MasonryItem[];
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ items }) => {
    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {items.map((item, i) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ delay: i * 0.05, duration: 0.6 }}
                    className="break-inside-avoid relative group rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/50"
                >
                    {/* Image Container with Aspect Ratio */}
                    <div className={`w-full ${item.aspect} relative`}>
                        <img
                            src={item.img}
                            alt={item.title}
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                    </div>

                    {/* Hover Overlay Information */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1 block">
                                {item.category}
                            </span>
                            <h3 className="text-white font-display text-2xl uppercase tracking-tight drop-shadow-lg">
                                {item.title}
                            </h3>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default MasonryGrid;
