'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroItem } from './types';
import { useHero } from './HeroState';

const HIGHLIGHT_WORDS = ['FREEDOM', 'NIGHT', 'STARS', 'VOID', 'DARKNESS'];

export function HeroContent({ items }: { items: HeroItem[] }) {
    const { activeIndex } = useHero();

    return (
        <>
            {/* MOBILE/TABLET CONTENT (lg:hidden) */}
            <div className="lg:hidden absolute inset-0 z-20 flex flex-col justify-between px-6 pt-44 pb-12 sm:px-10 sm:pt-48 sm:pb-20 pointer-events-none">
                {/* Top: Branding & Progress */}
                <div className="flex justify-between items-center w-full pointer-events-auto">
                    <div className="font-bebas text-xl sm:text-2xl tracking-[0.2em] text-white/50">
                        <span className="text-white">0{activeIndex + 1}</span> / 0{items.length}
                    </div>
                    <div className="flex space-x-1.5 sm:space-x-2">
                        {items.map((_, i) => (
                            <div key={i} className="h-1 w-6 sm:w-8 md:w-10 bg-white/20 rounded-full overflow-hidden">
                                <div className={`h-full bg-yellow-400 transition-all duration-300 ${i === activeIndex ? 'w-full' : 'w-0'}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Middle: Giant Magazine Headline */}
                <div className="flex flex-col items-start text-left animate-fade-up pointer-events-auto max-w-2xl">
                    <h1 className="text-[clamp(4rem,15vw,9rem)] sm:text-[clamp(5rem,12vw,8rem)] font-bebas leading-[0.85] tracking-tight mb-4 text-white min-h-[2.8em]">
                        {items[activeIndex].headline.split(' ').map((word, i) => (
                            <span key={i} className="block">
                                {HIGHLIGHT_WORDS.includes(word) ? (
                                    <span className="text-yellow-400">{word}</span>
                                ) : (
                                    word
                                )}
                            </span>
                        ))}
                    </h1>
                    <p className="max-w-[90%] sm:max-w-md text-gray-300 text-sm sm:text-base font-medium tracking-wider uppercase mb-8 leading-relaxed min-h-[3em]">
                        {items[activeIndex].description}
                    </p>
                    <Link href="/contact" className="pointer-events-auto">
                        <span className="inline-block px-8 py-3 sm:px-10 sm:py-4 bg-white text-black font-bold uppercase text-xs sm:text-sm tracking-[0.25em] hover:bg-yellow-400 transition-colors shadow-lg shadow-black/20">
                            Explore Now
                        </span>
                    </Link>
                </div>

                {/* Spacer to lift content slightly */}
                <div className="h-2 sm:h-8" />
            </div>

            {/* DESKTOP CONTENT (lg:block) */}
            <div className="hidden lg:flex absolute inset-0 items-center justify-start px-24 max-w-[1400px] mx-auto z-10 pointer-events-none pt-32">
                <div className="w-full lg:w-2/3 flex flex-col items-start text-left">
                    <div key={activeIndex} className="flex-col animate-fade-up pointer-events-auto">
                        <h1 className="text-[110px] font-bebas leading-[0.85] mb-8 tracking-tighter text-white min-h-[3.4em]">
                            {items[activeIndex].headline.split(' ').map((word, i) => (
                                <React.Fragment key={i}>
                                    {HIGHLIGHT_WORDS.includes(word) ? (
                                        <span className="text-yellow-400">{word}</span>
                                    ) : (
                                        word
                                    )}
                                    {' '}
                                    {/* Line break logic adapted for current item */}
                                    {((i === 3 && activeIndex === 0) || (i === 2 && activeIndex === 1) || (i === 1 && activeIndex === 2) || (i === 3 && activeIndex === 3) || (i === 2 && activeIndex === 4)) && <br />}
                                </React.Fragment>
                            ))}
                        </h1>
                        <p className="max-w-md text-gray-400 text-sm font-light leading-relaxed tracking-widest uppercase mb-12 min-h-[3em]">
                            {items[activeIndex].description}
                        </p>

                        <div className="flex items-center gap-8 pointer-events-auto mt-4">
                            <Link href="/contact">
                                <span className="inline-block px-12 py-5 bg-white text-black font-bold uppercase text-[11px] tracking-[0.4em] hover:bg-yellow-400 transition-all transform hover:-translate-y-1">
                                    Explore The Experience
                                </span>
                            </Link>
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-gray-900">
                                        <Image
                                            src={`https://i.pravatar.cc/100?u=${i + activeIndex * 15}`}
                                            alt="user"
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover opacity-60"
                                        />
                                    </div>
                                ))}
                                <div className="w-12 h-12 rounded-full border-2 border-black bg-white/5 flex items-center justify-center backdrop-blur-xl text-[10px] font-black text-white">
                                    +{2300 + activeIndex * 315}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
