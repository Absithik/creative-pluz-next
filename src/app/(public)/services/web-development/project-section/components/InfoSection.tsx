import React from 'react';
import { Bookmark, ArrowRight, Zap } from 'lucide-react';
import { Destination } from '../types';

interface InfoSectionProps {
    destination: Destination;
}

export const InfoSection: React.FC<InfoSectionProps> = ({
    destination
}) => {
    return (
        <div className="relative z-20">
            {/* Vibe Badge */}
            <div className="flex items-center gap-2 mb-6 overflow-hidden">
                <Zap className="w-4 h-4 text-brand-primary fill-brand-primary" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-primary/80">
                    {destination.vibe || "Premium Experience"}
                </span>
            </div>

            {/* Kinetic Title */}
            <h1 className="font-sans font-black text-[clamp(2.5rem,8vw,8.5rem)] leading-[0.85] mb-8 tracking-tighter uppercase overflow-hidden">
                {destination.title.split(' ').map((word, i) => (
                    <span key={i} className="gsap-title-word block origin-bottom-left">
                        {word}
                    </span>
                ))}
            </h1>

            {/* Description */}
            <p className="text-white/60 text-sm md:text-base mb-12 leading-relaxed max-w-sm font-light">
                {destination.description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-5">
                <button
                    className="group flex items-center gap-5 px-10 py-4 rounded-full bg-brand-primary text-black hover:bg-white transition-all duration-500 active:scale-95 shadow-[0_10px_30px_rgba(255,215,0,0.2)]"
                >
                    <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">
                        Explore Project
                    </span>
                    <div className="w-5 h-5 rounded-full border border-black/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <ArrowRight className="w-3 h-3" />
                    </div>
                </button>

                <button
                    className="w-14 h-14 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors active:scale-90"
                    aria-label="Save for later"
                >
                    <Bookmark className="w-5 h-5" strokeWidth={1.5} />
                </button>
            </div>

            {/* Meta Info */}
            <div className="mt-16 pt-8 border-t border-white/5 flex gap-12 text-white/40">
                <div>
                    <span className="block text-[8px] uppercase tracking-widest mb-1">Location</span>
                    <span className="text-[10px] font-medium text-white/80">{destination.location}</span>
                </div>
                <div>
                    <span className="block text-[8px] uppercase tracking-widest mb-1">Timeline</span>
                    <span className="text-[10px] font-medium text-white/80">{destination.bestTime || "Q1 2026"}</span>
                </div>
            </div>
        </div>
    );
};
