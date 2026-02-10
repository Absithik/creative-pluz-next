import React from 'react';
import type { Metadata } from 'next';
import { COMPANY_DETAILS, LOCATION, GEO_KEYWORDS } from '@/lib/taxonomy';
import ContactClient from './ContactClient';
import { ContactStructuredData } from './structured-data';
import FAQSection from './components/FAQSection.client';
import TrustSignals from './components/TrustSignals.server';

// 1. AEO: Improved FAQ with conversational, direct answers
const FAQ_DATA = [
    {
        question: "How can I contact Creative Pluz in Salem?",
        answer: "You can reach Creative Pluz by phone at +91 93630 24021, email at creativepluzsalem@gmail.com, or visit our office at #7/2, 1st Floor, S.S. Plaza, Advaitha Ashram Rd, Salem, Tamil Nadu via appointment."
    },
    {
        question: "Do you offer free consultations for web development?",
        answer: "Yes, we provide free initial consultations and project estimates. Our team analyzes your business requirements to propose the best digital solutions, whether for branding, web development, or marketing."
    },
    {
        question: "What is your typical response time?",
        answer: "Our team typically responds to all inquiries within 24 business hours. For urgent support regarding existing projects, our support lines are open 24/7."
    },
    {
        question: "Do you serve clients outside of Salem?",
        answer: "Absolutely. While we are a top web development company in Salem, we serve clients across Tamil Nadu (Coimbatore, Chennai, Erode) and globally, utilizing remote collaboration tools for seamless project delivery."
    },
    {
        question: "What services can I request a quote for?",
        answer: "You can request quotes for all our services including Custom Web Development, E-commerce Solutions, Logo & Branding, Social Media Marketing, and SEO Services."
    }
];

// 2. SEO & GEO Keyword strategy
const PRIMARY_KEYWORDS = [
    'contact creative pluz',
    'web development company salem address',
    'digital marketing agency salem contact',
    'web design studio tamil nadu',
    'creative agency consultation',
    ...GEO_KEYWORDS.slice(0, 5)
];

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://creativepluz.com';

    return {
        title: `Contact Creative Pluz | Designing & Branding in ${LOCATION}`,
        description: `Get in touch with Creative Pluz in ${LOCATION}. Call +91 93630 24021 for premium web development, SEO, and branding services. Free consultation available.`,

        // keywords: PRIMARY_KEYWORDS, // Google ignores, but good for reference

        openGraph: {
            title: `Contact Creative Pluz | Let's Build Your Brand in ${LOCATION}`,
            description: 'Ready to transform your digital presence? Contact Creative Pluz for expert web development and branding solutions.',
            type: 'website',
            locale: 'en_IN',
            siteName: COMPANY_DETAILS.name,
            url: `${baseUrl}/contact`,
            images: [{
                url: '/assets/images/contact-og.jpg', // Ensure this asset exists or use generic
                width: 1200,
                height: 630,
                alt: `Contact ${COMPANY_DETAILS.name} - Salem`,
            }],
        },

        twitter: {
            card: 'summary_large_image',
            title: 'Contact Creative Pluz | #1 Web Agency in Salem',
            description: 'Need a website or branding? Contact our expert team in Salem today.',
            images: ['/assets/images/contact-twitter.jpg'],
        },

        robots: {
            index: true,
            follow: true,
        },

        alternates: {
            canonical: `${baseUrl}/contact`,
        },

        metadataBase: new URL(baseUrl),
        authors: [{ name: COMPANY_DETAILS.name }],
    };
}

export default function ContactPage() {
    return (
        <>
            {/* AIO: Machine-readable structured data */}
            <ContactStructuredData />

            {/* Reduced SR-ONLY content for Accessibility/SEO */}
            <section aria-labelledby="contact-heading" className="sr-only">
                <h1 id="contact-heading">Contact Creative Pluz - Web Development Agency in {LOCATION}</h1>
                <p>
                    Visit our office in Salem or contact us for custom web design, SEO, and digital marketing services.
                    Serving Salem, Coimbatore, Chennai, and global clients.
                </p>
            </section>

            {/* Main Interactive Client Component */}
            <ContactClient />

            {/* Trust Signals for GEO/Authority */}
            <TrustSignals />

            {/* AEO: FAQ Section */}
            <FAQSection faqs={FAQ_DATA} />
        </>
    );
}