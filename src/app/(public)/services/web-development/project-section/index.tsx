// components/PopularServices/index.tsx
import React from 'react';
import { INITIAL_DESTINATIONS } from './data/destinations';
import ProjectListClient from './ProjectList.client';

const PopularServices: React.FC = () => {
    return (
        <section className="relative bg-black" aria-label="Portfolio Projects">
            {/* Semantic Header (Server Rendered) */}
            <div className="absolute top-8 lg:top-12 left-1/2 -translate-x-1/2 z-50 text-center w-full">
                <span className="text-brand-primary text-[8px] lg:text-[10px] uppercase tracking-[0.6em] font-bold block mb-1 lg:mb-2 opacity-50">
                    Portfolio
                </span>
                <h2 className="text-white text-lg lg:text-2xl font-sans font-black uppercase tracking-[0.2em]">
                    Service <span className="text-brand-primary">Excellence</span>
                </h2>
                <div className="w-8 lg:w-12 h-[1px] bg-brand-primary/50 mx-auto mt-2 lg:mt-4" />
            </div>

            {/* Main Content Layout */}
            <ProjectListClient destinations={INITIAL_DESTINATIONS} />
        </section>
    );
};

export default PopularServices;