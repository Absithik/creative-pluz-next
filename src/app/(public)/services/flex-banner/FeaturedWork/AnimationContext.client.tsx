'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AnimationContextType {
    scrollY: number;
    activeSection: number;
    sectionProgress: number[];
    isInViewport: boolean[];
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
    const [scrollY, setScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState(0);
    const [sectionProgress, setSectionProgress] = useState<number[]>([]);
    const [isInViewport, setIsInViewport] = useState<boolean[]>([]);

    useEffect(() => {
        const sections = document.querySelectorAll('.section.pp');
        setSectionProgress(new Array(sections.length).fill(0));
        setIsInViewport(new Array(sections.length).fill(false));

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            setScrollY(scrollPosition);

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                // rect.top is relative to viewport, so we add scrollY to differ absolute top if needed, 
                // but for viewport intersection logic we use rect directly.
                const sectionTop = rect.top + scrollPosition;
                const sectionHeight = rect.height;

                // Calculate progress within section
                // We want 0 at entrance, 1 at exit. 
                // Standard approach: (scroll - top) / height
                // Adjusted for viewport center:
                const progress = Math.max(0, Math.min(1,
                    (scrollPosition + windowHeight / 2 - sectionTop) / sectionHeight
                ));

                setSectionProgress(prev => {
                    const newArr = [...prev];
                    newArr[index] = progress;
                    return newArr;
                });

                // Check if section is in viewport
                const inView = rect.top < windowHeight && rect.bottom > 0;
                setIsInViewport(prev => {
                    const newArr = [...prev];
                    newArr[index] = inView;
                    return newArr;
                });

                // Set active section
                if (scrollPosition >= sectionTop - windowHeight / 3 &&
                    scrollPosition < sectionTop + sectionHeight - windowHeight / 3) {
                    setActiveSection(index);
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimationContext.Provider value={{
            scrollY,
            activeSection,
            sectionProgress,
            isInViewport
        }}>
            {children}
        </AnimationContext.Provider>
    );
}

export function useAnimation() {
    const context = useContext(AnimationContext);
    if (!context) {
        throw new Error('useAnimation must be used within AnimationProvider');
    }
    return context;
}
