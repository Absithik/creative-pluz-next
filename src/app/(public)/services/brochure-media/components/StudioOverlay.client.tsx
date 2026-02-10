'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface StudioOverlayAnimationProps {
    children: ReactNode;
}

const StudioOverlayAnimation: React.FC<StudioOverlayAnimationProps> = ({ children }) => {
    const { scrollY } = useScroll();

    // Fade out the overlay as the background flattens out
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const y = useTransform(scrollY, [0, 400], [0, -50]);
    // Disable pointer events once scrolled past 300px so we can click links below
    const pointerEvents = useTransform(scrollY, (val) => val > 300 ? 'none' : 'auto');

    return (
        <motion.div
            style={{ opacity, y, pointerEvents }}
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

export default StudioOverlayAnimation;