"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { GalleryItem } from './types';
import { SPAN_MAP } from './constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface BentoCardProps {
    item: GalleryItem;
    index: number;
}

const BentoCard: React.FC<BentoCardProps> = ({ item, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal Animation
            gsap.fromTo(
                cardRef.current,
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.98
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    delay: index * 0.05,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: 'top 95%',
                    }
                }
            );
        }, cardRef);

        return () => ctx.revert();
    }, [index]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // 3D Tilt calculation
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        gsap.to(cardRef.current, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: true,
            transformPerspective: 1000
        });

        // Parallax image movement
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                x: (x - centerX) / 10,
                y: (y - centerY) / 10,
                duration: 0.5,
                ease: 'power3.out',
                overwrite: true
            });
        }

        // Spotlight movement
        if (spotlightRef.current) {
            gsap.to(spotlightRef.current, {
                left: x,
                top: y,
                duration: 0.2,
                ease: 'power2.out',
                overwrite: true
            });
        }
    };

    const handleMouseEnter = () => {
        gsap.to(cardRef.current, {
            scale: 1.02,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: true,
            zIndex: 10
        });
        if (spotlightRef.current) {
            gsap.to(spotlightRef.current, {
                opacity: 1,
                duration: 0.3
            });
        }
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.7,
            ease: 'elastic.out(1, 0.5)',
            overwrite: true,
            zIndex: 1
        });

        if (imageRef.current) {
            gsap.to(imageRef.current, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.5)',
                overwrite: true
            });
        }

        if (spotlightRef.current) {
            gsap.to(spotlightRef.current, {
                opacity: 0,
                duration: 0.3
            });
        }
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`${SPAN_MAP[item.spanType]} relative overflow-hidden rounded-xl md:rounded-3xl border border-white/10 shadow-2xl group cursor-none bg-black will-change-transform transform-gpu`}
        >
            {/* 3D Content Container */}
            <div ref={imageRef} className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%]">
                <Image
                    src={item.url}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-110"
                    priority={index < 4}
                />
            </div>

            {/* Spotlight Effect overlay */}
            <div
                ref={spotlightRef}
                className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-0 mix-blend-soft-light transition-opacity duration-300"
                style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
                    zIndex: 5
                }}
            />

            {/* Sophisticated Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

            {/* Glassy Border Effect on Hover */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none rounded-xl md:rounded-3xl" />

            {/* Content Overlay */}
            <div className="absolute bottom-6 left-6 z-10 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">Artifact No. {index + 1}</span>
                    <h4 className="text-lg font-bold text-white uppercase tracking-tight">{item.alt}</h4>
                </div>
            </div>

            {/* Hover Reveal Shadow */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
    );
};

export default BentoCard;
