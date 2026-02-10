'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const clientLogos = [
    { src: '/assets/images/service/customer-logos/1.jpg', name: "Partner Brand" },
    { src: '/assets/images/service/customer-logos/2.jpg', name: "Valued Client" },
    { src: '/assets/images/service/customer-logos/3.jpg', name: "Creative Partner" },
    { src: '/assets/images/service/customer-logos/4.jpg', name: "Brand Collaboration" },
    { src: '/assets/images/service/customer-logos/5.jpg', name: "Industry Leader" },
    { src: '/assets/images/service/customer-logos/6.jpg', name: "Strategic Partner" },
    { src: '/assets/images/service/customer-logos/7.jpg', name: "Retail Partner" },
    { src: '/assets/images/service/customer-logos/8.jpg', name: "Corporate Client" },
    { src: '/assets/images/service/customer-logos/9.jpg', name: "Innovative Startup" },
    { src: '/assets/images/service/customer-logos/11.jpg', name: "Tech Partner" },
    { src: '/assets/images/service/customer-logos/12.jpg', name: "Growth Brand" },
    { src: '/assets/images/service/customer-logos/13.jpg', name: "Global Client" },
    { src: '/assets/images/service/customer-logos/14.jpg', name: "Enterprise Customer" },
    { src: '/assets/images/service/customer-logos/15.jpg', name: "Trusted Brand" },
    { src: '/assets/images/service/customer-logos/16.jpg', name: "Long-term Partner" },
    { src: '/assets/images/service/customer-logos/17.jpg', name: "Service Client" },
    { src: '/assets/images/service/customer-logos/18.jpg', name: "Regional Leader" },
    { src: '/assets/images/service/customer-logos/19.jpg', name: "Market Player" },
    { src: '/assets/images/service/customer-logos/20.jpg', name: "Business Partner" },
    { src: '/assets/images/service/customer-logos/21.jpg', name: "Collaborator" },
];

const LogoMarquee = ({ reverse = false, speed = 60, logos = [] }: { reverse?: boolean, speed?: number, logos: any[] }) => (
    <div className="flex overflow-hidden py-2 select-none">
        <motion.div
            className="flex gap-4 min-w-full"
            animate={{ x: reverse ? ["-100%", "0%"] : ["0%", "-100%"] }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        >
            {/* Tripling the array ensures a seamless infinite loop without gaps */}
            {[...logos, ...logos, ...logos].map((logo, i) => (
                <div key={i} className="group relative flex-shrink-0 w-80 md:w-100 h-40 md:h-52 bg-white rounded-xl md:rounded-2xl shadow-sm border border-black/5 flex flex-col items-center justify-center p-8 transition-all hover:shadow-xl hover:-translate-y-1">

                    {/* Image Container */}
                    <div className="relative w-full h-full flex items-center justify-center  transition-all duration-500">
                        {logo.src ? (
                            <Image
                                src={logo.src}
                                alt={`Logo of ${logo.name}`}
                                fill
                                className="object-contain p-4" // p-4 provides safe padding inside the white card
                            />
                        ) : (
                            <span className="text-black font-display font-black uppercase text-xl md:text-2xl opacity-20">
                                {logo.name}
                            </span>
                        )}
                    </div>

                </div>
            ))}
        </motion.div>
    </div>
);

export const LogoLedger = () => {
    return (
        <section className="py-10 md:py-10 bg-brand-dark overflow-hidden">
            <div className="max-w-[1920px] mx-auto px-2 md:px-12 mb-16 md:mb-24">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-px bg-black/20"></div>
                    <span className="text-brand-primary font-black uppercase tracking-[0.4em] text-black/40">The Ledger</span>
                </div>
                <h2 className="text-4xl md:text-8xl font-display font-black text-brand-primary uppercase leading-[0.8] italic tracking-tighter">
                    Verified <br /> <span className="text-slate-400">Identities.</span>
                </h2>
            </div>

            <div className="space-y-4 md:space-y-6">
                <LogoMarquee logos={clientLogos.slice(0, 20)} speed={35} />
                <LogoMarquee logos={clientLogos.slice(10)} speed={35} reverse={true} />
            </div>
        </section>
    );
};
