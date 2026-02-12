import React from 'react';
import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { InteractiveHero } from './InteractiveHero';
import { HeroItem } from './types';
import { HeroProvider } from './HeroState';
import './HeroSection.css';

const HERO_ITEMS: HeroItem[] = [
    {
        id: 0,
        cardTitle: "",
        headline: "Website Development",
        description: "High-end website designs that combine beauty, performance, and brand authority.",
        image: "/assets/images/service/HOMEPAGE/C_PLUS 1000 x 1000 Home Page )_01.png"
    },
    {
        id: 1,
        cardTitle: "",
        headline: "PRINT DESIGNS CRAFTED FOR PREMIUM IMPACT",
        description: "High-end brochures and ads that elevate brand storytelling.",
        image: "/assets/images/service/HOMEPAGE/C_PLUS 1000 x 1000 Home Page _02.png"
    },
    {
        id: 2,
        cardTitle: "",
        headline: "LUXURY DISPLAYS THAT COMMAND ATTENTION",
        description: "High-end corporate visuals crafted to elevate brand presence in every space.",
        image: "/assets/images/service/HOMEPAGE/C_PLUS 1000 x 1000 Home Page _03.png"
    },
    {
        id: 3,
        cardTitle: "",
        headline: "PREMIUM CONTENT FOR A STYLISH PRESENCE",
        description: "Sophisticated social media designs that reflect brand class and attract attention.",
        image: "/assets/images/service/HOMEPAGE/C_PLUS 1000 x 1000 Home Page _04.png"
    },
    {
        id: 4,
        cardTitle: "",
        headline: "LUXURY DESIGN THAT DEFINES YOUR BRAND",
        description: "Elegant logos, premium prints, and signage crafted for timeless brand impressions.",
        image: "/assets/images/service/HOMEPAGE/C_PLUS 1000 x 1000 Home Page _05.png"
    }
];

export default function HeroSection() {
    return (
        <HeroProvider>
            <div className="relative w-full bg-black overflow-hidden lg:overflow-visible">
                <InteractiveHero items={HERO_ITEMS}>
                    <HeroBackground items={HERO_ITEMS} />
                    <HeroContent items={HERO_ITEMS} />
                </InteractiveHero>
            </div>
        </HeroProvider>
    );
}
