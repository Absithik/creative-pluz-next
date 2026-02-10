// app/components/home/ArtifactWall/ArtifactCard.tsx
'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Artifact } from './constants';
import { POSITION_LAYOUTS, IMAGE_SIZES, IMAGE_QUALITY } from './constants';

interface ArtifactCardProps {
    artifact: Artifact;
    hoverEffect: {
        enabled: boolean;
        scale: number;
    };
    position: number;
}

const ArtifactCard = memo(function ArtifactCard({
    artifact,
    hoverEffect,
    position
}: ArtifactCardProps) {
    const { image, design, link } = artifact;
    const positionIndex = Math.min(position - 1, 5); // Ensure we have a layout
    const layout = POSITION_LAYOUTS[positionIndex];

    // Optimize images: higher quality for first image, lower for others
    const quality = position === 1 ? IMAGE_QUALITY.primary : IMAGE_QUALITY.secondary;
    const priority = position === 1; // Only first image gets priority loading
    const imageSizes = IMAGE_SIZES[positionIndex] || '(max-width: 768px) 100vw, 33vw';

    return (
        <div
            className={`
        group relative overflow-hidden rounded-xl ${layout.colSpan} ${layout.rowSpan} ${layout.minHeight}
        ${design.customClass || ''}
        transition-all duration-300
        ${hoverEffect.enabled ? 'hover:scale-[1.02] hover:shadow-2xl' : ''}
        focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-4
      `}
            style={{
                backgroundColor: design.backgroundColor,
                color: design.textColor || '#FFFFFF',
            }}
            role="listitem"
        >
            {/* Image container */}
            <div className="absolute inset-0">
                {image?.url ? (
                    <Image
                        src={image.url}
                        alt={image.alt || `Artwork ${position}`}
                        fill
                        className="object-cover"
                        sizes={imageSizes}
                        quality={quality}
                        loading={priority ? "eager" : "lazy"}
                        priority={priority}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23222'/%3E%3C/svg%3E"
                    />
                ) : (
                    <div
                        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900"
                        aria-hidden="true"
                    >
                        <span className="text-4xl opacity-40">📷</span>
                    </div>
                )}
            </div>

            {/* Link overlay - CSS only */}
            {link?.url && (
                <Link
                    href={link.url}
                    className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 bg-black text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label={`View ${artifact.title || 'artifact'}`}
                >
                    {link.text || 'View'}
                </Link>
            )}

            {/* Gradient overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none"
                aria-hidden="true"
            />

            {/* Accessibility: hidden description for screen readers */}
            {artifact.description && (
                <span className="sr-only">
                    {artifact.description}
                </span>
            )}
        </div>
    );
});

export default ArtifactCard;