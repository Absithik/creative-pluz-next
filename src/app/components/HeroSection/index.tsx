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
        cardTitle: "EUPHORIA",
        headline: "LIVE THE RHYTHM OF YOUR FREEDOM",
        description: "Let every beat guide your spirit toward freedom, energy, and unforgettable musical moments together.",
        image: "/assets/images/service/1687.jpg"
    },
    {
        id: 1,
        cardTitle: "NEON",
        headline: "ACCELERATE INTO THE NIGHT",
        description: "Experience the fastest beats and brightest lights in the heart of the neon jungle. A journey beyond speed.",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2000"
    },
    {
        id: 2,
        cardTitle: "CELESTIAL",
        headline: "SYMPHONY UNDER THE STARS",
        description: "A convergence of melodic techno and starlight. Find your peace in the resonance of the cosmos.",
        image: "https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=2000"
    },
    {
        id: 3,
        cardTitle: "BASS",
        headline: "FEEL THE POWER OF THE VOID",
        description: "Sub-atomic frequencies that shake the foundation of reality. An industrial masterpiece of pure bass.",
        image: "https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=2000"
    },
    {
        id: 4,
        cardTitle: "MIDNIGHT",
        headline: "DANCE IN THE DARKNESS",
        description: "When the sun goes down, the real magic begins. Underground sounds for the true night owls.",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2000"
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
