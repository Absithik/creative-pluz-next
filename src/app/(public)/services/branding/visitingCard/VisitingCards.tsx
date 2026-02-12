"use client";

import { motion, useAnimation } from "framer-motion";
import { Star, Smile, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type CardType = {
    company: string;
    role: string;
    slogan: string;
    theme: string;
    layout: string;
    img?: string;
};

const classNames = (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" ");

export default function VisitingCards({ cards }: { cards: CardType[] }) {

    const [mounted, setMounted] = useState(false);
    const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const row1 = cards.filter((_, i) => i % 3 === 0);
    const row2 = cards.filter((_, i) => i % 3 === 1);
    const row3 = cards.filter((_, i) => i % 3 === 2);

    return (
        <>
            <div className="w-[150%] h-[150%] flex flex-col items-center justify-center rotate-[-12deg] transform-gpu overflow-hidden gap-12 bg-black">
                <MarqueeRow cards={row1} direction="left" speed={30} onSelect={setSelectedCard} />
                <MarqueeRow cards={row2} direction="right" speed={30} onSelect={setSelectedCard} />
                <MarqueeRow cards={row3} direction="left" speed={30} onSelect={setSelectedCard} />
            </div>

            {selectedCard && (
                <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
            )}
        </>
    );
}

const MarqueeRow = ({
    cards,
    direction,
    speed,
    onSelect,
}: {
    cards: CardType[];
    direction: "left" | "right";
    speed: number;
    onSelect: (card: CardType) => void;
}) => {

    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            x: direction === "left" ? "-50%" : "0%",
            transition: {
                duration: speed,
                repeat: Infinity,
                ease: "linear",
            },
        });
    }, []);

    return (
        <div
            className="w-full flex relative z-0 hover:z-50 transition-all overflow-hidden"
            onMouseEnter={() => controls.stop()}
            onMouseLeave={() =>
                controls.start({
                    x: direction === "left" ? "-50%" : "0%",
                    transition: {
                        duration: speed,
                        repeat: Infinity,
                        ease: "linear",
                    },
                })
            }
        >
            <motion.div
                animate={controls}
                initial={{ x: direction === "left" ? "0%" : "-50%" }}
                className="flex gap-8 md:gap-12 flex-shrink-0 px-4 transform-gpu will-change-transform"
            >
                {[...cards, ...cards, ...cards].map((card, i) => (
                    <FloatingCard
                        key={`${card.company}-${i}`}
                        card={card}
                        onClick={() => onSelect(card)}
                    />
                ))}
            </motion.div>
        </div>
    );
};

function FloatingCard({
    card,
    onClick,
}: {
    card: CardType;
    onClick: () => void;
}) {
    return (
        <motion.div
            whileHover={{
                scale: 1.1,
                rotate: 12,
                zIndex: 100,
                transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            onClick={onClick}
            className="relative w-[320px] h-[200px] md:w-[400px] md:h-[250px] rounded-[1.5rem] flex-shrink-0 p-6 md:p-8 flex flex-col justify-between shadow-2xl overflow-hidden cursor-pointer bg-white"
        >
            <div className="absolute top-4 right-4 z-10">
                {card.layout === "minimal" ? (
                    <Star className="w-5 h-5" />
                ) : (
                    <Smile className="w-5 h-5" />
                )}
            </div>

            {card.layout === "image" && card.img ? (
                <>
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={card.img}
                            alt={card.company}
                            fill
                            className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    <div className="relative z-10 text-white">
                        <h3 className="font-bold text-2xl">{card.company}</h3>
                        <p className="text-sm">{card.role}</p>
                    </div>
                </>
            ) : (
                <>
                    <h3 className="font-bold text-xl">{card.company}</h3>
                    <p className="text-sm opacity-70">{card.role}</p>
                    <p className="text-xs mt-auto border-t pt-2">{card.slogan}</p>
                </>
            )}
        </motion.div>
    );
}

function CardModal({
    card,
    onClose,
}: {
    card: CardType;
    onClose: () => void;
}) {
    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full h-full flex items-center justify-center"
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 bg-white rounded-full p-2 z-50"
                >
                    <X />
                </button>

                {card.img && (
                    <div className="relative w-full h-full">
                        <Image
                            src={card.img}
                            alt={card.company}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                )}
            </motion.div>
        </div>
    );
}

