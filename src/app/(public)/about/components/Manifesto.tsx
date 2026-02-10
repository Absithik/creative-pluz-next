'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Zap, Flame, ShieldCheck, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
    const manifestoRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 4. MANIFESTO REVEAL (Sequential)
            const manifestoItems = gsap.utils.toArray<HTMLElement>('.manifesto-item');
            gsap.to(manifestoItems, {
                opacity: 1,
                y: 0,
                stagger: 0.5,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top 70%",
                    end: "bottom 20%",
                    scrub: 1,
                }
            });

            // 5. GHOST TEXT DRIFT
            gsap.to(".ghost-text", {
                xPercent: -30,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    scrub: 2,
                }
            });
        }, manifestoRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={manifestoRef} className="bg-[#050505] py-10 relative overflow-hidden">
            {/* Kinetic Background Text */}
            <div className="absolute top-1/4 left-0 whitespace-nowrap opacity-[0.03] pointer-events-none select-none z-0">
                <span className="ghost-text text-[35vw] font-display font-black uppercase italic text-white leading-none inline-block mr-40">OBSESSION</span>
                <span className="ghost-text text-[35vw] font-display font-black uppercase italic text-white leading-none inline-block">IMPACT</span>
            </div>

            <div ref={triggerRef} className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col gap-60">

                    {/* 01. MISSION */}
                    <div className="manifesto-item opacity-0 translate-y-32 flex flex-col md:flex-row gap-12 md:gap-12 items-start">
                        <div className="md:w-1/3 group">
                            <span className="text-brand-primary font-black text-7xl md:text-9xl font-display leading-none group-hover:italic transition-all duration-500 inline-block">01</span>
                            <h3 className="text-white text-3xl font-display font-bold uppercase mt-6 tracking-tighter flex items-center gap-3">
                                <Target className="text-brand-primary" size={24} /> The Mission.
                            </h3>
                        </div>
                        <div className="md:w-2/3 border-l border-white/5 pl-8 md:pl-24 py-4 relative">
                            <div className="absolute top-0 left-0 w-1 h-20 bg-brand-primary"></div>
                            <h4 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 leading-[1.1]">
                                We don’t build <span className="text-brand-primary italic">Websites.</span> We build <br /> Market Dominance <span className="underline decoration-brand-primary decoration-4 underline-offset-8">Engines.</span>
                            </h4>
                            <p className="text-slate-400 text-lg md:text-2xl leading-relaxed max-w-3xl font-medium">
                                Our singular goal is to transform brands into industry benchmarks. We blend raw creative instinct with tactical data to ensure your brand isn't just "seen"—it's impossible to ignore.
                            </p>
                            <div className="mt-12 flex flex-wrap gap-8">
                                <div className="flex items-center gap-3 text-brand-primary font-black uppercase text-xs tracking-[0.2em]"><ShieldCheck size={20} /> Unrivaled Scalability</div>
                                <div className="flex items-center gap-3 text-brand-primary font-black uppercase text-xs tracking-[0.2em]"><Cpu size={20} /> Tech-First Architecture</div>
                            </div>
                        </div>
                    </div>

                    {/* 02. STRATEGY */}
                    <div className="manifesto-item opacity-0 translate-y-5 flex flex-col mt-[-12rem] md:flex-row gap-12 md:gap-32 items-start ">
                        <div className="md:w-1/3 group">
                            <span className="text-brand-primary font-black text-7xl md:text-9xl font-display leading-none group-hover:italic transition-all duration-500 inline-block">02</span>
                            <h3 className="text-white text-3xl font-display font-bold uppercase mt-6 tracking-tighter flex items-center gap-3">
                                <Zap className="text-brand-primary" size={24} /> The Strategy.
                            </h3>
                        </div>
                        <div className="md:w-2/3 border-l border-white/5 pl-8 md:pl-24 py-4 relative">
                            <div className="absolute top-0 left-0 w-1 h-20 bg-brand-primary"></div>
                            <h4 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 leading-[1.1] uppercase italic">
                                Precision Over <span className="text-brand-primary underline decoration-brand-primary decoration-2 underline-offset-4">Padding.</span>
                            </h4>
                            <p className="text-slate-400 text-lg md:text-2xl leading-relaxed max-w-3xl font-medium">
                                Agility is our weapon. We eliminate corporate bloat to deliver results at high velocity. Every pixel, every line of code, and every campaign strategy is audited for one thing: ROI.
                            </p>
                            <div className="mt-12 flex flex-wrap gap-4">
                                {['Data-Led Strategy', 'Rapid Prototyping', 'User-Centric Architecture', 'Behavioral Psychology'].map(item => (
                                    <span key={item} className="px-6 py-3 border border-white/10 bg-white/5 text-[10px] font-black uppercase text-slate-300 tracking-[0.3em] hover:bg-brand-primary hover:text-black transition-colors cursor-default">{item}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 03. ETHOS */}
                    <div className="manifesto-item opacity-0 translate-y-5 flex flex-col mt-[-12rem]  md:flex-row gap-12 md:gap-32 items-start">
                        <div className="md:w-1/3 group">
                            <span className="text-brand-primary font-black text-7xl md:text-9xl font-display leading-none group-hover:italic transition-all duration-500 inline-block">03</span>
                            <h3 className="text-white text-3xl font-display font-bold uppercase mt-6 tracking-tighter flex items-center gap-3">
                                <Flame className="text-brand-primary" size={24} /> The Ethos.
                            </h3>
                        </div>
                        <div className="md:w-2/3 border-l border-white/5 pl-8 md:pl-24 py-4 relative">
                            <div className="absolute top-0 left-0 w-1 h-20 bg-brand-primary"></div>
                            <h4 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 leading-[1.1]">
                                Obsessive <span className="text-brand-primary italic">Craft.</span> <br /> No Room For <span className="bg-brand-primary text-black px-4 py-1 rotate-[-2deg] inline-block">Average.</span>
                            </h4>
                            <p className="text-slate-400 text-lg md:text-2xl leading-relaxed max-w-3xl font-medium">
                                We are a collective of specialists, not generalists. We believe that 'good enough' is the enemy of excellence. Our team is driven by a shared obsession for perfection and aesthetic purity.
                            </p>
                            <div className="mt-12 flex items-center gap-10">
                                <div className="w-20 h-20 rounded-full border border-brand-primary/20 flex items-center justify-center relative">
                                    <Flame size={40} className="text-brand-primary" />
                                    <div className="absolute inset-0 border border-brand-primary rounded-full animate-ping opacity-20"></div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2">Agency Standard</p>
                                    <p className="text-xl font-display font-bold text-white italic">"Visceral Excellence Only."</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
