import { Metadata } from 'next';
import Hero from './Hero';
import Services from './Services';
import Interactive from './Interactive';
import FeaturesWhyUs from './FeaturesWhyUs';
import CallToAction from './CallToAction';
import BentoGrid from './Gallery/BentoGrid';

import dynamic from 'next/dynamic';

const DomeGallery = dynamic(() => import('./DomeGallery/DomeGallery'));
const VisitingCardShowcase = dynamic(() => import('./visitingCard'));

import { SITE_URL } from '@/lib/taxonomy';

export const metadata: Metadata = {
    title: {
        absolute: "Branding Agency in Salem | Logo Design & Creative Strategy",
        template: "%s | Creative Pluz"
    },
    description: "Elevate your brand with Creative Pluz. We specialize in strategic branding, custom logo design, visual identity systems, and corporate rebranding services in Salem & Tamil Nadu.",
    keywords: [
        "branding agency salem",
        "logo design company",
        "corporate identity design",
        "visual branding services",
        "rebranding agency",
        "creative agency tamil nadu",
        "brand strategy consultant",
        "graphic design studio"
    ],
    applicationName: "Creative Pluz",
    authors: [{ name: "Creative Pluz Team", url: SITE_URL }],
    metadataBase: new URL(SITE_URL),
    alternates: {
        canonical: "/services/branding",
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
    openGraph: {
        title: "Branding Agency in Salem | Logo Design & Creative Strategy",
        description: "Transform your business identity with Creative Pluz. Comprehensive branding solutions including logo design, visual systems, and brand guidelines.",
        url: `${SITE_URL}/services/branding`,
        siteName: "Creative Pluz",
        locale: "en_IN",
        type: "website",
        images: [
            {
                url: "/assets/images/services/branding/og-image.jpg", // Ensure this image path is correct or generic
                width: 1200,
                height: 630,
                alt: "Creative Pluz Branding Services",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Branding Agency in Salem | Logo Design & Creative Strategy",
        description: "Expert branding services in Salem. Logo design, identity systems, and creative strategy.",
        creator: "@creativepluz",
        images: ["/assets/images/services/branding/og-image.jpg"],
    },
};

import { BrandingStructuredData } from './structured-data';

export default function HomePage() {
    return (
        <>
            <BrandingStructuredData />

            <Hero />
            <Services />
            <VisitingCardShowcase />
            <Interactive />

            <section className="py-24 relative overflow-hidden bg-black">
                <div className="px-6 md:px-12 mb-16 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 block">Immersive Index</span>
                        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter font-heading text-white uppercase">Vault 02</h2>
                    </div>
                    <p className="text-slate-500 max-w-xs text-sm leading-relaxed mb-2">
                        Interact with our brand universe through this three-dimensional artifact repository.
                    </p>
                </div>

                <div className="relative h-[80vh] w-full select-none cursor-grab active:cursor-grabbing">
                    <DomeGallery
                        fit={0.8}
                        minRadius={600}
                        maxVerticalRotationDeg={0}
                        segments={34}
                        dragDampening={2}
                        grayscale
                    />
                </div>
            </section>
            <FeaturesWhyUs />
            <CallToAction />
        </>
    );
}