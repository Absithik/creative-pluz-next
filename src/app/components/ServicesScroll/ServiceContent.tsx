// app/components/ServicesScroll/ServiceContent.tsx (SERVER COMPONENT - FIXED)
import React from 'react';
import Image from 'next/image';
import { ServiceItem } from './types';

interface ServiceContentProps {
    service: ServiceItem;
    index: number;
    isDesktop?: boolean;
}

export const ServiceContent: React.FC<ServiceContentProps> = ({
    service,
    index,
    isDesktop = true
}) => {
    if (isDesktop) {
        return (
            <>
                {/* Background Image - Server Rendered */}
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
                </div>

                {/* Content Structure with animation-ready classes */}
                <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* --- TEXT SECTION (Will be animated with y: yText) --- */}
                    <div className="flex flex-col justify-center services-text-section">
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

                    {/* --- IMAGE SECTION (Will be animated with y: yImage) --- */}
                    <div className="flex justify-end services-image-section">
                        <div className="relative group w-full max-w-sm lg:max-w-md xl:w-[400px] aspect-[3/4]">
                            {/* Border Effect */}
                            <div className="absolute inset-0 border border-white/30 rounded-xl lg:rounded-xl translate-x-4 translate-y-4 transition-transform duration-500 ease-out group-hover:translate-x-2 group-hover:translate-y-2" />

                            {/* Image Card */}
                            <div className="relative w-full h-full rounded-xl lg:rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                                <Image
                                    src={service.smallImage}
                                    alt={`Project detail for ${service.title}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                                    quality={90}
                                />

                                {/* Glass overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                    <p className="font-mono text-[10px] text-white/60 uppercase tracking-[0.2em] mb-1">
                                        Project Gallery
                                    </p>
                                    <p className="text-white font-display text-lg tracking-wide flex items-center gap-2">
                                        View Works <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Mobile version
    return (
        <>
            {/* Background for Mobile */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={service.bgImage}
                    alt={`Background for ${service.title}`}
                    fill
                    className="object-cover opacity-50"
                    sizes="100vw"
                    priority={index === 0}
                    quality={85}
                />
                <div className="absolute inset-0 services-gradient-overlay-mobile" />
            </div>

            {/* Content for Mobile */}
            <div className="relative z-10 flex-1 flex flex-col justify-end p-4 sm:p-6 md:p-8 pb-24 md:pb-32">
                {/* Decorative Number */}
                <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
                    <span className="font-display text-6xl sm:text-7xl md:text-8xl text-white/5">
                        0{index + 1}
                    </span>
                </div>

                {/* Floating Small Image */}
                <div className="self-end mb-6 sm:mb-8 w-32 sm:w-36 md:w-40 aspect-[3/4] rounded-lg overflow-hidden border border-white/20 shadow-2xl relative right-0">
                    <Image
                        src={service.smallImage}
                        alt={`Detail image for ${service.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
                        quality={90}
                    />
                </div>

                {/* Text Content */}
                <div>
                    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white uppercase leading-[0.85] mb-4 sm:mb-6 drop-shadow-lg">
                        {service.title}
                    </h2>
                    <div className="h-1 w-12 bg-white mb-4 sm:mb-6" />
                    <p className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-xs sm:max-w-sm drop-shadow-md">
                        {service.description}
                    </p>
                </div>
            </div>
        </>
    );
};