'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
interface Artifact {
    _id: string;
    positionId: string;
    title: string;
    description: string;
    image: {
        url: string;
        alt: string;
    };
    position: {
        mdColSpan: number;
        mdRowSpan: number;
        order: number;
    };
    design: {
        backgroundColor: string;
        textColor: string;
        customClass?: string;
    };
    link: {
        url: string;
        text: string;
    };
    isEmpty?: boolean;
}

interface ArtifactWallConfig {
    title: string;
    subtitle: string;
    archiveLink: string;
    hoverEffect: {
        enabled: boolean;
        scale: number;
    };
}

export const ArtifactWall = () => {
    const [artifacts, setArtifacts] = useState<Artifact[]>([]);
    const [config, setConfig] = useState<ArtifactWallConfig | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [artifactsRes, configRes] = await Promise.all([
                fetch('/api/artifacts'),
                fetch('/api/public/artifact-wall-config') // NEW: Public config endpoint
            ]);

            if (artifactsRes.ok) {
                const artifactsData = await artifactsRes.json();
                setArtifacts(artifactsData.data || []);
            }

            if (configRes.ok) {
                const configData = await configRes.json();
                setConfig(configData.data || getFallbackConfig());
            } else {
                setConfig(getFallbackConfig());
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Use fallback data
            setArtifacts(getFallbackArtifacts());
            setConfig(getFallbackConfig());
        } finally {
            setLoading(false);
        }
    };

    const getFallbackArtifacts = (): Artifact[] => {
        return [
            {
                _id: 'position-1',
                positionId: 'position-1',
                title: 'Social Media Campaign',
                description: 'Creative campaign featuring bold typography',
                image: {
                    url: '/assets/images/service/BANNERS/Insta Post 17.jpg',
                    alt: 'Social media creative campaign'
                },
                position: { mdColSpan: 8, mdRowSpan: 2, order: 1 },
                design: {
                    backgroundColor: '#E31E24',
                    textColor: '#FFFFFF',
                    customClass: ''
                },
                link: { url: '/portfolio/1', text: 'Explore' }
            },
            {
                _id: 'position-2',
                positionId: 'position-2',
                title: 'Brand Identity',
                description: 'Minimalist brand identity for tech startup',
                image: {
                    url: '/assets/images/service/BANNERS/Insta Post 16.jpg',
                    alt: 'Brand identity design'
                },
                position: { mdColSpan: 4, mdRowSpan: 1, order: 2 },
                design: {
                    backgroundColor: '#222222',
                    textColor: '#FFFFFF',
                    customClass: 'opacity-80'
                },
                link: { url: '/portfolio/2', text: 'View' }
            },
            {
                _id: 'position-3',
                positionId: 'position-3',
                title: 'Mobile App Design',
                description: 'Mobile app interface showcasing user dashboard',
                image: {
                    url: '/assets/images/service/BANNERS/Insta Post.png',
                    alt: 'Mobile app interface design'
                },
                position: { mdColSpan: 4, mdRowSpan: 2, order: 3 },
                design: {
                    backgroundColor: '#4CAF50',
                    textColor: '#FFFFFF',
                    customClass: ''
                },
                link: { url: '/portfolio/3', text: 'Explore' }
            },
            {
                _id: 'position-4',
                positionId: 'position-4',
                title: 'Print Collateral',
                description: 'Minimalist branding collateral with clean typography',
                image: {
                    url: '/assets/images/service/BANNERS/Insta Post 17.jpg',
                    alt: 'Print design collateral'
                },
                position: { mdColSpan: 5, mdRowSpan: 1, order: 4 },
                design: {
                    backgroundColor: '#f8fafc',
                    textColor: '#000000',
                    customClass: ''
                },
                link: { url: '/portfolio/4', text: 'View' }
            },
            {
                _id: 'position-5',
                positionId: 'position-5',
                title: 'Graphic Element',
                description: 'Vibrant neon graphic design element',
                image: {
                    url: '/assets/images/service/BANNERS/Insta Post.png',
                    alt: 'Graphic design element'
                },
                position: { mdColSpan: 3, mdRowSpan: 1, order: 5 },
                design: {
                    backgroundColor: '#6366f1',
                    textColor: '#FFFFFF',
                    customClass: ''
                },
                link: { url: '/portfolio/5', text: 'Explore' }
            },
            {
                _id: 'position-6',
                positionId: 'position-6',
                title: 'Marketing Banner',
                description: 'Orange themed marketing banner for seasonal promotion',
                image: {
                    url: '/assets/images/service/BANNERS/Insta Post 16.jpg',
                    alt: 'Marketing banner design'
                },
                position: { mdColSpan: 8, mdRowSpan: 1, order: 6 },
                design: {
                    backgroundColor: '#f97316',
                    textColor: '#FFFFFF',
                    customClass: 'opacity-80'
                },
                link: { url: '/portfolio/6', text: 'View' }
            },
            {
                _id: 'position-7',
                positionId: 'position-7',
                title: 'Logo Design',
                description: 'Corporate logo design on white background',
                image: {
                    url: '/assets/images/service/BANNERS/Insta Post.png',
                    alt: 'Logo design showcase'
                },
                position: { mdColSpan: 4, mdRowSpan: 2, order: 7 },
                design: {
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                },
                link: { url: '/portfolio/7', text: 'Explore' }
            },
            {
                _id: 'position-8',
                positionId: 'position-8',
                title: 'Fashion Editorial',
                description: 'Monochrome photography for fashion editorial',
                image: {
                    url: '/assets/images/service/BANNERS/Insta Post 17.jpg',
                    alt: 'Fashion photography'
                },
                position: { mdColSpan: 3, mdRowSpan: 1, order: 8 },
                design: {
                    backgroundColor: '#333333',
                    textColor: '#FFFFFF',
                    customClass: 'opacity-50'
                },
                link: { url: '/portfolio/8', text: 'View' }
            },
            {
                _id: 'position-9',
                positionId: 'position-9',
                title: 'Packaging Design',
                description: 'Elegant packaging design for premium product',
                image: {
                    url: '/assets/images/service/BANNERS/Insta Post 16.jpg',
                    alt: 'Product packaging design'
                },
                position: { mdColSpan: 5, mdRowSpan: 1, order: 9 },
                design: {
                    backgroundColor: '#758cb1ff',
                    textColor: '#FFFFFF',
                    customClass: ''
                },
                link: { url: '/portfolio/9', text: 'Explore' }
            }
        ];
    };

    const getFallbackConfig = (): ArtifactWallConfig => {
        return {
            title: 'Selected',
            subtitle: 'Artifacts.',
            archiveLink: '/portfolio',
            hoverEffect: {
                enabled: true,
                scale: 0.99
            }
        };
    };

    if (loading) {
        return (
            <section className="py-12 md:py-32 bg-brand-dark overflow-hidden">
                <div className="max-w-[1920px] mx-auto px-6 md:px-12">
                    {/* Header Section Skeleton */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 animate-pulse">
                        <div className="max-w-2xl">
                            <div className="h-16 md:h-24 lg:h-28 bg-gray-800 rounded-lg mb-2 w-3/4"></div>
                            <div className="h-16 md:h-24 lg:h-28 bg-gray-700 rounded-lg w-1/2"></div>
                        </div>
                        <div className="mt-8 md:mt-0 flex items-center gap-4">
                            <div className="h-4 bg-gray-800 rounded w-24"></div>
                            <div className="w-10 h-10 rounded-full bg-gray-800"></div>
                        </div>
                    </div>

                    {/* Fixed Grid Layout Skeleton - Exactly matching the 9 positions */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[300vh] lg:h-[220vh] animate-pulse">
                        {/* Position 1: Large Feature (8×2) */}
                        <div className="md:col-span-8 md:row-span-2 min-h-[400px] bg-gray-800 rounded-lg"></div>

                        {/* Position 2: Tactical Slim (4×1) */}
                        <div className="md:col-span-4 md:row-span-1 min-h-[250px] bg-gray-800 rounded-lg"></div>

                        {/* Position 3: Vertical Tech (4×2) */}
                        <div className="md:col-span-4 md:row-span-2 min-h-[500px] bg-gray-800 rounded-lg"></div>

                        {/* Position 4: Horizontal Mid (5×1) */}
                        <div className="md:col-span-5 md:row-span-1 min-h-[250px] bg-gray-800 rounded-lg"></div>

                        {/* Position 5: Square Accent (3×1) */}
                        <div className="md:col-span-3 md:row-span-1 min-h-[250px] bg-gray-800 rounded-lg"></div>

                        {/* Position 6: Wide Banner (8×1) */}
                        <div className="md:col-span-8 md:row-span-1 min-h-[250px] bg-gray-800 rounded-lg"></div>

                        {/* Position 7: Identity Block (4×2) */}
                        <div className="md:col-span-4 md:row-span-2 min-h-[400px] bg-gray-800 rounded-lg"></div>

                        {/* Position 8: Dark Accent (3×1) */}
                        <div className="md:col-span-3 md:row-span-1 min-h-[250px] bg-gray-800 rounded-lg"></div>

                        {/* Position 9: Slim Footer Item (5×1) */}
                        <div className="md:col-span-5 md:row-span-1 min-h-[250px] bg-gray-800 rounded-lg"></div>
                    </div>
                </div>
            </section>
        );
    }

    const { title, subtitle, archiveLink, hoverEffect } = config!;

    // Helper to get artifact by order (0-8)
    const getArtifact = (order: number) => {
        return artifacts.find(a => a.position?.order === order);
    };

    return (
        <section className="py-12 md:py-32 bg-brand-dark overflow-hidden">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-black text-brand-primary uppercase leading-[0.85] italic tracking-tighter">
                            {title} <br /> <span className="text-slate-400">{subtitle}</span>
                        </h2>
                    </div>
                    <Link
                        href={archiveLink}
                        className="group mt-8 md:mt-0 flex items-center gap-4 text-white font-black uppercase tracking-widest text-[10px] md:text-sm"
                    >
                        View Archive
                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                            <ArrowRight size={20} />
                        </div>
                    </Link>
                </div>

                {/* Fixed Grid Layout - Always 9 positions */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[300vh] lg:h-[220vh]">
                    {/* Position 1: Large Feature (8×2) */}
                    <ArtifactCard
                        artifact={getArtifact(0) || getFallbackArtifacts()[0]}
                        hoverEffect={hoverEffect}
                        position={1}
                    />

                    {/* Position 2: Tactical Slim (4×1) */}
                    <ArtifactCard
                        artifact={getArtifact(1) || getFallbackArtifacts()[1]}
                        hoverEffect={hoverEffect}
                        position={2}
                    />

                    {/* Position 3: Vertical Tech (4×2) */}
                    <ArtifactCard
                        artifact={getArtifact(2) || getFallbackArtifacts()[2]}
                        hoverEffect={hoverEffect}
                        position={3}
                        isMobileFrame={true}
                    />

                    {/* Position 4: Horizontal Mid (5×1) */}
                    <ArtifactCard
                        artifact={getArtifact(3) || getFallbackArtifacts()[3]}
                        hoverEffect={hoverEffect}
                        position={4}
                    />

                    {/* Position 5: Square Accent (3×1) */}
                    <ArtifactCard
                        artifact={getArtifact(4) || getFallbackArtifacts()[4]}
                        hoverEffect={hoverEffect}
                        position={5}
                    />

                    {/* Position 6: Wide Banner (8×1) */}
                    <ArtifactCard
                        artifact={getArtifact(5) || getFallbackArtifacts()[5]}
                        hoverEffect={hoverEffect}
                        position={6}
                    />

                    {/* Position 7: Identity Block (4×2) */}
                    <ArtifactCard
                        artifact={getArtifact(6) || getFallbackArtifacts()[6]}
                        hoverEffect={hoverEffect}
                        position={7}
                    />

                    {/* Position 8: Dark Accent (3×1) */}
                    <ArtifactCard
                        artifact={getArtifact(7) || getFallbackArtifacts()[7]}
                        hoverEffect={hoverEffect}
                        position={8}
                    />

                    {/* Position 9: Slim Footer Item (5×1) */}
                    <ArtifactCard
                        artifact={getArtifact(8) || getFallbackArtifacts()[8]}
                        hoverEffect={hoverEffect}
                        position={9}
                    />
                </div>
            </div>
        </section>
    );
};

interface ArtifactCardProps {
    artifact: Artifact;
    hoverEffect: {
        enabled: boolean;
        scale: number;
    };
    position: number;
    isMobileFrame?: boolean;
}

const ArtifactCard = ({ artifact, hoverEffect, position, isMobileFrame = false }: ArtifactCardProps) => {
    const { image, design, link, isEmpty, title, description } = artifact;
    const [isHovering, setIsHovering] = useState(false);
    const router = useRouter();
    // Get fixed position classes based on position number
    const getPositionClasses = (pos: number) => {
        const positions: Record<number, { colSpan: string, rowSpan: string, minHeight: string }> = {
            1: { colSpan: 'md:col-span-8', rowSpan: 'md:row-span-2', minHeight: 'min-h-[400px]' },
            2: { colSpan: 'md:col-span-4', rowSpan: 'md:row-span-1', minHeight: 'min-h-[250px]' },
            3: { colSpan: 'md:col-span-4', rowSpan: 'md:row-span-2', minHeight: 'min-h-[500px]' },
            4: { colSpan: 'md:col-span-5', rowSpan: 'md:row-span-1', minHeight: 'min-h-[250px]' },
            5: { colSpan: 'md:col-span-3', rowSpan: 'md:row-span-1', minHeight: 'min-h-[250px]' },
            6: { colSpan: 'md:col-span-8', rowSpan: 'md:row-span-1', minHeight: 'min-h-[250px]' },
            7: { colSpan: 'md:col-span-4', rowSpan: 'md:row-span-2', minHeight: 'min-h-[400px]' },
            8: { colSpan: 'md:col-span-3', rowSpan: 'md:row-span-1', minHeight: 'min-h-[250px]' },
            9: { colSpan: 'md:col-span-5', rowSpan: 'md:row-span-1', minHeight: 'min-h-[250px]' },
        };

        return positions[pos] || { colSpan: 'md:col-span-4', rowSpan: 'md:row-span-1', minHeight: 'min-h-[250px]' };
    };

    const positionClasses = getPositionClasses(position);


    if (isEmpty) {
        return (
            <motion.div
                whileHover={hoverEffect?.enabled ? { scale: hoverEffect.scale } : {}}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => { if (link.url) router.push(link.url) }}
                className={`relative overflow-hidden cursor-pointer ${positionClasses.colSpan} ${positionClasses.rowSpan} ${positionClasses.minHeight} ${design.customClass || ''} flex items-center justify-center`}
                style={{
                    backgroundColor: design.backgroundColor,
                    color: design.textColor
                }}
            >
                <div className="text-center p-8">
                    <div className="text-4xl opacity-30 mb-2">+</div>
                    <p className="text-sm opacity-50">Position {position}</p>
                    <p className="text-xs opacity-40 mt-1">Add content in admin</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            whileHover={hoverEffect?.enabled ? { scale: hoverEffect.scale } : {}}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`relative overflow-hidden ${positionClasses.colSpan} ${positionClasses.rowSpan} ${positionClasses.minHeight} ${design.customClass || ''}`}
            style={{
                backgroundColor: design.backgroundColor,
                color: design.textColor
            }}
        >
            {isMobileFrame && position === 3 ? (
                // Special mobile frame for position 3
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-3/4 aspect-[9/19] bg-black rounded-[2rem] border-4 border-black overflow-hidden rotate-3">
                        {image.url && (
                            <Image
                                src={image.url}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                quality={85}
                                loading="lazy"
                            />
                        )}
                    </div>
                </div>
            ) : image.url ? (
                <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className={getImageClass(position)}
                    sizes={getImageSizes(position)}
                    quality={85}
                    loading={position <= 2 ? "eager" : "lazy"}
                    priority={position <= 2}
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-4xl opacity-20">📷</div>
                        <p className="text-sm opacity-50 mt-2">{title}</p>
                    </div>
                </div>
            )}

            {link.url && link.text && (
                <div className={`absolute bottom-6 left-6 z-20 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                    <Link
                        href={link.url}
                        className="bg-black text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                    >
                        {link.text}
                    </Link>
                </div>
            )}

            {/* Optional overlay */}
            <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
        </motion.div>
    );
};

// Helper functions for image classes based on position
const getImageClass = (position: number) => {
    if (position === 1) return 'object-contain p-0';
    if (position === 2 || position === 6 || position === 8) return 'object-cover opacity-80';
    if (position === 7) return 'object-contain p-16';
    return 'object-cover';
};

const getImageSizes = (position: number) => {
    if (position === 1 || position === 6) return '(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw';
    if (position === 4 || position === 9) return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 41vw';
    if (position === 7) return '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw';
    return '(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw';
};