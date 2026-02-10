'use client';

import Image from 'next/image';
import { HeroItem } from './types';
import { useHero } from './HeroState';

export function HeroBackground({ items }: { items: HeroItem[] }) {
    const { activeIndex } = useHero();

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-black">
            {items.map((item, index) => (
                <Image
                    key={item.id}
                    src={item.image}
                    alt={`Festival Background - ${item.cardTitle}`}
                    fill
                    priority={index === 0}
                    className={`absolute inset-0 object-cover transition-all duration-[1200ms] ease-out
                        ${index === activeIndex
                            ? 'opacity-100 scale-100 rotate-0 brightness-[0.4] md:brightness-[0.5]'
                            : 'opacity-0 scale-110 rotate-1 brightness-0'
                        }`}
                    sizes="100vw"
                />
            ))}

            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 lg:to-transparent"></div>
            <div className="absolute inset-0 bg-radial-vignette opacity-60"></div>
        </div>
    );
}
