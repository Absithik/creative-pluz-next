import { Metadata } from 'next';
import { COMPANY_DETAILS, SERVICE_TAXONOMY, LOCATION, GEO_KEYWORDS, SITE_URL } from '@/lib/taxonomy';
import { StructuredData } from '@/app/structured-data';
import { Hero } from '@/components/home/Hero.client';
import { Marquee } from '@/components/home/Marquee.client';
import { ArtifactWall } from '@/components/home/ArtifactWall';
import { Introduction } from '@/components/home/Introduction.server';
import { Expertise } from '@/components/home/Expertise.server';
import { LogoLedger } from '@/components/home/LogoLedger.client';
import { FooterCTA } from '@/components/home/FooterCTA.server';
import Testimonials from '@/components/home/Testimonial';
import ServicesScroll from '../components/ServicesScroll';
import HeroSection from '../components/HeroSection';

const PRIMARY_SERVICES = [
    SERVICE_TAXONOMY.branding.name,
    SERVICE_TAXONOMY.packaging.name,
    SERVICE_TAXONOMY.socialMedia.name,
    SERVICE_TAXONOMY.marketing.name,
    SERVICE_TAXONOMY.printAdvertising.name,
    SERVICE_TAXONOMY.webDevelopment.name
];

export const metadata: Metadata = {
    // ... (metadata config remains same)
    title: `${COMPANY_DETAILS.name} | Branding, Packaging & Web Design Salem`,
    description: `Creative Pluz is a full-service creative agency in ${LOCATION} offering Logo & Branding, Product Package Designing, Social Media Posts, Marketing Collateral & Banner Designs, Brochure & Print Advertising, and Web Development services.`,
    alternates: {
        canonical: SITE_URL,
    },
    keywords: [
        'creative agency salem',
        'branding agency tamil nadu',
        'logo design salem',
        'web development salem',
        'packaging design company',
        ...GEO_KEYWORDS
    ],
    openGraph: {
        title: `${COMPANY_DETAILS.name} | Creative Agency ${LOCATION}`,
        description: 'Transform your brand with professional design, packaging, and web development services',
        type: 'website',
        locale: 'en_IN',
        siteName: COMPANY_DETAILS.name,
        images: [{
            url: '/assets/images/og-image.jpg',
            width: 1200,
            height: 630,
            alt: `${COMPANY_DETAILS.name} Creative Agency Services`,
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${COMPANY_DETAILS.name} | Creative Agency`,
        description: 'Professional branding, packaging, and web development services',
        images: ['/assets/images/twitter-image.jpg'],
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
    verification: {
        google: 'your-google-verification-code', // User to update
    },
};

async function getArtifactData() {
    // Use absolute URL or relative if using internal API helper
    // Ideally, import the database logic directly here instead of calling your own API
    // But for now, we simulate the data or call the API.

    try {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        // Parallel fetch for speed
        const [artifactsRes, configRes] = await Promise.all([
            fetch(`${baseUrl}/api/artifacts`, { next: { revalidate: 60 } }), // Cache for 60s
            fetch(`${baseUrl}/api/public/artifact-wall-config`, { next: { revalidate: 60 } })
        ]);

        const artifactsData = await artifactsRes.json();
        const configData = await configRes.json();

        return {
            artifacts: artifactsData.data || [],
            config: configData.data || {
                title: 'Selected',
                subtitle: 'Works.',
                archiveLink: '/portfolio',
                hoverEffect: { enabled: true, scale: 0.98 }
            }
        };
    } catch (error) {
        console.error("Failed to fetch artifacts", error);
        // Return fallbacks if fetch fails
        return { artifacts: [], config: { title: 'Selected', subtitle: 'Works.', archiveLink: '#', hoverEffect: { enabled: true, scale: 1 } } }
    }
}

export default function HomePage() {
    return (
        <>
            <StructuredData />
            <section aria-labelledby="ai-services" className="sr-only">
                <h2 id="ai-services">Creative Pluz Services</h2>
                <p className="text-slate-400 max-w-md text-lg md:text-xl font-medium leading-relaxed">
                    Creative Pluz is a <strong>full-service creative agency in Salem, Tamil Nadu</strong>
                    specializing in <strong>Logo & Branding, Product Package Designing, Social Media Posts,
                        Marketing Collateral & Banner Designs, Brochure & Print Advertising, and Web Development</strong>
                    for startups and growing businesses.
                </p>
            </section>

            {/* Client Islands Implementation */}
            <HeroSection />
            {/*  <Hero /> */}
            <Marquee />
            <ArtifactWall />
            <Introduction />
            <ServicesScroll />
            <Expertise />
            <LogoLedger />
            <FooterCTA />
            <Testimonials />
        </>
    );
}