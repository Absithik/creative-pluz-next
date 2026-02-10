'use client';

import { useEffect, useState } from 'react';

export function useScrollAnimation() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.section.pp');
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                // rect.top is relative to viewport. To get document position we add scrollY
                const sectionTop = rect.top + window.scrollY;
                const sectionHeight = rect.height;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveSection(index);
                    const progress = (scrollPosition - sectionTop) / sectionHeight;
                    setScrollProgress(progress);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        // Initial call to set state based on current load position
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { scrollProgress, activeSection };
}
