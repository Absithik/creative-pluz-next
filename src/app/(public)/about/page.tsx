import React from 'react';
import type { Metadata } from 'next';
import { COMPANY_DETAILS, LOCATION, GEO_KEYWORDS, SITE_URL } from '@/lib/taxonomy';
import { AboutStructuredData } from './structured-data';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Story from './components/Story';
import Team from './components/Team';
import Stats from './components/Stats';
import CTA from './components/CTA';

export const metadata: Metadata = {
    title: 'About Creative Pluz | Branding & Design Agency Salem',
    description: `Leading creative agency in Salem since 2015. We specialize in branding, graphic design, and high-quality printing services for businesses.`,

    // Additional SEO Keywords
    keywords: [
        'creative agency salem',
        'graphic design company in salem',
        'printing services salem',
        'brochure design salem',
        'branding agency tamil nadu',
        ...GEO_KEYWORDS.slice(0, 5)
    ],

    alternates: {
        canonical: `${SITE_URL}/about`,
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
        title: 'About Creative Pluz | Branding & Design Agency Salem',
        description: 'From start-ups to established brands, we provide integrated design and printing strategies that drive results.',
        url: `${SITE_URL}/about`,
        type: 'website',
        locale: 'en_IN',
        siteName: COMPANY_DETAILS.name,
        // images: [{ url: '/assets/images/about-og.jpg', width: 1200, height: 630, alt: 'About Creative Pluz' }]
    },
};

export default function AboutPage() {
    return (
        <div className="bg-brand-dark overflow-x-hidden">
            {/* AIO: JSON-LD Structured Data */}
            <AboutStructuredData />

            {/* Semantic Header (Hidden/Visually Integrated via Hero) */}
            <h1 className="sr-only">Designing & Printing Salem's Success Stories Since 2015</h1>

            <Hero />

            <Manifesto />

            <Story />

            <Team />

            <Stats />

            <CTA />
        </div>
    );
}
