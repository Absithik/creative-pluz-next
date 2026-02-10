'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useHero } from './HeroState';

interface HeroData {
    id: number;
    image: string;
    cardTitle: string;
}

export function InteractiveHero({
    children,
    items
}: {
    children: React.ReactNode,
    items: HeroData[]
}) {
    const { activeIndex, setActiveIndex } = useHero();
    const containerRef = useRef<HTMLDivElement>(null);
    const mobileScrollerRef = useRef<HTMLDivElement>(null);

    // Mobile auto-cycle logic (Disabled to match Desktop scroll behavior)
    useEffect(() => {
        // Simple check to ensure we only run this on client
        if (typeof window === 'undefined') return;

        const isMobile = window.innerWidth < 1024;
        if (!isMobile) return;

        const interval = setInterval(() => {
            setActiveIndex((activeIndex + 1) % items.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [items.length, activeIndex, setActiveIndex]);

    // Scroll logic    // Desktop scroll logic
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || window.innerWidth < 1024) return;
            const { top, height } = containerRef.current.getBoundingClientRect();
            const scrollThreshold = height - window.innerHeight;

            // Simple active index calculation based on scroll position
            if (top <= 100) {
                const scrollProgress = Math.max(0, Math.min(1, Math.abs(top) / scrollThreshold));
                const index = Math.min(Math.floor(scrollProgress * items.length), items.length - 1);
                if (index >= 0 && index < items.length && index !== activeIndex) {
                    setActiveIndex(index);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [items.length, activeIndex, setActiveIndex]);

    // Mobile Horizontal Scroll Handler
    const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollLeft, clientWidth } = e.currentTarget;
        const newIndex = Math.round(scrollLeft / clientWidth);
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < items.length) {
            setActiveIndex(newIndex);
        }
    };

    return (
        <section
            ref={containerRef}
            suppressHydrationWarning
            className="relative w-full bg-black h-[100dvh] lg:h-[var(--hero-height)]"
            style={{
                '--hero-height': `${items.length * 100}vh`
            } as React.CSSProperties}
        >
            {/*
                Mobile Horizontal Scroll Driver (Invisible Overlay)
                This allows users to swipe horizontally to change slides on mobile/tablet.
            */}
            <div
                ref={mobileScrollerRef}
                className="lg:hidden absolute inset-0 z-50 flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
                onScroll={handleMobileScroll}
            >
                {items.map((item) => (
                    <div key={item.id} className="w-full h-full flex-shrink-0 snap-center" />
                ))}
            </div>

            {/*
                Sticky Content Wrapper
                On Desktop: Sticks while scrolling vertically.
                On Mobile: Stays fixed behind the horizontal scroll overlay.
            */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {children}

                {/* Desktop Vertical Indicator - Sticky */}
                <div className="hidden lg:block fixed right-12 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                    <div className="h-64 w-[1px] bg-white/10 relative">
                        <div
                            className="absolute top-0 right-0 w-[2px] bg-yellow-400 transition-all duration-700"
                            style={{
                                height: `${100 / items.length}%`,
                                transform: `translateY(${activeIndex * 100}%)`
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Desktop side cards - Distributed parallax scroll */}
            <div className="hidden lg:block absolute top-0 right-0 w-full h-full pointer-events-none z-20">
                <div className="w-full max-w-[1400px] mx-auto px-12 h-full relative">
                    <div className="w-1/3 ml-auto h-full relative pointer-events-auto">
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    // Scroll to the exact section for this card
                                    const scrollTarget = (containerRef.current?.offsetTop || 0) + (index * window.innerHeight);
                                    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
                                }}
                                className={`absolute right-0 cursor-pointer overflow-hidden transition-all duration-700 w-full max-w-[320px] h-48 group
                                    ${index === activeIndex
                                        ? 'ring-2 ring-yellow-400/50 shadow-[0_0_50px_rgba(255,255,0,0.1)] scale-100 opacity-100 grayscale-0'
                                        : 'opacity-40 grayscale scale-90 hover:opacity-100 hover:grayscale-0 hover:scale-95'
                                    }`}
                                style={{
                                    top: `${(index * 100) + 50}vh`,
                                    transform: 'translateY(-50%)'
                                }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.cardTitle}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-60'}`} />

                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                    <div>
                                        <p className="text-yellow-400 text-[10px] tracking-widest uppercase mb-1">Experience {index + 1}</p>
                                        <h3 className="text-white font-bebas text-2xl tracking-wider leading-none">{item.cardTitle}</h3>
                                    </div>
                                    <div className={`w-10 h-10 border flex items-center justify-center transition-all duration-500 ${index === activeIndex ? 'bg-yellow-400 border-yellow-400 text-black' : 'border-white/20 text-white'}`}>
                                        <svg className={`w-4 h-4 transform transition-transform ${index === activeIndex ? 'rotate-45' : 'group-hover:rotate-45'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Indicator Pebbles (Interactive) */}
            <div className="lg:hidden fixed bottom-8 left-6 right-6 z-30 flex justify-start items-center space-x-8 overflow-x-auto no-scrollbar pb-4 pointer-events-auto">
                {items.map((item, i) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveIndex(i);
                            // Scroll the horizontal container to the correct slide
                            if (mobileScrollerRef.current) {
                                mobileScrollerRef.current.scrollTo({
                                    left: i * mobileScrollerRef.current.clientWidth,
                                    behavior: 'smooth'
                                });
                            }
                        }}
                        className={`flex-none w-12 h-1 border-b-2 transition-all duration-300 ${i === activeIndex ? 'border-yellow-400' : 'border-white/10'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
