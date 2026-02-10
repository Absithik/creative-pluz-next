import { COMPANY_DETAILS, SITE_URL, LOCATION } from '@/lib/taxonomy';

export const BrochureStructuredData = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            // Service Page
            {
                "@type": "Service",
                "@id": `${SITE_URL}/services/brochure-design-printing#service`,
                "name": "Brochure Design & Printing",
                "description": "Professional brochure, flyer, and catalog design with high-quality printing services in Salem, Tamil Nadu",
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
                    "name": "Brochure Printing Services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Brochure Design"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Flyer Printing"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Catalog Design"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Print Advertising"
                            }
                        }
                    ]
                },
                "serviceType": "PrintDesign",
                "serviceOutput": "PrintedMarketingMaterials"
            },
            // Breadcrumb
            {
                "@type": "BreadcrumbList",
                "@id": `${SITE_URL}/services/brochure-design-printing#breadcrumb`,
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
                        "name": "Brochure Design & Printing",
                        "item": `${SITE_URL}/services/brochure-design-printing`
                    }
                ]
            },
            // FAQPage
            {
                "@type": "FAQPage",
                "@id": `${SITE_URL}/services/brochure-design-printing#faqpage`,
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "How much does brochure printing cost in Salem?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Brochure printing costs vary based on size, paper quality, quantity, and finishing options. We offer competitive pricing starting from ₹5 per piece for basic A4 brochures."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is the best paper for brochures?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We recommend 200-300 GSM art paper for premium brochures, 130-170 GSM coated paper for standard brochures, and recycled paper for eco-friendly options."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How long does brochure printing take in Salem?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Standard turnaround is 3-5 business days for digital printing and 7-10 days for offset printing. Rush services are available for urgent projects."
                        }
                    }
                ]
            },
            // Geo Information
            {
                "@type": "Place",
                "@id": `${SITE_URL}/services/brochure-design-printing#place`,
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