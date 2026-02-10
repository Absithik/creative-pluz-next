import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { SITE_URL } from '@/lib/taxonomy';
import StructuredData from '@/components/StructuredData';
import Hero from './Hero';
import Services from './Services';
import CTA from './CTA';
import CardSwap, { Card } from './CardSwap/CardSwap';
import Showcase from './Showcase copy';
import Services1 from './Services1';
import FeaturedWork from './FeaturedWork';
import LifestyleSection from './Lifestyle';

export const metadata: Metadata = {
    title: 'Flex Banner Designs | Creative Pluz',
    description: 'High-impact flex banners, outdoor hoardings, and event backdrop designs. Dominate the physical space with grand-scale visibility.',
    keywords: ['Flex Banner Design', 'Outdoor Advertising', 'Hoardings', 'Event Backdrops', 'Large Format Printing', 'Creative Pluz'],
    alternates: {
        canonical: `${SITE_URL}/services/flex-banner`,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: 'Flex Banner Designs | Creative Pluz',
        description: 'High-impact flex banners, outdoor hoardings, and event backdrop designs.',
        url: `${SITE_URL}/services/flex-banner`,
        type: 'website',
        images: [
            {
                url: '/assets/images/service/BANNERS/C_PLUS 970 x 600_001.png',
                width: 1200,
                height: 630,
                alt: 'Flex Banner Designs - Creative Pluz',
            }
        ]
    }
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Flex Banner & Outdoor Design",
    "provider": {
        "@type": "Organization",
        "name": "Creative Pluz"
    },
    "description": "Professional design services for flex banners, hoardings, standees, and large-scale outdoor advertising.",
    "areaServed": "Global",
    "serviceType": "Graphic Design",
    "offers": {
        "@type": "Offer",
        "priceCurrency": "USD", // Change to appropriate currency
        "availability": "https://schema.org/InStock"
    }
};

const FlexBannerPage = () => {
    return (
        <>
            <StructuredData data={serviceSchema} />
            <main>
                <Hero />
                <Services />
                {/* <FeaturedWork /> */}
                <LifestyleSection />
                <Showcase />

                {/* <Showcase /> */}
                <section className="py-24 mx-12 bg-[#0a0a0a] text-white overflow-hidden border-t border-white/5">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                            {/* Left Content Column */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-sm uppercase tracking-[0.2em] text-brand-primary font-semibold">Our Flex & Banner Solutions</h2>
                                    <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                                        High-Impact Visuals for <span className="text-brand-primary">Every Environment.</span>
                                    </h3>
                                </div>

                                <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                                    We specialize in ultra-high-definition flex printing and custom banner designs that command attention.
                                    Whether it's massive outdoor hoardings or sleek indoor corporate displays, our solutions
                                    are built for maximum durability and color precision.
                                </p>

                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        'Outdoor Hoardings',
                                        'Corporate Standees',
                                        'Exhibition Backdrops',
                                        'Vinyl Wall Graphics',
                                        'Workspace Branding',
                                        'Event Signage'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center space-x-3 text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-4">
                                    <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-brand-primary hover:text-white transition-all duration-300">
                                        Discuss Your Project
                                    </button>
                                </div>
                            </div>

                            {/* Right CardSwap Column 
                FIX: Changed justify-end to justify-center to prevent clipping. 
                Added pr-0 to reset any potential padding.
            */}
                            <div className="relative h-[500px] lg:h-[600px] w-full flex items-center justify-center">
                                <CardSwap
                                    width="500px"
                                    height={350}
                                    cardDistance={50}
                                    verticalDistance={60}
                                    delay={4000}
                                    pauseOnHover={true}
                                >
                                    {[
                                        {
                                            title: 'Large Format Hoardings',
                                            description: 'Maximize your brand visibility with our high-durability outdoor flex banners.',
                                            image: '/assets/images/service/BANNERS/18.jpeg',
                                            case: '01'
                                        },
                                        {
                                            title: 'Exhibition Backdrops',
                                            description: 'Professional high-definition prints for trade shows and corporate events.',
                                            image: '/assets/images/service/BANNERS/19.jpeg',
                                            case: '02'
                                        },
                                        {
                                            title: 'Workspace Branding',
                                            description: 'Custom vinyl graphics and display solutions for modern offices.',
                                            image: '/assets/images/service/BANNERS/20.jpeg',
                                            case: '03'
                                        }
                                    ].map((item, i) => (
                                        <Card key={i} className="group overflow-hidden">
                                            <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black p-0.5">
                                                {/* Image Layer */}
                                                <div className="absolute inset-0 transition-opacity duration-500">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, 500px"
                                                    />
                                                </div>

                                                {/* Overlay Gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

                                                {/* Content Layer */}
                                                <div className="relative w-full h-full p-8 flex flex-col justify-end z-20">
                                                    <div className="space-y-2 translate-z-20">
                                                        <span className="text-brand-primary text-xs font-mono">CASE {item.case}</span>
                                                        <h4 className="text-xl font-bold">{item.title}</h4>
                                                        <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </CardSwap>
                            </div>
                        </div>
                    </div>
                </section>
                <CTA />
            </main>
        </>
    );
};

export default FlexBannerPage;