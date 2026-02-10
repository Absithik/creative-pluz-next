import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useThreeDScrollAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 2. THE 3D SCANNER ANIMATION (Tumble + Move Down)
            const steps = gsap.utils.toArray('.anatomy-step');

            const anatomyTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=500%",
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            if (boxRef.current) {
                anatomyTl.to(boxRef.current, {
                    y: "50vh",
                    rotateX: 360,
                    rotateY: 720,
                    rotateZ: 45,
                    scale: 1.2,
                    ease: "none",
                }, 0);
            }

            anatomyTl.to("#laser-scanner", {
                top: "80%",
                ease: "none",
            }, 0);

            anatomyTl.fromTo(".hud-element",
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, stagger: 0.5, duration: 0.5 },
                0.5
            );

            steps.forEach((step: any, i) => {
                anatomyTl.fromTo(step,
                    { opacity: 0, x: 50, filter: "blur(10px)" },
                    { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8 },
                    i * 1.5
                );

                if (i < steps.length - 1) {
                    anatomyTl.to(step, { opacity: 0, x: -50, filter: "blur(10px)", duration: 0.5 }, i * 1.5 + 1.2);
                }
            });

            // Note: #anatomy-scroll-progress needs to be within the scope or globally accessible.
            // Assuming it is inside the containerRef scope.
            anatomyTl.to("#anatomy-scroll-progress", { height: "100%", ease: "none" }, 0);

        }, containerRef); // Scope to containerRef

        return () => ctx.revert();
    }, []);

    return { containerRef, boxRef };
};
