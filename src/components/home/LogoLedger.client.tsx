'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const clientLogos = [
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_01.png', name: "Partner Brand" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_02.png', name: "Valued Client" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_03.png', name: "Creative Partner" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_04.png', name: "Brand Collaboration" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_05.png', name: "Industry Leader" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_06.png', name: "Strategic Partner" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_07.png', name: "Retail Partner" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_08.png', name: "Corporate Client" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_09.png', name: "Innovative Startup" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_10.png', name: "Tech Partner" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_11.png', name: "Growth Brand" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_12.png', name: "Global Client" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_13.png', name: "Enterprise Customer" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_14.png', name: "Trusted Brand" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_15.png', name: "Long-term Partner" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_16.png', name: "Service Client" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_17.png', name: "Regional Leader" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_18.png', name: "Market Player" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_19.png', name: "Business Partner" },
    { src: '/assets/images/service/customer-logos/Customer logo 500 x 500/Creative Pluz 500 x 500_20.png', name: "Collaborator" },
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
                                className="object-contain" // p-4 provides safe padding inside the white card
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
                <LogoMarquee logos={clientLogos.slice(0, 20)} speed={45} />
                <LogoMarquee logos={clientLogos.slice(10)} speed={35} reverse={true} />
            </div>
        </section>
    );
};
