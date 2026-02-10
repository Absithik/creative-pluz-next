import React from 'react';
import { Users } from 'lucide-react';
import AnimateIn from './AnimateIn';

export default function Story() {
    return (
        <div className="bg-brand-dark pb-50 relative z-10 pt-20">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-60">
                    <AnimateIn
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-brand-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-6 block">Origin Story</span>
                        <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-10 leading-[0.9] uppercase italic">
                            Beyond <br /> <span className="text-brand-primary">The Noise.</span>
                        </h2>
                        <div className="w-32 h-1 bg-brand-primary mb-12" />
                        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-8 font-medium italic">
                            Creative Pluz was founded on a simple premise: <strong className="text-white">Great design is not enough.</strong>
                        </p>
                        <p className="text-lg text-slate-400 leading-relaxed mb-8">
                            In today's hyper-competitive digital landscape, aesthetics alone won't move the needle. You need a partner who understands the intersection of behavioral psychology, high-end design, and market disruption.
                        </p>
                        <div className="flex items-center gap-6 p-8 border border-white/5 bg-white/[0.02] rounded-2xl">
                            <div className="p-4 bg-brand-primary text-black rounded-xl">
                                <Users size={32} />
                            </div>
                            <p className="text-slate-300 font-bold uppercase tracking-widest text-xs leading-relaxed">
                                We function as an elite extension of your leadership team, not just a vendor.
                            </p>
                        </div>
                    </AnimateIn>

                    <AnimateIn
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-brand-primary/10 blur-[60px] rounded-full"></div>
                        <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" className="w-full h-auto  transition-all duration-1000 group-hover:scale-105" alt="Our Workspace" />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-10 left-10">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-2">The War Room</p>
                                <h4 className="text-2xl font-display font-bold text-white uppercase italic">Where Vision Becomes ROI</h4>
                            </div>
                        </div>
                    </AnimateIn>
                </div>
            </div>
        </div>
    );
}
