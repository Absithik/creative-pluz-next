// app/services/web-development/page.tsx
import type { Metadata } from 'next';
import { COMPANY_DETAILS, SERVICE_TAXONOMY, LOCATION, GEO_KEYWORDS } from '@/lib/taxonomy';
import { StructuredData } from '@/app/structured-data';
import CallToAction from '../branding/CallToAction';
import HeroSection from './hero/HeroSection';
import WebDevelopmentProcess from './process/WebDevelopmentProcess';
import PopularServices from './project-section';
import FAQSection from './components/FAQSection.server';
import ServiceCoverage from './components/ServiceCoverage.server';
import TrustSignals from './components/TrustSignals.server';
import { WebDevelopmentStructuredData } from './structured-data';

// Optimized keywords (max 10-12 high-intent)
const PRIMARY_KEYWORDS = [
    'web development company salem',
    'website development tamil nadu',
    'seo friendly website salem',
    'next js development india',
    'responsive web design',
    'ecommerce website development',
    'custom web application',
    ...GEO_KEYWORDS.slice(0, 5) // Only first 5 GEO keywords
];

// AEO: Improved FAQ with neutral, timeless answers
const FAQ_DATA = [
    {
        question: "What is the typical timeline for web development projects?",
        answer: "Web development projects typically take 2-6 weeks depending on scope and complexity. Basic business websites (5-10 pages) require 2-3 weeks, while e-commerce platforms with payment integration typically need 4-6 weeks for full functionality and testing."
    },
    {
        question: "Do you provide website maintenance after launch?",
        answer: "Yes, we offer ongoing website maintenance services including security updates, performance optimization, content updates, and technical support. Maintenance plans are available with flexible options to suit different business needs."
    },
    {
        question: "What technologies do you use for web development?",
        answer: "We use modern web technologies including Next.js for server-side rendering, React for interactive interfaces, TypeScript for type safety, and headless CMS solutions. All websites are built with mobile-first responsive design principles."
    },
    {
        question: "How do you ensure websites are mobile-friendly?",
        answer: "All our websites follow mobile-first responsive design principles. We test across multiple device sizes, implement touch-friendly interfaces (minimum 44px touch targets), and ensure compliance with Google's Core Web Vitals for optimal mobile performance."
    },
    {
        question: "Do you provide SEO with website development?",
        answer: "Yes, our web development process includes comprehensive SEO implementation: technical SEO setup, mobile optimization, schema markup, XML sitemap generation, and Core Web Vitals optimization for better search engine visibility."
    }
];

// GEO: Service coverage areas
const SERVICE_AREAS = [
    'Salem', 'Coimbatore', 'Chennai', 'Bangalore',
    'Erode', 'Namakkal', 'Dharmapuri', 'Trichy',
    'Kerala', 'Karnataka', 'Andhra Pradesh', 'All India'
];

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://creativepluz.com';

    return {
        title: `Web Development Company in ${LOCATION} | Creative Pluz`,
        description: `Top web development company in ${LOCATION} delivering fast, SEO-friendly websites using Next.js, React, and modern technologies.`,

        // Remove keywords array - Google ignores it anyway
        // keywords: PRIMARY_KEYWORDS, 

        openGraph: {
            title: `Web Development Company ${LOCATION} | Creative Pluz`,
            description: 'Professional web development with mobile-first responsive design, SEO optimization, and fast performance.',
            type: 'website',
            locale: 'en_IN',
            siteName: COMPANY_DETAILS.name,
            url: `${baseUrl}/services/web-development`,
            images: [{
                url: '/assets/images/services/web-development-og.jpg',
                width: 1200,
                height: 630,
                alt: `${COMPANY_DETAILS.name} - Web Development Services`,
            }],
        },

        twitter: {
            card: 'summary_large_image',
            title: 'Web Development Company in Salem | Creative Pluz',
            description: 'Custom website development with Next.js, React, and SEO optimization',
            images: ['/assets/images/services/web-dev-twitter.jpg'],
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

        alternates: {
            canonical: `${baseUrl}/services/web-development`,
        },

        // GEO: Location-specific metadata
        metadataBase: new URL(baseUrl),
        authors: [{ name: COMPANY_DETAILS.name }],
        creator: COMPANY_DETAILS.name,
        publisher: COMPANY_DETAILS.name,

        // Verification should be in layout, not here
        // verification: {
        //   google: process.env.GOOGLE_VERIFICATION,
        // },
    };
}

export default function WebDevelopmentPage() {

    return (
        <>
            {/* AIO: Machine-readable structured data */}
            <WebDevelopmentStructuredData />

            {/* Reduced SR-ONLY content */}
            <section aria-labelledby="web-dev-services" className="sr-only">
                <h2 id="web-dev-services">Web Development Services in {LOCATION}</h2>
                <p>
                    Creative Pluz is a professional web development company in Salem, Tamil Nadu offering custom website development,
                    e-commerce solutions, responsive web design, and SEO optimization services.
                </p>
            </section>

            {/* Main visible components */}
            <HeroSection />
            {/* Trust Signals for AI/GEO */}
            <TrustSignals />
            <PopularServices />


            <WebDevelopmentProcess />


            <CallToAction />
            {/* AEO: FAQ Section */}
            <FAQSection faqs={FAQ_DATA} />
        </>
    );
}