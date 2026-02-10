// app/components/ServicesScroll/ServiceCardContent.tsx (SERVER COMPONENT)
import React from 'react';
import Image from 'next/image';
import { ServiceItem } from './types';

interface ServiceCardContentProps {
    service: ServiceItem;
    index: number;
}

export const ServiceCardContent: React.FC<ServiceCardContentProps> = ({ service, index }) => {
    return (
        <>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={service.bgImage}
                    alt={`Background for ${service.title}`}
                    fill
                    className="object-cover brightness-[0.25]"
                    sizes="100vw"
                    priority={index === 0}
                    quality={90}
                />
                <div className="absolute inset-0 services-gradient-overlay mix-blend-multiply" />
            </div>

            {/* Content Structure */}
            <div className="relative z-10 w-full max-w-[1920px] px-6 sm:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* --- TEXT SECTION --- */}
                <div className="flex flex-col justify-center">
                    <div className="mb-6 flex items-center">
                        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                            <span className="font-mono text-[10px] sm:text-xs text-white/90 tracking-widest uppercase">
                                Service 0{index + 1}
                            </span>
                        </div>
                    </div>

                    <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-6 lg:mb-8">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                            {service.title}
                        </span>
                    </h2>

                    <p className="text-lg sm:text-xl font-light text-gray-300 leading-8 max-w-lg tracking-wide">
                        {service.description}
                    </p>
                </div>

                {/* --- IMAGE SECTION WITH BORDER EFFECT --- */}
                <div className="flex justify-end">
                    <div className="relative group w-full max-w-sm lg:max-w-md xl:w-[400px] aspect-[3/4]">
                        {/* 1. THE BORDER EFFECT (Behind the image) */}
                        <div className="absolute inset-0 border border-white/30 rounded-xl lg:rounded-xl translate-x-4 translate-y-4" />

                        {/* 2. THE IMAGE CARD (On top) */}
                        <div className="relative w-full h-full rounded-xl lg:rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                            <Image
                                src={service.smallImage}
                                alt={service.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                quality={90}
                            />

                            {/* Glass overlay on bottom */}
                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                <p className="font-mono text-[10px] text-white/60 uppercase tracking-[0.2em] mb-1">
                                    Project Gallery
                                </p>
                                <p className="text-white font-display text-lg tracking-wide flex items-center gap-2">
                                    View Works <span className="inline-block">→</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};