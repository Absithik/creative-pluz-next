import React from 'react';
import MasonryGrid from './MasonryGrid.client';

import { STUDIO_IMAGES } from '../../data/images';

const masonryItems = [
    { id: 1, title: "Metro Station Takeover", category: "OOH Media", img: STUDIO_IMAGES[0], aspect: "aspect-[4/3]" },
    { id: 2, title: "Luxury Magazine Insert", category: "Print", img: STUDIO_IMAGES[1], aspect: "aspect-[3/4]" },
    { id: 3, title: "Festival Wayfinding", category: "Signage", img: STUDIO_IMAGES[2], aspect: "aspect-square" },
    { id: 4, title: "Corporate Stationery", category: "Branding", img: STUDIO_IMAGES[3], aspect: "aspect-[16/9]" },
    { id: 5, title: "Retail Lightbox", category: "Display", img: STUDIO_IMAGES[4], aspect: "aspect-[3/4]" },
    { id: 6, title: "Vehicle Wrap", category: "Vinyl", img: STUDIO_IMAGES[5], aspect: "aspect-[16/9]" },
    { id: 7, title: "Packaging Series", category: "Packaging", img: STUDIO_IMAGES[6], aspect: "aspect-square" },
    { id: 8, title: "Event Backdrop", category: "Large Format", img: STUDIO_IMAGES[7], aspect: "aspect-[4/5]" },
    { id: 9, title: "Street Poster Run", category: "Urban", img: STUDIO_IMAGES[8], aspect: "aspect-[2/3]" },
    { id: 10, title: "Coffee Table Book", category: "Editorial", img: STUDIO_IMAGES[9], aspect: "aspect-[3/2]" },
    { id: 11, title: "Concert Wristbands", category: "Merch", img: STUDIO_IMAGES[10], aspect: "aspect-square" },
    { id: 12, title: "Museum Guide", category: "Brochure", img: STUDIO_IMAGES[11], aspect: "aspect-[3/4]" },
];

const PrintAdGrid: React.FC = () => {
    return (
        <section className="py- px-4 md:px-8 pb-8 bg-zinc-950 relative border-t border-zinc-900">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
                    {/* Header Content */}
                    <div>
                        {/* UPDATED: Using your custom brand color and spacing */}
                        <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                            Tangible Assets
                        </span>

                        {/* UPDATED: Switched to 'font-heading' and added 'tracking-tighter' for a modern look */}
                        <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter text-white uppercase leading-[0.9]">
                            Print & <br /> Advertising
                        </h2>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                        {/* Slightly lighter text-zinc-400 for better contrast against black */}
                        <p className="text-zinc-400 max-w-sm text-right text-sm leading-relaxed">
                            From tangible textures to towering billboards. A collection of physical artifacts designed to disrupt the real world.
                        </p>
                        <div className="h-px w-24 bg-zinc-800" />
                    </div>
                </div>

                {/* Masonry Layout via Client Component */}
                <MasonryGrid items={masonryItems} />

                <div className="mt-24 text-center">
                    <button className="text-white uppercase text-xs font-bold tracking-[0.2em] border-b border-white/20 pb-1 hover:text-emerald-500 hover:border-emerald-500 transition-colors">
                        View All Print Work
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PrintAdGrid;
