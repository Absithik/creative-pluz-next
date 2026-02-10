'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { InvestmentCard, CardType } from './data';
import { ArrowUpRight, CheckCircle2, MessageCircle, RefreshCw } from 'lucide-react';
import gsap from 'gsap';

interface InvestmentCardItemProps {
    card: InvestmentCard;
    onClick: (card: InvestmentCard) => void;
}

const InvestmentCardItem: React.FC<InvestmentCardItemProps> = ({ card, onClick }) => {
    const renderContent = () => {
        switch (card.type) {
            case CardType.IMAGE_TAG:
                return (
                    <div className="relative h-full w-full overflow-hidden">
                        {card.imageUrl && (
                            <Image
                                src={card.imageUrl}
                                alt={card.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 600px"
                            />
                        )}
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-gray-800 uppercase tracking-wider">{card.title}</span>
                        </div>
                        {card.tag && (
                            <div className="absolute bottom-4 right-4 bg-emerald-400 text-emerald-950 px-3 py-1 rounded-md text-[10px] font-bold">
                                {card.tag}
                            </div>
                        )}
                    </div>
                );

            case CardType.TYPOGRAPHIC:
                return (
                    <div className={`h-full w-full flex flex-col justify-center items-center p-8 ${card.bgColor} ${card.textColor}`}>
                        <p className="text-[10px] font-semibold opacity-80 uppercase tracking-widest mb-1 text-center">{card.subtitle}</p>
                        <h2 className="text-4xl font-black italic lowercase leading-none text-center">{card.title}</h2>
                        <div className="mt-6">
                            <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                                <div className="w-2 h-1 bg-current rounded-full" />
                            </div>
                        </div>
                    </div>
                );

            case CardType.INFOGRAPHIC:
                return (
                    <div className={`h-full w-full flex flex-col justify-between p-6 ${card.bgColor} ${card.textColor}`}>
                        <div className="flex justify-between items-start">
                            {card.value?.includes('%') ? (
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <CheckCircle2 size={20} />
                                </div>
                            ) : (
                                <div className="w-10 h-10rounded-full bg-indigo-900/40 flex items-center justify-center">
                                    <ArrowUpRight size={20} />
                                </div>
                            )}
                            <p className="text-[10px] font-bold uppercase max-w-[100px] text-right leading-tight">{card.title}</p>
                        </div>
                        <div className="mt-auto">
                            <h3 className="text-6xl font-black tracking-tighter leading-none">{card.value}</h3>
                            {card.tag && <span className="bg-emerald-400 text-emerald-950 px-2 py-0.5 rounded text-[10px] font-bold ml-1">{card.tag}</span>}
                            {card.subtitle && <p className="text-[10px] font-medium mt-4 leading-snug opacity-90">{card.subtitle}</p>}
                        </div>
                    </div>
                );

            case CardType.INVESTOR:
                return (
                    <div className={`h-full w-full flex flex-col ${card.bgColor} ${card.textColor}`}>
                        <div className="p-6">
                            <p className="text-[10px] font-bold uppercase opacity-60">{card.subtitle}</p>
                            <h2 className="text-3xl font-black tracking-tight">{card.title}</h2>
                        </div>
                        <div className="relative flex-1">
                            {card.imageUrl && (
                                <Image
                                    src={card.imageUrl}
                                    alt={card.title}
                                    fill
                                    className="object-cover grayscale opacity-80 mix-blend-multiply"
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />
                            )}
                            <div className="absolute top-4 right-4 bg-orange-500 text-white p-2 rounded-xl">
                                <MessageCircle size={16} />
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div
            onClick={() => onClick(card)}
            className="group relative flex-shrink-0 w-full aspect-square rounded-[32px] md:rounded-[40px] overflow-hidden shadow-lg cursor-pointer hover:scale-[0.98] transition-transform duration-300"
        >
            {renderContent()}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur rounded-full p-2">
                <RefreshCw size={14} className="text-white" />
            </div>
        </div>
    );
};

interface VerticalMarqueeProps {
    cards: InvestmentCard[];
    direction?: 'up' | 'down';
    speed?: number;
    onCardClick: (card: InvestmentCard) => void;
}

export const VerticalMarquee: React.FC<VerticalMarqueeProps> = ({
    cards,
    direction = 'up',
    speed = 30,
    onCardClick
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<gsap.core.Tween | null>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!scrollRef.current) return;

        const element = scrollRef.current;
        const scrollHeight = element.scrollHeight;
        const distance = scrollHeight / 2;
        const duration = distance / speed;

        // Kill any existing animation
        if (animationRef.current) {
            animationRef.current.kill();
        }

        // Set initial position based on direction
        if (direction === 'down') {
            gsap.set(element, { y: -distance });
        }

        // Create the animation
        const animation = gsap.to(element, {
            y: direction === 'up' ? -distance : 0,
            duration: duration,
            ease: 'none',
            repeat: -1,
            paused: isHovering,
        });

        animationRef.current = animation;

        return () => {
            animation.kill();
            animationRef.current = null;
        };
    }, [cards, direction, speed]);

    // Handle pause/resume when hovering changes
    useEffect(() => {
        if (!animationRef.current) return;

        if (isHovering) {
            animationRef.current.pause();
        } else {
            animationRef.current.resume();
        }
    }, [isHovering]);

    // Duplicate cards for seamless loop
    const displayCards = [...cards, ...cards];

    return (
        <div
            className="h-full overflow-hidden relative select-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div ref={scrollRef} className="flex flex-col gap-6 py-3">
                {displayCards.map((card, idx) => (
                    <InvestmentCardItem key={`${card.id}-${idx}`} card={card} onClick={onCardClick} />
                ))}
            </div>
        </div>
    );
};
