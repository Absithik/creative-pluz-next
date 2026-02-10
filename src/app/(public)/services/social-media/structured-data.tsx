import { COMPANY_DETAILS, SITE_URL } from '@/lib/taxonomy';

export const SocialMediaStructuredData = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            // Service Page
            {
                "@type": "Service",
                "@id": `${SITE_URL}/services/social-media#service`,
                "name": "Social Media Marketing & Design",
                "description": "High-impact social media design and marketing services. We create scroll-stopping content for Instagram, Facebook, and LinkedIn in Salem, Tamil Nadu.",
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
                    "name": "Social Media Services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Social Media Content Creation"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Instagram Reels Production"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Social Media Management"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Paid Ad Campaigns"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Influencer Marketing Strategy"
                            }
                        }
                    ]
                },
                "serviceType": "SocialMediaMarketing",
                "serviceOutput": "DigitalContent"
            },
            // Breadcrumb
            {
                "@type": "BreadcrumbList",
                "@id": `${SITE_URL}/services/social-media#breadcrumb`,
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
                        "name": "Social Media",
                        "item": `${SITE_URL}/services/social-media`
                    }
                ]
            },
            // FAQPage
            {
                "@type": "FAQPage",
                "@id": `${SITE_URL}/services/social-media#faqpage`,
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What platforms do you manage?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We specialize in Instagram, Facebook, LinkedIn, YouTube, and X (formerly Twitter). Our strategies are tailored to the unique audience and algorithm of each platform."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do you create video content?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, we have a dedicated team for short-form video production (Reels, Shorts) and long-form content. We handle scripting, shooting, and editing."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How do you measure success?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We track key performance indicators (KPIs) such as engagement rate, reach, follower growth, website clicks, and conversion ROI. We provide detailed monthly reports."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can you help with paid advertising?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Absolutely. We design and manage high-converting ad campaigns on Meta (Facebook/Instagram) and LinkedIn to target your specific ideal customer profile."
                        }
                    }
                ]
            },
            // Place for GEO Information
            {
                "@type": "Place",
                "@id": `${SITE_URL}/services/social-media#place`,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": COMPANY_DETAILS.address.city,
                    "addressRegion": COMPANY_DETAILS.address.state,
                    "addressCountry": COMPANY_DETAILS.address.country
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": COMPANY_DETAILS.coordinates.latitude,
                    "longitude": COMPANY_DETAILS.coordinates.longitude
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
