import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useLifestyleAnimation = (imagesLength: number) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pinContainerRef = useRef<HTMLDivElement>(null);
    const mediaRefs = useRef<HTMLDivElement[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add({
                isDesktop: "(min-width: 1024px)",
                isTablet: "(min-width: 768px) and (max-width: 1023px)",
                isMobile: "(max-width: 767px)"
            }, (context) => {
                const { isDesktop, isTablet } = context.conditions as any;
                const isMobile = !isDesktop && !isTablet;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: pinContainerRef.current,
                        start: "top top",
                        end: "+=3000",
                        pin: true,
                        scrub: 1.5,
                        anticipatePin: 1,
                    }
                });

                const radius = isDesktop ? 400 : isTablet ? 280 : 180;
                const visibleCards = isDesktop ? imagesLength : Math.min(5, imagesLength);

                // 3D Spiral/Helix Animation
                mediaRefs.current.forEach((el, i) => {
                    if (!el) return;

                    // Hide extra cards on mobile
                    if (!isDesktop && i >= visibleCards) {
                        gsap.set(el, { opacity: 0, display: 'none' });
                        return;
                    }

                    const angle = (360 / visibleCards) * i;
                    const angleRad = (angle * Math.PI) / 180;

                    // Calculate circular positions
                    const x = Math.cos(angleRad) * radius;
                    const z = Math.sin(angleRad) * radius;

                    // Initial state: All cards at center, stacked
                    gsap.set(el, {
                        x: 0,
                        y: 0,
                        z: 0,
                        rotationY: 0,
                        scale: 0.5,
                        opacity: 0,
                        zIndex: imagesLength - i
                    });

                    // Phase 1: Expand into spiral from center
                    tl.to(el, {
                        x: x * 0.3,
                        y: i * 30 - 100,
                        z: z * 0.3,
                        rotationY: angle * 0.5,
                        scale: 0.8,
                        opacity: 1,
                        duration: 1.5,
                        ease: "power2.out"
                    }, i * 0.1);

                    // Phase 2: Full spiral expansion
                    tl.to(el, {
                        x: x,
                        y: Math.sin(angleRad * 2) * 80,
                        z: z,
                        rotationY: angle,
                        scale: 1,
                        duration: 1.5,
                        ease: "power1.inOut"
                    }, "expand");

                    // Phase 3: Rotate the entire spiral
                    tl.to(el, {
                        rotationY: `+=${isDesktop ? 180 : 90}`,
                        duration: 2,
                        ease: "none"
                    }, "rotate");

                    // Phase 4: Collapse to grid layout
                    const cols = isDesktop ? 4 : isTablet ? 2 : 1; // 4 columns on desktop, 2 on tablet, 1 on mobile
                    const rows = Math.ceil(visibleCards / cols);

                    const col = i % cols;
                    const row = Math.floor(i / cols);

                    const cardWidth = isDesktop ? 280 : isTablet ? 220 : 260;
                    const cardHeight = isDesktop ? 180 : isTablet ? 142 : 168;
                    const gapX = isDesktop ? 40 : isTablet ? 30 : 20;
                    const gapY = isDesktop ? 40 : isTablet ? 30 : 20;

                    const totalGridWidth = (cols * cardWidth) + ((cols - 1) * gapX);
                    const totalGridHeight = (rows * cardHeight) + ((rows - 1) * gapY);

                    const gridX = (col * (cardWidth + gapX)) - (totalGridWidth / 2) + (cardWidth / 2);
                    const gridY = (row * (cardHeight + gapY)) - (totalGridHeight / 2) + (cardHeight / 2);

                    tl.to(el, {
                        x: gridX,
                        y: gridY,
                        z: 0,
                        rotationY: 0,
                        rotationX: 0,
                        scale: 1,
                        duration: 1.5,
                        ease: "power2.inOut"
                    }, "collapse");
                });

                // Text animation
                const headings = containerRef.current?.querySelectorAll('.lifestyle__heading');
                if (headings) {
                    tl.fromTo(headings,
                        { opacity: 0, scale: 0.7, rotationX: -90 },
                        { opacity: 1, scale: 1, rotationX: 0, duration: 1.5, ease: "back.out(1.2)" },
                        0.5
                    );

                    // Fade out heading during grid formation
                    tl.to(headings, {
                        opacity: 0.3,
                        scale: 0.8,
                        duration: 1,
                        ease: "power2.inOut"
                    }, "collapse");
                }

            });
        }, containerRef);

        return () => ctx.revert();
    }, [imagesLength]);

    return { containerRef, pinContainerRef, mediaRefs };
};
