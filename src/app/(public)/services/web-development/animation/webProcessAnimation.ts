import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const webProcessAnimation = (container: HTMLElement) => {
    const items = container.querySelectorAll('.process-item');

    gsap.fromTo(
        items,
        {
            opacity: 0,
            y: 80,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.25,
            scrollTrigger: {
                trigger: container,
                start: 'top 70%',
            },
        }
    );
};
