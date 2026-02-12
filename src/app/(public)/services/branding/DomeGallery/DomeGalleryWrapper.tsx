'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import DomeGallery with SSR disabled
const DomeGallery = dynamic(() => import('./DomeGallery'), { ssr: false });

interface DomeGalleryWrapperProps {
    fit?: number;
    minRadius?: number;
    maxVerticalRotationDeg?: number;
    segments?: number;
    dragDampening?: number;
    grayscale?: boolean;
    // Add other props as needed based on DomeGalleryProps
}

export default function DomeGalleryWrapper(props: DomeGalleryWrapperProps) {
    return <DomeGallery {...props} />;
}
