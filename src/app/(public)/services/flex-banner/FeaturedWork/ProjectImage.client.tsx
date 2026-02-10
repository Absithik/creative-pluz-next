'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAnimation } from './AnimationContext.client';

interface ProjectImageProps {
    projectId: string;
    imageClass: string;
    imageUrl: string;
    sectionIndex: number;
    initialScale: number;
}

export default function ProjectImage({
    projectId,
    imageClass,
    imageUrl,
    sectionIndex,
    initialScale = 1
}: ProjectImageProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const { sectionProgress, isInViewport } = useAnimation();

    // Parallax scale effect
    const scale = useTransform(
        scrollYProgress,
        [0, 1],
        [initialScale, initialScale * 1.5]
    );

    // Opacity based on section progress
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0, 1, 1, 0]
    );

    // Blur effect when not active
    const blur = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [20, 0, 0, 20]
    );

    const currentProgress = sectionProgress[sectionIndex] || 0;
    const isActive = isInViewport[sectionIndex];

    return (
        <div ref={ref} className="pp-image-div">
            <motion.div
                className={`pp-image ${imageClass}`}
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    scale,
                    opacity,
                    filter: isActive ? 'blur(0px)' : 'blur(5px)',
                    transform: `scale(${1 + currentProgress * 0.2})`,
                    willChange: 'transform, opacity, filter'
                }}
                initial={{ scale: initialScale, opacity: 0 }}
                animate={{
                    scale: isActive ? initialScale * (1 + currentProgress * 0.2) : initialScale,
                    opacity: isActive ? 1 : 0.3
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                }}
            />
        </div>
    );
}
