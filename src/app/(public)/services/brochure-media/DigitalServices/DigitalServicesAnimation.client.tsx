'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const DigitalServicesAnimation: React.FC = () => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });
    
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start({
                opacity: 1,
                transition: { staggerChildren: 0.1 }
            });
        }
    }, [controls, inView]);

    return (
        <div 
            ref={ref}
            className="absolute inset-0 pointer-events-none"
        >
            {/* Hover effects are handled via CSS, not JS */}
            <style jsx>{`
                .group:hover img {
                    transform: scale(1.05);
                    transition: transform 0.7s ease-out;
                }
                
                .group:hover .rotate-on-hover {
                    transform: rotate(-2deg);
                    transition: transform 0.5s ease;
                }
                
                .group:hover .border-color-transition {
                    border-color: rgba(16, 185, 129, 0.5);
                    transition: border-color 0.5s ease;
                }
                
                .group:hover .item:hover .dot {
                    background-color: rgb(16, 185, 129);
                }
                
                .group:hover .item:hover span {
                    color: white;
                }
                
                button:hover {
                    background-color: white;
                    color: black;
                    transform: scale(1.05);
                    box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
                }
            `}</style>
        </div>
    );
};

export default DigitalServicesAnimation;