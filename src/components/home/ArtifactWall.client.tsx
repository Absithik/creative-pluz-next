'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Interface for Slot Data from API
interface SlotData {
    _id: string;
    slotIndex: number;
    project: {
        _id: string;
        title: string;
        slug: string;
        category: string;
        year: number;
        description?: string;
        coverImage: {
            url: string;
            alt: string;
        };
    } | null;
}

const SLOT_CONFIG = [
    { type: 'large' },       // 0
    { type: 'standard' },    // 1
    { type: 'vertical' },    // 2
    { type: 'standard' },    // 3
    { type: 'standard' },    // 4
    { type: 'large' },       // 5
    { type: 'standard' },    // 6
    { type: 'standard' },    // 7
];

export const ArtifactWall = () => {
    const [slots, setSlots] = useState<SlotData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const res = await fetch('/api/layout-slots', {
                    next: { revalidate: 60 }
                });
                const data = await res.json();
                if (data.success) {
                    setSlots(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch layout slots:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSlots();
    }, []);

    if (loading) {
        return <div className="min-h-[50vh] flex items-center justify-center bg-black text-white/50">Loading Artifacts...</div>;
    }

    return (
        <section className="py-12 md:py-20 bg-black overflow-hidden relative">
            {/* Background Elements could go here */}

            <div className="max-w-[1920px] mx-auto px-6 md:px-12">

                {/* Header Section from original, preserved or simplified? 
                     User provided snippet didn't include header, but original file did. 
                     I will keep the grid as the main focus as requested. 
                 */}

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[300px] md:auto-rows-[350px] lg:auto-rows-[400px] grid-flow-row-dense"
                >
                    <AnimatePresence mode="popLayout">
                        {SLOT_CONFIG.map((config, index) => {
                            const slotData = slots.find(s => s.slotIndex === index);
                            const project = slotData?.project;

                            // Determine classes based on FIXED layout type
                            let spanClass = '';
                            if (config.type === 'large') spanClass = 'md:col-span-2 md:row-span-2';
                            if (config.type === 'vertical') spanClass = 'md:row-span-2';

                            return (
                                <motion.div
                                    layout
                                    key={index} // Key by index as structure is fixed
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className={`relative group overflow-hidden rounded-[2rem] border cursor-pointer border-white/5 bg-brand-gray ${spanClass}`}
                                >
                                    {project ? (
                                        <Link href={`/portfolio/${project.slug}`} className="block h-full w-full relative z-10">

                                            {/* Image Container with Zoom Effect */}
                                            <div className="w-full h-full overflow-hidden">
                                                <img
                                                    src={project.coverImage.url}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110"
                                                />
                                            </div>

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                                            {/* Content Overlay */}
                                            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                                                <div className="flex justify-between items-end w-full">
                                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                                                        <div className="flex items-center gap-3 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                                                            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                                                {project.category}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white uppercase leading-[0.85] tracking-tight">
                                                            {project.title}
                                                        </h3>
                                                        {project.description && (
                                                            <p className="text-white/60 text-sm mt-3 max-w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0 line-clamp-2">
                                                                {project.description}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="relative">
                                                        <div className="w-14 h-14 rounded-full bg-brand-primary text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 rotate-45 group-hover:rotate-0">
                                                            <ArrowRight className="w-6 h-6" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Year Tag */}
                                            <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white/80 font-mono text-xs font-medium border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                {project.year}
                                            </div>
                                        </Link>
                                    ) : (
                                        // Empty Slot State
                                        <div className="h-full w-full flex flex-col items-center justify-center text-white/20 p-8 text-center bg-zinc-900/50">
                                            <Sparkles className="w-12 h-12 mb-4 opacity-50" />
                                            <p className="uppercase tracking-widest text-xs font-bold">Available Slot</p>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};
