import React from 'react';
import Link from 'next/link';
import { Code, Cpu, ArrowDownRight } from 'lucide-react';
import HeroSectionAnimation from './HeroSectionAnimation.client';

const TAGS = ['React/Next.js', 'Web3 Ready', 'Edge Optimized'] as const;

const HeroSection: React.FC = () => {
    return (
        <section className="relative min-h-screen flex flex-col justify-center px-6 py-8 md:px-12 pt-28 bg-brand-dark overflow-hidden">
            <div className="max-w-[1920px] w-full mx-auto z-10">
                <HeroSectionAnimation>
                    {/* Row 1 - Server Component */}
                    <div className="overflow-hidden">
                        <h1 className="text-[clamp(3rem,12vw,10rem)] leading-[0.85] font-display font-black text-white uppercase tracking-tighter">
                            Next-Gen
                        </h1>
                    </div>

                    {/* Row 2 - Server Component */}
                    <div className="overflow-hidden flex items-center gap-4 md:gap-12">
                        <div className="w-16 h-16 md:w-32 md:h-32 bg-brand-primary rounded-full flex items-center justify-center">
                            <Code className="text-black w-8 h-8 md:w-16 md:h-16" />
                        </div>
                        <h2 className="text-[clamp(2.5rem,10vw,8rem)] leading-[0.8] font-display font-black text-white uppercase tracking-tighter p-4">
                            Web
                        </h2>
                    </div>

                    {/* Row 3 - Server Component */}
                    <div className="overflow-hidden flex items-center gap-6">
                        <h2 className="text-[clamp(2.5rem,10vw,8rem)] leading-[0.8] font-display font-black text-brand-primary uppercase tracking-tighter">
                            Platforms
                        </h2>
                        <div className="hidden md:flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-2xl">
                            <Cpu className="text-brand-primary w-6 h-6" />
                            <span className="text-white/40 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                                High Performance <br /> Engineering
                            </span>
                        </div>
                    </div>
                </HeroSectionAnimation>

                {/* Description & Tags - Server Component */}
                <div className="mt-12 md:mt-20 flex flex-col md:flex-row justify-between items-start md:items-end">
                    <div className="max-w-xl">
                        <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-8">
                            We don't just build websites. We engineer scalable digital ecosystems that push the boundaries of performance and user experience.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {TAGS.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/50 uppercase font-black tracking-widest"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Button - Server Component (with Link) */}
                    <div className="mt-12 md:mt-0">
                        <Link href="/contact">
                            <div className="group relative overflow-hidden rounded-full bg-white px-10 py-5 md:px-16 md:py-8 transition-all hover:bg-brand-primary cursor-pointer">
                                <div className="relative z-10 flex items-center gap-4 text-black">
                                    <span className="font-black uppercase tracking-widest text-sm md:text-lg">
                                        Deploy Project
                                    </span>
                                    <ArrowDownRight className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Background Ambience - Server Component */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-primary/5 to-transparent pointer-events-none" />
            <div className="absolute -bottom-1/2 -left-1/4 w-[1000px] h-[1000px] bg-brand-primary/10 blur-[150px] rounded-full pointer-events-none" />
        </section>
    );
};

export default HeroSection;