import React from 'react';
import { Layers, Sparkles, Ruler, Palette } from 'lucide-react';

const MaterialSpecs = () => {
    const specs = [
        { Icon: Layers, title: "Paper Weights", desc: "80GSM to 450GSM cardstock available." },
        { Icon: Sparkles, title: "Premium Finishes", desc: "Matte, Gloss, UV Spot, and Velvet touch." },
        { Icon: Ruler, title: "Large Format", desc: "Up to 10ft wide seamless flex printing." },
        { Icon: Palette, title: "Color Accuracy", desc: "CMYK offset calibration for perfect matching." },
    ];

    return (
        <section className="py-24 bg-zinc-950 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {specs.map((spec, i) => (
                        <div
                            key={i}
                            // Added 'group', 'relative', 'overflow-hidden' for the border effect
                            className="group relative flex flex-col gap-4 p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900 transition-colors overflow-hidden cursor-pointer"
                        >
                            <spec.Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                            <div>
                                <h4 className="text-white font-bold mb-1 uppercase tracking-wider text-sm">{spec.title}</h4>
                                <p className="text-sm text-zinc-500 leading-relaxed">{spec.desc}</p>
                            </div>

                            {/* HOVER EFFECT: Left to Right Yellow Border */}
                            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-yellow-400 transition-all duration-500 ease-out group-hover:w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
};

export default MaterialSpecs;