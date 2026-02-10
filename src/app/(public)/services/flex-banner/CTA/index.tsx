'use client';

import React from 'react';
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
    return (
        <section className="py-10 bg-brand-primary text-black text-center">
            <h2 className="text-5xl md:text-8xl font-display font-black uppercase italic mb-8">Make An Impact.</h2>
            <Button href="/contact" className="bg-black text-white px-12 py-6 rounded-none text-lg font-bold uppercase tracking-widest">Start Large Scale Project <ArrowRight className="ml-2" /></Button>
        </section>
    );
};

export default CTA;
