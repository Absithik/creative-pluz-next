'use client';
import React from 'react';
import Link from 'next/link';
import Magnetic from '@/components/Magnetic';
import { ArrowRight } from 'lucide-react';
import { CTA_CONTENT } from './content';

const CallToAction: React.FC = () => {
    return (
        <section className="py-48 bg-brand-primary text-black text-center relative overflow-hidden group">
            <Link href="/contact" className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                <span className="text-[10px] font-black uppercase tracking-[0.6em] mb-10 group-hover:tracking-[1em] transition-all duration-700">{CTA_CONTENT.subHeading}</span>
                <h2 className="text-[2rem] md:text-[8vw] font-display font-black uppercase italic leading-[0.8] mb-16">
                    {CTA_CONTENT.heading.line1} <br /> <span className="underline decoration-black decoration-8 underline-offset-[20px]">{CTA_CONTENT.heading.line2}</span>
                </h2>
                <Magnetic strength={0.4}>
                    <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <ArrowRight size={48} />
                    </div>
                </Magnetic>
            </Link>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-[0.05] pointer-events-none select-none">
                <span className="text-[35vw] font-display font-black uppercase italic">{CTA_CONTENT.backgroundText}</span>
            </div>
        </section>
    );
};
export default CallToAction;
