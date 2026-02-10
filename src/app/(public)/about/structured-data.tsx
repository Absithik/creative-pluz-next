import { COMPANY_DETAILS, SITE_URL, LOCATION } from '@/lib/taxonomy';

export const AboutStructuredData = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            // About Page
            {
                "@type": "AboutPage",
                "@id": `${SITE_URL}/about#webpage`,
                "name": `About ${COMPANY_DETAILS.name}`,
                "description": `For over 8 years, ${COMPANY_DETAILS.name} has been helping ${LOCATION} businesses look professional with integrated graphic design and printing services.`,
                "url": `${SITE_URL}/about`,
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
                "foundingDate": "2015", // Per user request "Since 2015"
                "priceRange": "$$",
                "sameAs": COMPANY_DETAILS.socials
            },
            // Breadcrumb
            {
                "@type": "BreadcrumbList",
                "@id": `${SITE_URL}/about#breadcrumb`,
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
                        "name": "About Us",
                        "item": `${SITE_URL}/about`
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
