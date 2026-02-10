'use client';

import React, { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { ServiceItem } from './types';
import { ServiceCard } from './ServiceCard.client';
import './ServicesScroll.css';

interface DesktopServicesProps {
    services: ServiceItem[];
}

export const DesktopServices: React.FC<DesktopServicesProps> = ({ services }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section
            ref={containerRef}
            className="relative z-40 bg-black"
            style={{ height: `${services.length * 300}vh` }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {services.map((service, index) => {
                    const rangeStart = index * (1 / services.length);
                    const rangeEnd = (index + 1) * (1 / services.length);

                    return (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            progress={scrollYProgress}
                            range={[rangeStart, rangeEnd]}
                            index={index}
                            total={services.length}
                        />
                    );
                })}
            </div>
        </section>
    );
};