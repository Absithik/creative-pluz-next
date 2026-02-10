// app/components/ServicesScroll/AnimationWrapper.client.tsx (CLIENT COMPONENT)
'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface AnimationWrapperProps {
    children: React.ReactNode;
    yText?: MotionValue<number>;
    yImage?: MotionValue<number>;
    className?: string;
}

export const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
    children,
    yText,
    yImage,
    className = ''
}) => {
    return (
        <div className={className}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // Apply yText animation to text section
                    if (child.props.className?.includes('services-text-section') && yText) {
                        return (
                            <motion.div style={{ y: yText }}>
                                {child}
                            </motion.div>
                        );
                    }
                    // Apply yImage animation to image section
                    if (child.props.className?.includes('services-image-section') && yImage) {
                        return (
                            <motion.div style={{ y: yImage }}>
                                {child}
                            </motion.div>
                        );
                    }
                }
                return child;
            })}
        </div>
    );
};