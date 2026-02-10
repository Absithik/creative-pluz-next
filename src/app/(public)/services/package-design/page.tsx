import React from 'react';
import type { Metadata } from 'next';
import Hero from './hero';
import ThreeDScroll from './three-d-scroll';
import Surface from './surface';
import CallToAction from './call-to-action';
import InvestmentGallery from './Gallery';
import { SITE_URL } from '@/lib/taxonomy';
import { PackageDesignStructuredData } from './structured-data';

export const metadata: Metadata = {
    title: {
        absolute: "Packaging Design Agency Salem | Custom Box & Label Engineering",
        template: "%s | Creative Pluz"
    },
    description: 'Elevate your products with Creative Pluz. We engineer custom packaging solutions, luxury boxes, and sustainable labels that drive sales in Salem & Tamil Nadu.',
    keywords: [
        'packaging design salem',
        'product packaging',
        'custom box design',
        'package engineering',
        'luxury packaging',
        'sustainable packaging',
        'label design',
        'tactile packaging',
        'creative pluz packaging'
    ],
    metadataBase: new URL(SITE_URL),
    openGraph: {
        title: 'Packaging Design Agency Salem | Custom Box & Label Engineering',
        description: 'Premium product packaging design services. We engineer custom boxes, labels, and structural packaging that drives sales.',
        url: `${SITE_URL}/services/package-design`,
        siteName: 'Creative Pluz',
        locale: 'en_IN',
        type: 'website',
        images: [
            {
                url: "/assets/images/services/package-design/og-image.jpg", // Ensure path correctness
                width: 1200,
                height: 630,
                alt: "Creative Pluz Package Design",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: 'Packaging Design Agency Salem | Custom Box & Label Engineering',
        description: 'Premium product packaging design services in Salem.',
        creator: "@creativepluz",
        images: ["/assets/images/services/package-design/og-image.jpg"],
    },
    alternates: {
        canonical: '/services/package-design',
    },
    other: {
        "geo.region": "IN-TN",
        "geo.placename": "Salem",
        "geo.position": "11.6643;78.1460",
        "ICBM": "11.6643, 78.1460"
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

const PackageDesign = () => {
    return (
        <>
            <PackageDesignStructuredData />
            <Hero />
            <ThreeDScroll />
            {/* <BentoGrid /> */}
            <InvestmentGallery />
            <Surface />
            <CallToAction />
        </>
    );
};

export default PackageDesign;