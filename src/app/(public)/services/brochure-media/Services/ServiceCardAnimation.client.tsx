'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardAnimationProps {
    children: React.ReactNode;
    index: number;
}

const ServiceCardAnimation: React.FC<ServiceCardAnimationProps> = ({ children, index }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-10 bg-brand-dark border border-white/5 rounded-2xl group relative overflow-hidden cursor-pointer"
        >
            {children}
        </motion.div>
    );
};

export default ServiceCardAnimation;