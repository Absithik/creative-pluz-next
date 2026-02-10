'use client';

import { useAnimation } from '../AnimationContext.client';

export function useParallax(sectionIndex: number, speed: number = 0.5) {
    const { sectionProgress, isInViewport } = useAnimation();

    if (!isInViewport[sectionIndex]) {
        return { transform: 'none', opacity: 0 };
    }

    const progress = sectionProgress[sectionIndex];

    // Calculate parallax effect based on scroll progress
    const parallaxY = progress * 100 * speed;
    const scale = 1 + (progress * 0.2 * speed);
    const opacity = Math.min(1, progress * 2);

    return {
        transform: `translate3d(0, ${-parallaxY}px, 0) scale(${scale})`,
        opacity: opacity
    };
}
