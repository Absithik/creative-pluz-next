'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAnimation } from './AnimationContext.client';

export default function ScrollProgress() {
    const { activeSection, sectionProgress } = useAnimation();
    const sections = 5; // Total number of sections

    const scrollToSection = (index: number) => {
        // Mapping index to ID based on known data order
        const ids = ['opoint', 'spyscape', 'le-vermeil', 'chiro-actif', 'northand'];
        const id = ids[index] || ids[0];

        const section = document.getElementById(`project-${id}`);

        if (section) {
            // Native smooth scroll first
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <motion.div
            className="scroll-progress"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
        >
            {Array.from({ length: sections }).map((_, index) => {
                const progress = sectionProgress[index] || 0;
                const isActive = activeSection === index;

                return (
                    <motion.button
                        key={index}
                        className={`progress-dot ${isActive ? 'active' : ''}`}
                        onClick={() => scrollToSection(index)}
                        animate={{
                            scale: isActive ? 1.5 : 1,
                            backgroundColor: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.2)'
                        }}
                        whileHover={{ scale: 1.8 }}
                        whileTap={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <motion.div
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                backgroundColor: 'white',
                                scale: progress
                            }}
                        />
                    </motion.button>
                );
            })}
        </motion.div>
    );
}
