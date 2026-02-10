'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { INVESTMENT_CARDS } from './content';
import { VerticalMarquee } from './animation';
import { InvestmentCard } from './data';
import { X, TrendingUp, Info } from 'lucide-react';

export default function InvestmentGallery() {
    const [selectedCard, setSelectedCard] = useState<InvestmentCard | null>(null);

    // Divide 15 cards into three distinct columns
    const col1 = INVESTMENT_CARDS.slice(0, 5);
    const col2 = INVESTMENT_CARDS.slice(5, 10);
    const col3 = INVESTMENT_CARDS.slice(10, 15);

    const handleCardClick = (card: InvestmentCard) => {
        setSelectedCard(card);
    };

    return (
        <section>
            <div className="mt-8 text-center max-w-xl mx-auto">
                <h2 className="text-6xl text-brand-primary uppercase tracking-tighter leading-none mb-4">Real-time Asset Intelligence</h2>
                <p className="text-gray-400 text-sm font-medium">Browse our dynamically updated investment grid. Each card represents a live opportunity vetted by our strategic risk algorithms.</p>
            </div>
            <div className="min-h-screen bg-black text-gray-900 flex flex-col">

                {/* Main Content Area - Responsive Height */}
                <main className="w-full flex flex-col items-center justify-center py-12 px-6">
                    <div className="w-full max-w-7xl h-[600px] md:h-[500px] bg-black rounded-[48px] relative overflow-hidden shadow-sm">
                        <section className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8 relative overflow-hidden">
                            {/* Edge Gradients for polished fade effect */}
                            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

                            {/* 
              Staggered Speed and Directions:
              Mobile: Show only col2 (medium speed, upward)
              Desktop: All 3 columns with different speeds
              Col 1: Downwards slowly
              Col 2: Upwards medium
              Col 3: Downwards quickly
            */}
                            <div className="hidden md:block">
                                <VerticalMarquee cards={col1} speed={25} direction="down" onCardClick={handleCardClick} />
                            </div>
                            <VerticalMarquee cards={col2} speed={50} direction="up" onCardClick={handleCardClick} />
                            <div className="hidden md:block">
                                <VerticalMarquee cards={col3} speed={85} direction="down" onCardClick={handleCardClick} />
                            </div>
                        </section>
                    </div>


                </main>

                {/* Asset Information Modal */}
                {selectedCard && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setSelectedCard(null)}
                        />
                        <div className="relative bg-white w-full max-w-2xl rounded-[40px] md:rounded-[56px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                            <button
                                onClick={() => setSelectedCard(null)}
                                className="absolute top-8 right-8 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/2 h-[250px] md:h-auto">
                                    <div className="h-full w-full relative">
                                        {selectedCard.imageUrl ? (
                                            <Image
                                                src={selectedCard.imageUrl}
                                                alt={selectedCard.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        ) : (
                                            <div className={`w-full h-full flex flex-col items-center justify-center p-8 ${selectedCard.bgColor} ${selectedCard.textColor}`}>
                                                <h4 className="text-4xl font-black text-center italic">{selectedCard.title}</h4>
                                                {selectedCard.subtitle && <p className="mt-2 opacity-70 font-bold uppercase text-[10px] tracking-widest">{selectedCard.subtitle}</p>}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-10 md:p-14 w-full md:w-1/2 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white">
                                            <Info size={16} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Market Intelligence</span>
                                    </div>

                                    <h2 className="text-4xl font-black mb-4 tracking-tighter leading-none uppercase italic">
                                        Asset <br /> Profile
                                    </h2>

                                    <p className="text-gray-600 leading-relaxed font-medium italic text-lg">
                                        {selectedCard.subtitle || "Strategic property investment targeting prime growth corridors and optimized rental yields."}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {selectedCard.tag && <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{selectedCard.tag}</span>}
                                        {selectedCard.value && <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">ROI: {selectedCard.value}</span>}
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
