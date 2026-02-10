'use client';

import { motion, MotionProps } from 'framer-motion';
import React from 'react';

interface AnimateInProps extends MotionProps {
    children: React.ReactNode;
    className?: string;
}

export default function AnimateIn({ children, className, ...props }: AnimateInProps) {
    return (
        <motion.div className={className} {...props}>
            {children}
        </motion.div>
    );
}
