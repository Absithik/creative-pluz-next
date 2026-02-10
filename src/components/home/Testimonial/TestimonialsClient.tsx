'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// --- Types ---
export interface Testimonial {
    text: string;
    image: string;
    name: string;
    role: string;
}

interface TestimonialsColumnProps {
    testimonials: Testimonial[];
    duration?: number;
    className?: string;
}

// --- Sub-Component: The Animated Column ---
export const TestimonialsColumn: React.FC<TestimonialsColumnProps> = ({
    testimonials,
    duration = 10,
    className,
}) => {
    return (
        <div className={className}>
            {/* 1. We define the keyframes locally so this works copy-paste. 
        2. We use standard CSS animation for the loop because it allows 'animation-play-state: paused'.
      */}
            <style jsx>{`
        @keyframes marquee {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        .animate-marquee {
          animation: marquee var(--marquee-duration) linear infinite;
        }
        /* The Magic Line: Pauses animation on hover */
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

            <div
                className="flex flex-col gap-6 pb-6 animate-marquee will-change-transform"
                style={{
                    '--marquee-duration': `${duration}s`
                } as React.CSSProperties}
            >
                {/* Tripling the data ensures smoother loop without gaps */}
                {[...new Array(3)].fill(0).map((_, groupIndex) => (
                    <React.Fragment key={groupIndex}>
                        {testimonials.map(({ text, image, name, role }, i) => (
                            <div
                                key={`${groupIndex}-${i}`}
                                className="p-8 rounded-3xl border border-white/5 bg-brand-gray/40 backdrop-blur-sm hover:border-brand-primary/20 transition-colors duration-300 w-full shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                            >
                                <p className="text-white/70 leading-relaxed text-sm font-medium tracking-wide">
                                    "{text}"
                                </p>
                                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/5">
                                    <div className="relative h-10 w-10 shrink-0">
                                        <Image
                                            src={image}
                                            alt={name}
                                            fill
                                            className="rounded-full border border-white/10  transition-all duration-300 object-cover"
                                            sizes="40px"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-display font-bold text-white text-sm tracking-wide">
                                            {name}
                                        </div>
                                        <div className="text-[10px] text-brand-primary/80 tracking-widest uppercase font-bold">
                                            {role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

// --- Sub-Component: The Animated Header ---
export const TestimonialsHeader = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center mx-auto mb-20 text-center"
        >
            <div className="flex justify-center mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-bold uppercase tracking-widest">
                    Client Stories
                </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter text-white mb-6">
                Trusted by the <span className="text-brand-primary">innovators.</span>
            </h2>
            <p className="text-white/50 text-lg max-w-md mx-auto">
                See what our partners have to say about collaborating with Creative Pluz.
            </p>
        </motion.div>
    );
};