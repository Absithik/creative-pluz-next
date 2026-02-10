import { COMPANY_DETAILS, SITE_URL, LOCATION } from '@/lib/taxonomy';

export const ContactStructuredData = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            // Contact Page
            {
                "@type": "ContactPage",
                "@id": `${SITE_URL}/contact#webpage`,
                "name": `Contact ${COMPANY_DETAILS.name}`,
                "description": `Get in touch with ${COMPANY_DETAILS.name} in ${LOCATION}. Contact us for web development, branding, and digital marketing services.`,
                "url": `${SITE_URL}/contact`,
                "inLanguage": "en-IN",
                "isPartOf": {
                    "@id": `${SITE_URL}/#website`
                },
                "about": {
                    "@id": `${SITE_URL}/#localbusiness`
                }
            },
            // Local Business
            {
                "@type": "LocalBusiness",
                "@id": `${SITE_URL}/#localbusiness`,
                "name": COMPANY_DETAILS.name,
                "image": `${SITE_URL}/assets/images/logo.png`,
                "telephone": COMPANY_DETAILS.phone,
                "email": COMPANY_DETAILS.email,
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
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                        "opens": "09:00",
                        "closes": "18:00"
                    },
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": "Saturday",
                        "opens": "09:00",
                        "closes": "13:00"
                    }
                ],
                "priceRange": "$$",
                "sameAs": COMPANY_DETAILS.socials,
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": COMPANY_DETAILS.phone,
                    "contactType": "customer service",
                    "areaServed": "IN",
                    "availableLanguage": ["English", "Tamil"]
                }
            },
            // Breadcrumb
            {
                "@type": "BreadcrumbList",
                "@id": `${SITE_URL}/contact#breadcrumb`,
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
                        "name": "Contact",
                        "item": `${SITE_URL}/contact`
                    }
                ]
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
