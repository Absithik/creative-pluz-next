import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/taxonomy';
import { SocialMediaStructuredData } from './structured-data';
import SocialMediaContent from './content';

export const metadata: Metadata = {
    title: {
        absolute: "Social Media Marketing Agency Salem | Content Creation & Strategy",
        template: "%s | Creative Pluz"
    },
    description: "Dominate the feed with Creative Pluz. We create scroll-stopping social media content, Instagram Reels, and high-conversion marketing strategies in Salem.",
    keywords: [
        "social media marketing salem",
        "instagram marketing agency",
        "content creation services",
        "social media management",
        "paid ad campaigns",
        "influencer marketing",
        "video production salem",
        "creative pluz social media"
    ],
    metadataBase: new URL(SITE_URL),
    openGraph: {
        title: "Social Media Marketing Agency Salem | Content Creation & Strategy",
        description: "Dominate the feed with Creative Pluz. We create scroll-stopping social media content, Instagram Reels, and high-conversion marketing strategies in Salem.",
        url: `${SITE_URL}/services/social-media`,
        siteName: "Creative Pluz",
        locale: "en_IN",
        type: "website",
        images: [
            {
                url: "/assets/images/services/social-media/og-image.jpg", // Ensure path correctness
                width: 1200,
                height: 630,
                alt: "Creative Pluz Social Media Services",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Social Media Marketing Agency Salem | Content Creation & Strategy",
        description: "Dominate the feed with Creative Pluz. We create scroll-stopping social media content, Instagram Reels, and high-conversion marketing strategies in Salem.",
        creator: "@creativepluz",
        images: ["/assets/images/services/social-media/og-image.jpg"],
    },
    alternates: {
        canonical: "/services/social-media",
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

const SocialMediaPage = () => {
    return (
        <>
            <SocialMediaStructuredData />
            <SocialMediaContent />
        </>
    );
};

export default SocialMediaPage;