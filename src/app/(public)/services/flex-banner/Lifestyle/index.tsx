'use client';
import React from 'react';
import { useLifestyleAnimation } from './animation';
import { LIFESTYLE_CONTENT } from './content';

const LifestyleSection: React.FC = () => {
    const { containerRef, pinContainerRef, mediaRefs } = useLifestyleAnimation(LIFESTYLE_CONTENT.images.length);

    return (
        <div ref={containerRef} className="lifestyle relative bg-[#f3f1ed] text-[#2c2c2c] overflow-hidden">

            {/* Heading Layer - Stays visible throughout */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <h2
                    className="lifestyle__heading w-full text-center select-none flex flex-col items-center justify-center px-4"
                    style={{ opacity: 0 }}
                >
                    <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.15em] lg:tracking-[0.2em] text-[#1a1a1a] uppercase">
                        {LIFESTYLE_CONTENT.heading.main}
                    </span>
                    <span className="lifestyle__subheading block text-[9px] sm:text-[10px] md:text-xs lg:text-sm tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] lg:tracking-[0.5em] uppercase text-zinc-500 font-normal mt-3 sm:mt-4 md:mt-5 lg:mt-6">
                        <em>{LIFESTYLE_CONTENT.heading.sub}</em>
                    </span>
                </h2>
            </div>

            {/* The Pinning Stage */}
            <div ref={pinContainerRef} className="h-screen relative flex items-center justify-center" style={{ perspective: '1500px', perspectiveOrigin: 'center center' }}>

                {/* The Card Orbit Container */}
                <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                    {LIFESTYLE_CONTENT.images.map((src, i) => (
                        <div
                            key={i}
                            ref={el => { if (el) mediaRefs.current[i] = el; }}
                            className={`lf__media-wrapper absolute ${i >= 5 ? 'hidden lg:block' : 'block'}`}
                            style={{
                                transformOrigin: 'center center',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <div
                                className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] sm:shadow-[0_15px_45px_rgba(0,0,0,0.25)] md:shadow-[0_20px_60px_rgba(0,0,0,0.3)] bg-white border border-white/30 sm:border-2 sm:border-white/40 backdrop-blur-sm"
                                style={{
                                    width: 'clamp(260px, 90vw, 280px)',
                                    height: 'clamp(168px, 58vw, 180px)',
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                <img
                                    src={src}
                                    loading="lazy"
                                    alt="Corporate Display"
                                    className="lf__media w-full h-full object-cover"
                                />
                                {/* Gradient overlay for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Spacer for scroll completion */}
            <div className="h-[20vh] sm:h-[10vh] lg:h-[10vh]"></div>

        </div>
    );
};

export default LifestyleSection;
