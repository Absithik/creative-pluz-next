import React from 'react';
import Button from '@/components/Button';
import { digitalServiceIntro } from './content';

const DigitalServicesSection: React.FC = () => {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Design Element: Subtle Background Gradient */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-zinc-900/50 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* --- LEFT: IMAGES --- */}
                    <div className="relative order-2 lg:order-1 group">
                        {/* Design Element: Glow behind images */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-primary/10 blur-[80px] rounded-full pointer-events-none" />

                        <div className="grid grid-cols-2 gap-6 relative">
                            {/* Column 1 */}
                            <div className="space-y-6 pt-16">
                                <div className="overflow-hidden rounded-2xl border border-zinc-800">
                                    <img
                                        src={digitalServiceIntro.images[0].src}
                                        alt={digitalServiceIntro.images[0].alt}
                                        className="w-full h-72 object-cover transition-all duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>
                                <div className={`${digitalServiceIntro.images[0].labelBg} p-8 rounded-2xl shadow-lg transform group-hover:-rotate-2 transition-transform duration-500`}>
                                    <h5 className={`font-display leading-none ${digitalServiceIntro.images[0].labelTextClass}`}>
                                        {digitalServiceIntro.images[0].label}
                                    </h5>
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-6">
                                <div className="bg-zinc-900/80 backdrop-blur-md text-white p-8 rounded-2xl aspect-square flex flex-col justify-between border border-zinc-800 group-hover:border-brand-primary/50 transition-colors duration-500">
                                    {digitalServiceIntro.images[1].icon}
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                                        {digitalServiceIntro.images[1].iconLabel}
                                    </span>
                                </div>
                                <div className="overflow-hidden rounded-2xl border border-zinc-800">
                                    <img
                                        src={digitalServiceIntro.images[1].src}
                                        alt={digitalServiceIntro.images[1].alt}
                                        className="w-full h-80 object-cover transition-all duration-700 ease-out group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT: TEXT CONTENT --- */}
                    <div className="order-1 lg:order-2">
                        <h2 className="text-brand-primary text-xs font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                            <span className="w-8 h-[2px] bg-brand-primary"></span>
                            {digitalServiceIntro.sectionLabel}
                        </h2>

                        <h3 className="text-5xl md:text-7xl font-heading font-bold uppercase leading-[0.9] mb-8 text-white tracking-tighter">
                            {digitalServiceIntro.heading}
                        </h3>

                        <p className="text-lg text-zinc-400 mb-10 leading-relaxed max-w-lg">
                            {digitalServiceIntro.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12">
                            {digitalServiceIntro.features.map((feat) => (
                                <div key={feat} className="flex items-center gap-3 group/item">
                                    <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full group-hover/item:bg-brand-primary transition-colors" />
                                    <span className="text-sm font-medium uppercase tracking-wider text-zinc-300 group-hover/item:text-white transition-colors">
                                        {feat}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Button */}
                        <Button
                            href="/contact"
                            className="bg-brand-primary text-black border-none hover:bg-white hover:text-black hover:scale-105 px-12 py-5 text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                        >
                            Get A Quote
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DigitalServicesSection;