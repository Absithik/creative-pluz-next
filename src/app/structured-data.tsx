import { SERVICE_TAXONOMY, COMPANY_DETAILS, SITE_URL, LOCATION } from '@/lib/taxonomy';

export const StructuredData = ({ data }: { data?: any }) => {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@graph": [
            // Organization Entity
            {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                "name": COMPANY_DETAILS.name,
                "legalName": COMPANY_DETAILS.legalName,
                "url": SITE_URL,
                "logo": {
                    "@type": "ImageObject",
                    "url": `${SITE_URL}/logo.png`,
                    "width": 500,
                    "height": 500
                },
                "foundingDate": COMPANY_DETAILS.foundingDate,
                "founders": [{
                    "@type": "Person",
                    "name": "Founder Name" // Add actual founder name if known, otherwise placeholder
                }],
                "numberOfEmployees": COMPANY_DETAILS.employees,
                "description": `Creative agency in ${LOCATION} specializing in branding, packaging, and web development services`,
                "sameAs": COMPANY_DETAILS.socials,
                "contactPoint": [{
                    "@type": "ContactPoint",
                    "telephone": COMPANY_DETAILS.phone,
                    "contactType": "customer service",
                    "areaServed": COMPANY_DETAILS.serviceAreas,
                    "availableLanguage": ["English", "Tamil"]
                }]
            },
            // Local Business Schema (for GEO)
            {
                "@type": "LocalBusiness",
                "@id": `${SITE_URL}/#localbusiness`,
                "parentOrganization": {
                    "@id": `${SITE_URL}/#organization`
                },
                "name": COMPANY_DETAILS.name,
                "image": `${SITE_URL}/office.jpg`,
                "telephone": COMPANY_DETAILS.phone,
                "email": COMPANY_DETAILS.email,
                "priceRange": "$$",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": COMPANY_DETAILS.address.street,
                    "addressLocality": COMPANY_DETAILS.address.city,
                    "addressRegion": COMPANY_DETAILS.address.state,
                    "postalCode": COMPANY_DETAILS.address.zip,
                    "addressCountry": COMPANY_DETAILS.address.country
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": COMPANY_DETAILS.coordinates.latitude,
                    "longitude": COMPANY_DETAILS.coordinates.longitude
                },
                "areaServed": {
                    "@type": "AdministrativeArea",
                    "name": "Tamil Nadu, India"
                },
                "makesOffer": Object.values(SERVICE_TAXONOMY).map(service => ({
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": service.name,
                        "description": service.description,
                        "url": `${SITE_URL}${service.slug}`,
                        "provider": {
                            "@id": `${SITE_URL}/#organization`
                        }
                    }
                })),
                "openingHoursSpecification": [{
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "09:00",
                    "closes": "19:00"
                }],
                "knowsAbout": Object.values(SERVICE_TAXONOMY).map(service => service.name),
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Creative Services",
                    "itemListElement": Object.values(SERVICE_TAXONOMY).map(service => ({
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": service.name
                        }
                    }))
                }
            },
            // WebSite Entity
            {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                "url": SITE_URL,
                "name": COMPANY_DETAILS.name,
                "description": `Creative agency in ${LOCATION} providing ${Object.values(SERVICE_TAXONOMY).map(s => s.name).join(', ')}`,
                "publisher": {
                    "@id": `${SITE_URL}/#organization`
                },
                "inLanguage": "en-IN",
                "potentialAction": [{
                    "@type": "SearchAction",
                    "target": `${SITE_URL}/search?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }]
            },
            // WebPage Entity
            {
                "@type": "WebPage",
                "@id": `${SITE_URL}/#homepage`,
                "url": SITE_URL,
                "name": `${COMPANY_DETAILS.name} - Creative Agency ${LOCATION}`,
                "isPartOf": {
                    "@id": `${SITE_URL}/#website`
                },
                "about": {
                    "@id": `${SITE_URL}/#organization`
                },
                "description": `Professional creative agency in ${LOCATION} specializing in branding, packaging design, and web development services`,
                "breadcrumb": {
                    "@id": `${SITE_URL}/#breadcrumb`
                },
                "primaryImageOfPage": {
                    "@type": "ImageObject",
                    "url": `${SITE_URL}/assets/images/home-hero.jpg`
                }
            },
            // BreadcrumbList
            {
                "@type": "BreadcrumbList",
                "@id": `${SITE_URL}/#breadcrumb`,
                "itemListElement": [{
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": SITE_URL
                }]
            },
            // FAQPage for AEO
            {
                "@type": "FAQPage",
                "@id": `${SITE_URL}/#faq`,
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": `What services does ${COMPANY_DETAILS.name} offer in ${LOCATION}?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Creative Pluz offers Logo & Branding, Product Package Designing, Social Media Post Design, Marketing Collateral & Banner Designs, Brochure & Print Advertising, and Web Development services.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Where is ${COMPANY_DETAILS.name} located?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `Our studio is located at ${COMPANY_DETAILS.address.street}, ${COMPANY_DETAILS.address.city}, ${COMPANY_DETAILS.address.state} ${COMPANY_DETAILS.address.zip}. We serve clients across ${COMPANY_DETAILS.serviceAreas.join(', ')} and throughout India.`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do you provide web development services for businesses?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, we offer complete web development services including responsive website design, e-commerce solutions, and web applications tailored to your business needs."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can you handle both digital and print design?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Absolutely! We provide end-to-end creative solutions covering both digital (social media, websites) and print (brochures, banners, packaging) design requirements."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What industries do you specialize in?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We work with diverse industries including Retail, Manufacturing, Healthcare, Education, Startups, Small Businesses, and Corporate Brands, providing customized design solutions for each sector."
                        }
                    }
                ]
            }
        ]
    };

    const schemaToRender = data || organizationSchema;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schemaToRender)
            }}
        />
    );
};
