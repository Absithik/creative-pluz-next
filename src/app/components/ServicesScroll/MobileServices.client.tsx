'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ServiceItem } from './types';
import './ServicesScroll.css';

interface MobileServicesProps {
    services: ServiceItem[];
}

export const MobileServices: React.FC<MobileServicesProps> = ({ services }) => {
    return (
        <section className="relative z-40 bg-black">
            {services.map((service, index) => (
                <div
                    key={service.id}
                    className="sticky top-0 h-screen w-full flex flex-col overflow-hidden bg-black"
                    style={{ zIndex: index + 1 }}
                >
                    {/* Background Layer */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={service.bgImage}
                            alt=""
                            fill
                            className="object-cover opacity-50"
                            sizes="100vw"
                            priority={index === 0}
                            quality={85}
                        />
                        <div className="absolute inset-0 services-gradient-overlay-mobile" />
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-10 flex-1 flex flex-col justify-end p-4 sm:p-6 md:p-8 pb-24 md:pb-32">
                        {/* Decorative Number */}
                        <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
                            <span className="font-display text-6xl sm:text-7xl md:text-8xl text-white/5">
                                0{index + 1}
                            </span>
                        </div>

                        {/* Floating Small Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: false, amount: 0.3 }}
                            className="self-end mb-6 sm:mb-8 w-32 sm:w-36 md:w-40 aspect-[3/4] rounded-lg overflow-hidden border border-white/20 shadow-2xl relative right-0"
                        >
                            <Image
                                src={service.smallImage}
                                alt={`Detail image for ${service.title}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
                                quality={90}
                            />
                        </motion.div>

                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            viewport={{ once: false, amount: 0.5 }}
                            className="services-motion-element"
                        >
                            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white uppercase leading-[0.85] mb-4 sm:mb-6 drop-shadow-lg">
                                {service.title}
                            </h2>
                            <div className="h-1 w-12 bg-white mb-4 sm:mb-6" />
                            <p className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-xs sm:max-w-sm drop-shadow-md">
                                {service.description}
                            </p>
                        </motion.div>
                    </div>
                </div>
            ))}
        </section>
    );
};