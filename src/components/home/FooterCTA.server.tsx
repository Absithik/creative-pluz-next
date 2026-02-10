import React from 'react';
import Button from '@/components/Button';

export const FooterCTA = () => {
    return (
        <section className="py-8 bg-brand-primary text-black text-center px-6">
            <h2 className="text-[10vw] font-display font-black uppercase leading-[0.8] mb-6">
                Let's Make<br />History
            </h2>
            <Button href="/contact" className="bg-black text-white px-12 py-6 text-xl rounded-full hover:text-black transition-transform">
                Start Project
            </Button>
        </section>
    );
};
