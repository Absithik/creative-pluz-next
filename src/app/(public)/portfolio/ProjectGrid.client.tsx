'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useProjectsFilter } from './hooks/useProjectsFilter';
import { useProjectsPagination } from './hooks/useProjectsPagination';
import type { Project as ProjectType } from './types';

// Slot Configuration matches Layout Manager (0-7)
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

interface LayoutSlot {
    slotIndex: number;
    project: ProjectType | null;
}

interface ProjectGridProps {
    projects: ProjectType[]; // Fallback or initial data
    layoutSlots: LayoutSlot[]; // New prop for "All" view
}

export default function ProjectGrid({ projects: initialProjects, layoutSlots }: ProjectGridProps) {
    const { filter } = useProjectsFilter();
    const { projects: paginatedProjects, loading, hasMore, loadMore } = useProjectsPagination(filter);
    const observerTarget = useRef(null);

    // Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasMore, loadMore]);

    // RENDER LOGIC:
    // If Filter is 'All', use Bento Grid with layoutSlots
    // If Filter is specific, use Masonry Grid with paginatedProjects

    if (filter === 'All') {
        return (
            <section className="px-6 lg:px-12 max-w-[1920px] mx-auto pb-40">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-[300px] grid-flow-row-dense"
                >
                    <AnimatePresence mode="popLayout">
                        {SLOT_CONFIG.map((config, index) => {
                            // Find the project assigned to this slot index
                            const slot = layoutSlots.find(s => s.slotIndex === index);
                            const project = slot?.project;

                            // Skip rendering if no project assigned? Or render placeholder?
                            // User asked to "show layout manager's layout".
                            // If empty, we can hide or show placeholder. Let's show nothing if empty to keep it clean, 
                            // OR show placeholder if it preserves grid structure. 
                            // Preserving grid structure is critical for Bento.

                            let spanClass = '';
                            if (config.type === 'large') spanClass = 'md:col-span-2 md:row-span-2';
                            if (config.type === 'vertical') spanClass = 'md:row-span-2';

                            if (!project) return null; // Or render empty div with class if strict grid needed

                            return (
                                <motion.article
                                    layout
                                    key={`slot-${index}-${project._id}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className={`relative group overflow-hidden rounded-[2rem] bg-gray-900 border border-white/5 ${spanClass}`}
                                >
                                    <ProjectCardContent project={project} />
                                </motion.article>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </section>
        );
    }

    // Category View (Masonry / Standard Grid)
    return (
        <section className="px-6 lg:px-12 max-w-[1920px] mx-auto pb-40">
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-[300px]"
            >
                <AnimatePresence mode="popLayout">
                    {paginatedProjects.map((project, index) => (
                        <motion.article
                            layout
                            key={project._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className={`relative group overflow-hidden rounded-[2rem] bg-gray-900 border border-white/5 
                                ${project.size === 'large' ? 'md:col-span-2 md:row-span-2' :
                                    project.size === 'vertical' ? 'md:row-span-2' : ''}
                            `}
                        >
                            <ProjectCardContent project={project} />
                        </motion.article>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Loading / Infinite Scroll Sentinel */}
            <div ref={observerTarget} className="py-10 text-center">
                {loading && <div className="text-white/40">Loading more projects...</div>}
                {!hasMore && paginatedProjects.length > 0 && <div className="text-white/20 text-sm">End of results</div>}
            </div>

            {/* Empty State */}
            {!loading && paginatedProjects.length === 0 && (
                <div className="text-center py-20">
                    <h3 className="text-2xl font-display font-bold text-white mb-4">No projects found</h3>
                    <p className="text-slate-400">Try selecting a different category.</p>
                </div>
            )}
        </section>
    );
}

// Sub-component for cleaner code
function ProjectCardContent({ project }: { project: ProjectType }) {
    return (
        <Link
            href={`/portfolio/${project.slug}`}
            className="block h-full w-full focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded-[2rem]"
            aria-label={`View ${project.title} project details`}
        >
            {/* Image */}
            <img
                src={project.coverImage?.url || '/placeholder.jpg'}
                alt={project.coverImage?.alt || project.title}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                loading="lazy"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block px-3 py-1 bg-brand-primary text-black text-[10px] font-black uppercase tracking-widest mb-4">
                            {project.category}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase leading-none">
                            {project.title}
                        </h2>
                        {project.clientName && (
                            <p className="text-slate-400 text-sm mt-2">for {project.clientName}</p>
                        )}
                    </div>
                    <div
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 shrink-0"
                        aria-hidden="true"
                    >
                        <ArrowUpRight className="text-brand-primary" />
                    </div>
                </div>
            </div>

            {/* Corner Tag */}
            <div
                className="absolute top-8 right-8 text-white/40 font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
            >
                {project.year}
            </div>
        </Link>
    );
}
