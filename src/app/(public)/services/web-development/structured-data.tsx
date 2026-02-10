// app/services/web-development/structured-data.ts
import { COMPANY_DETAILS, SITE_URL, LOCATION } from '@/lib/taxonomy';

export const WebDevelopmentStructuredData = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            // Service Page
            {
                "@type": "Service",
                "@id": `${SITE_URL}/services/web-development#service`,
                "name": "Web Development",
                "description": "Custom website development services including responsive design, e-commerce solutions, SEO optimization, and performance tuning in Salem, Tamil Nadu",
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
                    "name": "Web Development Services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Corporate Website Development"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "E-commerce Website Development"
                            }
                        },
                        {
                            "@type": "Offer",
                            itemOffered: {
                                "@type": "Service",
                                "name": "Web Application Development"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "SEO & Performance Optimization"
                            }
                        }
                    ]
                },
                "serviceType": "WebDevelopment",
                "serviceOutput": "Website"
            },
            // Breadcrumb
            {
                "@type": "BreadcrumbList",
                "@id": `${SITE_URL}/services/web-development#breadcrumb`,
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
                        "name": "Web Development",
                        "item": `${SITE_URL}/services/web-development`
                    }
                ]
            },
            // FAQPage
            {
                "@type": "FAQPage",
                "@id": `${SITE_URL}/services/web-development#faqpage`,
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is the typical timeline for web development projects?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Web development projects typically take 2-6 weeks depending on scope and complexity. Basic business websites (5-10 pages) require 2-3 weeks, while e-commerce platforms with payment integration typically need 4-6 weeks for full functionality and testing."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do you provide website maintenance after launch?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, we offer ongoing website maintenance services including security updates, performance optimization, content updates, and technical support. Maintenance plans are available with flexible options to suit different business needs."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What technologies do you use for web development?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We use modern web technologies including Next.js for server-side rendering, React for interactive interfaces, TypeScript for type safety, and headless CMS solutions. All websites are built with mobile-first responsive design principles."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How much does web development cost in Salem?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Web development costs vary based on features, complexity, and requirements. Basic business websites start from ₹25,000, while custom e-commerce solutions and web applications have different pricing tiers. Contact us for a detailed quote specific to your project."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do you offer SEO with website development?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, SEO optimization is included in all our web development projects. We implement technical SEO best practices, mobile optimization, fast loading speeds, and semantic HTML structure to ensure your website ranks well in search engines."
                        }
                    }
                ]
            },
            // Place for GEO Information
            {
                "@type": "Place",
                "@id": `${SITE_URL}/services/web-development#place`,
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
            type= "application/ld+json"
    dangerouslySetInnerHTML = {{
        __html: JSON.stringify(structuredData)
    }
}
        />
    );
};