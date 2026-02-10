"use client";

import React, { useEffect, useRef } from 'react';
import { GALLERY_ITEMS } from './constants';
import BentoCard from './BentoCard';
import gsap from 'gsap';

const BentoGrid: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const elements = ['#badge', '#main-title', '#sub-title'];

            gsap.to(elements, {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '#badge',
                    start: 'top 90%',
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-24">

            {/* Centered Typography Section */}
            <div className="mt-20 md:mt-32 mb-20 text-center space-y-6 max-w-3xl mx-auto px-6">
                <div id="badge" className="inline-block px-4 py-1 rounded-full border border-gray-100 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 bg-white shadow-sm opacity-0 translate-y-4">
                    Creative Pluz Curation 2024
                </div>
                <h2 id="main-title" className="text-4xl md:text-6xl font-bold text-brand-primary tracking-tight opacity-0 translate-y-4 leading-[1.1]">
                    Designing the <br />
                    <span className="text-gray-300">future of brand impact</span>
                </h2>
                <p id="sub-title" className="text-lg md:text-xl text-gray-400 font-medium opacity-0 translate-y-4 max-w-lg mx-auto">
                    A collection of works where raw creativity meets technical precision.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 grid-flow-row-dense gap-2 md:gap-4 auto-rows-[100px] md:auto-rows-[110px]">
                {GALLERY_ITEMS.map((item, index) => (
                    <BentoCard key={item.id} item={item} index={index} />
                ))}
            </div>


        </section>
    );
};

export default BentoGrid;
