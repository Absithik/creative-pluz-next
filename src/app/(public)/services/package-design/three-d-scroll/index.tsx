'use client';
import React from 'react';
import { useThreeDScrollAnimation } from './animation';
import { THREED_SCROLL_CONTENT } from './content';

const ThreeDScroll: React.FC = () => {
    const { containerRef, boxRef } = useThreeDScrollAnimation();


    return (
        <div className="relative w-full bg-[#050505]">
            <section ref={containerRef} className="relative h-screen bg-[#050505] overflow-hidden">

                <div id="laser-scanner" className="absolute top-[20%] left-0 w-full h-[2px] bg-brand-primary/40 shadow-[0_0_20px_rgba(217,255,0,1)] z-30 pointer-events-none">
                    <div className="absolute top-0 right-10 text-[8px] font-black text-brand-primary bg-black px-2 -translate-y-full uppercase tracking-tighter">{THREED_SCROLL_CONTENT.scanner.label}</div>
                </div>

                <div className="absolute left-8 top-1/2 -translate-y-1/2 h-64 w-[1px] bg-white/10 z-30">
                    <div id="anatomy-scroll-progress" className="absolute top-0 left-0 w-full bg-brand-primary shadow-[0_0_10px_#D9FF00]"></div>
                </div>

                <div className="max-w-[1440px]  mx-auto px-6 lg:px-24 w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    <div className="relative h-full flex items-center justify-center" style={{ perspective: "2000px" }}>
                        <div ref={boxRef} className="relative hidden lg:flex w-full max-w-sm aspect-[3/4] preserve-3d">

                            <div className="hud-element absolute -top-10 -right-10 p-4 border border-brand-primary/40 bg-black/80 backdrop-blur-md z-40 rounded-lg">
                                <p className="text-[10px] font-black text-brand-primary uppercase mb-1">{THREED_SCROLL_CONTENT.hud.stress.label}</p>
                                <p className="text-[8px] text-white uppercase tracking-widest font-bold">{THREED_SCROLL_CONTENT.hud.stress.value}</p>
                            </div>

                            <div className="hud-element absolute -bottom-10 -left-10 p-4 border border-brand-primary/40 bg-black/80 backdrop-blur-md z-40 rounded-lg">
                                <p className="text-[10px] font-black text-brand-primary uppercase mb-1">{THREED_SCROLL_CONTENT.hud.gloss.label}</p>
                                <p className="text-[8px] text-white uppercase tracking-widest font-bold">{THREED_SCROLL_CONTENT.hud.gloss.value}</p>
                            </div>

                            <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative">
                                <img
                                    src="/assets/images/service/PACKAGINGDESIGN/C_PLUS 1000 X 1000_01.png"
                                    className="w-full h-full object-cover transition-all duration-700"
                                    alt="3D Package Model"
                                />
                                <div className="absolute inset-x-0 h-20 bg-brand-primary/20 blur-xl animate-pulse top-0 pointer-events-none"></div>
                            </div>
                        </div>

                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-12 bg-brand-primary/5 blur-3xl rounded-full scale-150"></div>
                    </div>

                    <div className="relative h-[60vh] flex flex-col justify-center">

                        {THREED_SCROLL_CONTENT.steps.map((step, index) => {
                            const Icon = step.icon;
                            const titleParts = step.title.split(step.highlight);
                            return (
                                <div key={index} className="anatomy-step absolute inset-0 flex flex-col justify-center pointer-events-none">
                                    <div className="flex items-center gap-4 mb-6">
                                        <Icon className="text-brand-primary" size={24} />
                                        <span className="text-brand-primary font-black text-xs uppercase tracking-[0.4em]">{step.label}</span>
                                    </div>
                                    <h2 className="text-[2rem] md:text-6xl font-display font-black text-white uppercase italic leading-[0.85] mb-8">
                                        {titleParts[0]} <br /> <span className="text-brand-primary">{step.highlight}</span>
                                    </h2>
                                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-md font-medium">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </section>
        </div>
    );
};


export default ThreeDScroll;
