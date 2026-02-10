'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from './types';

interface RoundCTAProps {
    project: Project;
    index: number;
    currentProgress: number;
}

export default function RoundCTA({ project, index, currentProgress }: RoundCTAProps) {
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    // Mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for mouse position
    const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

    // Transform based on mouse position
    const rotateX = useTransform(springY, [-100, 100], [10, -10]);
    const rotateY = useTransform(springX, [-100, 100], [-10, 10]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Global mouse tracking for magnetic effect when near, or just simplified local?
            // The user code attaches to window but logic suggests it wants relative to button center?
            // OR it wants the button to look at the mouse globally?
            // Given: "mouseX.set((e.clientX - centerX) / 5);" it seems to want "look at" behavior relative to button center.

            if (!buttonRef.current) return;

            const rect = buttonRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            mouseX.set((e.clientX - centerX) / 5); // Reduced sensitivity
            mouseY.set((e.clientY - centerY) / 5);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Button position based on scroll progress
    const buttonX = useTransform(
        () => {
            const baseX = parseFloat(project.buttonPosition.translateX) || -8.99728;
            const progress = currentProgress;
            return `${baseX + progress * 5}vw`;
        }
    );

    const buttonY = useTransform(
        () => {
            const baseY = parseFloat(project.buttonPosition.translateY) || 7.77092;
            const progress = currentProgress;
            return `${baseY + progress * 2}vh`;
        }
    );

    // Text rotation based on hover and progress
    const textRotation = useTransform(
        () => isHovered ? 0 : project.textRotation + currentProgress * 10
    );

    return (
        <motion.a
            ref={buttonRef}
            href={project.link}
            className={`pp-cta-div w-inline-block ${project.buttonClass}`}
            style={{
                x: buttonX,
                y: buttonY,
                rotateX,
                rotateY,
                scale: isHovered ? 1.1 : 1,
                willChange: 'transform',
                transformStyle: 'preserve-3d'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: 1,
                scale: 1,
                rotate: currentProgress * 360 // Full rotation on scroll
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 25
            }}
        >
            <div className="round-cta-txt-wrap">
                <motion.div
                    className="button-text"
                    style={{
                        rotateZ: textRotation,
                        willChange: 'transform',
                        transformStyle: 'preserve-3d'
                    }}
                    animate={{
                        rotateZ: isHovered ? 0 : project.textRotation,
                        scale: isHovered ? 1.2 : 1
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                    &nbsp;View&nbsp;Project
                </motion.div>
            </div>

            <motion.div
                className="round-div-2"
                style={{
                    x: springX,
                    y: springY,
                    scale: isHovered ? 1 : 0,
                    opacity: isHovered ? 1 : 0
                }}
                animate={{
                    scale: isHovered ? 1 : 0,
                    opacity: isHovered ? 1 : 0
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                }}
            />
        </motion.a>
    );
}
