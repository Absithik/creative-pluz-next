'use client';

import React, { createContext, useContext, useState } from 'react';

interface HeroContextType {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export function HeroProvider({ children, initialIndex = 0 }: { children: React.ReactNode, initialIndex?: number }) {
    const [activeIndex, setActiveIndex] = useState(initialIndex);

    return (
        <HeroContext.Provider value={{ activeIndex, setActiveIndex }}>
            {children}
        </HeroContext.Provider>
    );
}

export function useHero() {
    const context = useContext(HeroContext);
    if (!context) {
        throw new Error('useHero must be used within a HeroProvider');
    }
    return context;
}
