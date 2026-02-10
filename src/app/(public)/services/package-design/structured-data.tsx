import { COMPANY_DETAILS, SITE_URL } from '@/lib/taxonomy';

export const PackageDesignStructuredData = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            // Service Page
            {
                "@type": "Service",
                "@id": `${SITE_URL}/services/package-design#service`,
                "name": "Product Package Design & Engineering",
                "description": "Premium packaging design agency specializing in structural engineering, luxury finishes (Metallic Foil, Spot UV), and sustainable materials in Salem, Tamil Nadu.",
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
                    "name": "Package Design Services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Structural Packaging Design"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Luxury Label Design"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Custom Box Engineering"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Tactile Finish Specifications"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Sustainable Packaging Solutions"
                            }
                        }
                    ]
                },
                "serviceType": "PackageDesign",
                "serviceOutput": "ProductPackaging"
            },
            // Breadcrumb
            {
                "@type": "BreadcrumbList",
                "@id": `${SITE_URL}/services/package-design#breadcrumb`,
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
                        "name": "Package Design",
                        "item": `${SITE_URL}/services/package-design`
                    }
                ]
            },
            // FAQPage
            {
                "@type": "FAQPage",
                "@id": `${SITE_URL}/services/package-design#faqpage`,
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is included in your package design service?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Our services include structural engineering (dielines), graphic design, material selection (kraft, metallic, etc.), and print production management tailored for luxury and retail impact."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do you offer sustainable packaging options?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, we specialize in sustainable materials including 350GSM Kraft and other eco-friendly finishes without compromising on luxury aesthetics."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can you help with manufacturing and printing?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We provide print-ready structural files (dielines) and work closely with printers to ensure 0.05mm tolerance accuracy and correct application of finishes like Spot UV and Foil Stamping."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What industries do you serve for packaging?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We serve a wide range of industries including FMCG, cosmetics, electronics, food & beverage, and luxury retail brands."
                        }
                    }
                ]
            },
            // Place for GEO Information
            {
                "@type": "Place",
                "@id": `${SITE_URL}/services/package-design#place`,
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
