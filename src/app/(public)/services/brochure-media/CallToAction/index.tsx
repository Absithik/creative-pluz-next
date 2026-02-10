import React from 'react';
import Button from '@/components/Button';
import { Zap, CheckCircle2, Clock, Award } from 'lucide-react';

const CallToAction: React.FC = () => {
    return (
        <section className="py-20 bg-brand-primary text-black text-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Pre-header */}
                <span className="inline-block border border-black/30 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8 bg-white/20 backdrop-blur-sm">
                    Ready to start your print project?
                </span>

                {/* Main Heading - Capped size for large screens */}
                <h2 className="text-[12vw] lg:text-[7rem] font-display font-black uppercase leading-[0.8] mb-10 italic tracking-tighter">
                    Brochure Designs <br />
                    <span className="text-white drop-shadow-[0_2px_0_rgba(0,0,0,1)] text-stroke-black">That Sell</span> in Salem
                </h2>

                {/* Subtext */}
                <p className="text-xl font-medium text-black/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Stop handing out flyers that get thrown away. Get professional brochure design and printing services that turn Salem locals into loyal customers.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
                    <Button
                        href="/contact"
                        className="bg-black text-white px-10 py-5 text-lg rounded-none hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)] font-bold uppercase tracking-widest"
                    >
                        Get Free Brochure Quote <Zap className="ml-2 w-5 h-5 fill-brand-primary text-brand-primary" />
                    </Button>
                    <a
                        href="tel:+919363024021"
                        className="group flex items-center gap-2 border-2 border-black text-black px-8 py-5 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                    >
                        Call Our Print Experts
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </div>

                {/* NEW: Trust Signals / Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-black/20 pt-10 max-w-4xl mx-auto">
                    <div className="flex flex-col items-center">
                        <Clock className="w-8 h-8 mb-3 text-black/70" />
                        <h4 className="font-bold uppercase tracking-wide text-sm">24-Hour Turnaround</h4>
                        <p className="text-sm text-black/60">Available for rush orders</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Award className="w-8 h-8 mb-3 text-black/70" />
                        <h4 className="font-bold uppercase tracking-wide text-sm">Premium Paper Stocks</h4>
                        <p className="text-sm text-black/60">Matte, Gloss & Velvet finishes</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-8 h-8 mb-3 text-black/70" />
                        <h4 className="font-bold uppercase tracking-wide text-sm">Salem Local Team</h4>
                        <p className="text-sm text-black/60">Support local business</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;