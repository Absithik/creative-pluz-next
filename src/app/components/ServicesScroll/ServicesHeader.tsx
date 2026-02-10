// app/components/ServicesScroll/ServicesHeader.tsx (SERVER COMPONENT)
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const ServicesHeader = () => {
    return (
        <>
            <h4 className="text-brand-primary font-bold uppercase tracking-widest text-sm mb-4">
                Our Services
            </h4>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
                Our Services <br />
                <span className="text-brand-primary">Partnership</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl mb-8">
                Comprehensive design and development solutions for your business.
                Scroll to explore.
            </p>
            <Link
                href="/services"
                className="inline-flex items-center gap-2 text-white font-bold border-b border-brand-primary pb-1 hover:text-brand-primary transition-colors"
            >
                Explore Capabilities <ArrowRight className="w-5 h-5" />
            </Link>
        </>
    );
};