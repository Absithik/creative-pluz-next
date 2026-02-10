import { COMPANY_DETAILS, SITE_URL } from '@/lib/taxonomy';

export const BrandingStructuredData = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            // Service Page
            {
                "@type": "Service",
                "@id": `${SITE_URL}/services/branding#service`,
                "name": "Branding & Identity Design",
                "description": "Comprehensive branding services including logo design, visual identity systems, brand strategy, and corporate stationery design in Salem, Tamil Nadu.",
                "provider": {
                    "@type": "LocalBusiness",
                    "@id": `${SITE_URL}/#localbusiness`
                },
                "areaServed": {
                    "@type": "AdministrativeArea",
                    "name": "Tamil Nadu, India"
                },
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Branding Services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Custom Logo Design"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Visual Identity Systems"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Brand Strategy & Positioning"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Corporate Stationery Design"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Rebranding Services"
                            }
                        }
                    ]
                },
                "serviceType": "Branding",
                "serviceOutput": "BrandIdentity"
            },
            // Breadcrumb
            {
                "@type": "BreadcrumbList",
                "@id": `${SITE_URL}/services/branding#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": SITE_URL
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Services",
                        "item": `${SITE_URL}/services`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Branding",
                        "item": `${SITE_URL}/services/branding`
                    }
                ]
            },
            // FAQPage
            {
                "@type": "FAQPage",
                "@id": `${SITE_URL}/services/branding#faqpage`,
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is included in your branding package?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Our branding packages typically include custom logo design, color palette selection, typography guidelines, and a brand style guide. We also offer extended packages with business cards, letterheads, and social media kits."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How long does the branding process take?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "A complete branding project usually takes 2-4 weeks. This includes initial research, concept development, revisions, and final delivery of all assets and guidelines."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do you offer logo redesign services?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, we specialize in rebranding and logo refreshments. We help modernize existing brands while maintaining their core recognition and values."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What file formats will I receive?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "You will receive your logo and assets in all necessary formats including AI (vector), EPS, PDF, PNG (transparent background), and JPG for both print and digital use."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Why is a brand style guide important?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "A brand style guide ensures consistency across all your marketing materials. It provides rules for logo usage, colors, and fonts, helping you maintain a professional and cohesive brand image."
                        }
                    }
                ]
            },
            // Place for GEO Information
            {
                "@type": "Place",
                "@id": `${SITE_URL}/services/branding#place`,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": COMPANY_DETAILS.address.city,
                    "addressRegion": COMPANY_DETAILS.address.state,
                    "addressCountry": COMPANY_DETAILS.address.country
                }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData)
            }}
        />
    );
};
