'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

// Animation variants outside component (prevents recreation on each render)
const letterAnim: Variants = {
    initial: { y: 200 },
    animate: {
        y: 0,
        transition: {
            duration: 1,
            ease: [0.6, 0.01, 0.05, 0.95]
        }
    }
};

const containerAnim: Variants = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const fadeInUp: Variants = {
    initial: { opacity: 0, y: 60 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.6, 0.01, 0.05, 0.95]
        }
    }
};

interface HeroSectionAnimationProps {
    children: ReactNode;
}

const HeroSectionAnimation: React.FC<HeroSectionAnimationProps> = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <motion.div
            className="flex flex-col gap-0"
            variants={containerAnim}
            initial={isMounted ? "initial" : false}
            animate={isMounted ? "animate" : false}
        >
            {children}
        </motion.div>
    );
};

// Optional: If you want button hover animations in client component
export const ButtonAnimation: React.FC = () => {
    return (
        <div className="mt-12 md:mt-0">
            <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-full bg-white px-10 py-5 md:px-16 md:py-8 transition-all hover:bg-brand-primary cursor-pointer block"
            >
                <div className="relative z-10 flex items-center gap-4 text-black">
                    <span className="font-black uppercase tracking-widest text-sm md:text-lg">
                        Deploy Project
                    </span>
                    <motion.div
                        className="w-5 h-5 md:w-6 md:h-6"
                        animate={{ rotate: 0 }}
                        whileHover={{ rotate: 45 }}
                        transition={{ duration: 0.5 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
                        </svg>
                    </motion.div>
                </div>
            </motion.a>
        </div>
    );
};

export default HeroSectionAnimation;