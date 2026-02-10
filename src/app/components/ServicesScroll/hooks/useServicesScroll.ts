// app/components/ServicesScroll/hooks/useServicesScroll.ts (CLIENT HOOK)
'use client';

import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export const useServicesScroll = () => {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.05], [0, -100]);
    const pointerEvents = useTransform(scrollYProgress, (val) => (val > 0.05 ? 'none' : 'auto'));

    return {
        containerRef,
        scrollYProgress,
        headerOpacity,
        headerY,
        pointerEvents
    };
};