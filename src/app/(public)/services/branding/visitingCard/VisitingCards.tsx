"use client";

import { motion } from "framer-motion";
import { Star, Smile, Hexagon, Circle } from "lucide-react";
import Image from "next/image";

type CardType = {
    company: string;
    role: string;
    slogan: string;
    theme: string;
    email?: string;
    phone?: string;
    layout: string;
    img?: string;
};

const classNames = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" ");

export default function VisitingCards({ cards }: { cards: CardType[] }) {
    // Split cards into 3 rows for the marquee effect
    const row1 = cards.filter((_, i) => i % 3 === 0);
    const row2 = cards.filter((_, i) => i % 3 === 1);
    const row3 = cards.filter((_, i) => i % 3 === 2);

    return (
        <div className="w-[150%] h-[150%] flex flex-col items-center justify-center rotate-[-12deg] transform-gpu overflow-hidden gap-12 bg-black">
            <MarqueeRow cards={row1} direction="left" speed={30} />
            <MarqueeRow cards={row2} direction="right" speed={30} />
            <MarqueeRow cards={row3} direction="left" speed={30} />
        </div>
    );
}

const MarqueeRow = ({ cards, direction, speed }: { cards: CardType[], direction: "left" | "right", speed: number }) => {
    return (
        <div className="w-full flex relative z-0 hover:z-50 transition-all"> {/* Removed overflow-hidden */}
            <motion.div
                initial={{ x: direction === "left" ? 0 : "-50%" }}
                animate={{ x: direction === "left" ? "-50%" : 0 }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="flex gap-8 md:gap-12 flex-shrink-0 px-4"
            >
                {/* Duplicate logic for infinite loop - tripled for safety coverage */}
                {[...cards, ...cards, ...cards, ...cards].map((card, i) => (
                    <FloatingCard key={i} card={card} index={i} />
                ))}
            </motion.div>
        </div>
    );
}


function FloatingCard({ card, index }: { card: CardType; index: number }) {
    const isBlack = card.theme === "black";

    return (
        <motion.div
            whileHover={{
                scale: 1.1,
                rotate: 12, // Counter-rotate to 0deg (relative to screen)
                zIndex: 100,
                transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className={classNames(
                "relative w-[320px] h-[200px] md:w-[400px] md:h-[250px] rounded-[1.5rem] flex-shrink-0 p-6 md:p-8 flex flex-col justify-between shadow-2xl overflow-hidden cursor-pointer", // Added cursor-pointer

            )}
        >
            {/* Abstract Background Noise */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            <div className="absolute top-4 right-4 z-10">
                {card.layout === "minimal" ? (
                    <Star className="w-5 h-5" />
                ) : (
                    <Smile className="w-5 h-5" />
                )}
            </div>

            {card.layout === 'image' && card.img ? (
                <>
                    <div className="absolute inset-0 z-0">
                        <img src={card.img} alt={card.company} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between text-white">
                        <h3 className="font-bold text-3xl font-display uppercase italic">{card.company}</h3>
                        <div className="bg-black/50 backdrop-blur-md self-start px-3 py-1 rounded-full border border-white/20">
                            <p className="text-[0.6rem] uppercase tracking-widest">{card.role}</p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h3 className="font-bold text-xl relative z-10">{card.company}</h3>
                    <p className="text-sm opacity-70 relative z-10">{card.role}</p>
                    <p className="text-xs mt-auto relative z-10 font-bold uppercase tracking-wide border-t border-current/20 pt-4">{card.slogan}</p>
                </>
            )}
        </motion.div>
    );
}
