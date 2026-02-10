import React from 'react';
import { SERVICES_DATA } from './data/services';
import { ServicesScrollClient } from './ServicesScroll.Client'; // Import the new client component

export const ServicesScroll = () => {
    return (
        <>
            {/* === SERVER SIDE: SEO & Resource Hints === 
                These are best handled on the server to ensure they are present 
                in the initial HTML sent to the browser.
            */}
            <link
                rel="preload"
                href={SERVICES_DATA[0].bgImage}
                as="image"
                type="image/webp"
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": "Our Services",
                        "itemListElement": SERVICES_DATA.map((service, index) => ({
                            "@type": "Service",
                            "position": index + 1,
                            "name": service.title,
                        }))
                    })
                }}
            />

            {/* === CLIENT SIDE: Interactivity === */}
            <ServicesScrollClient services={SERVICES_DATA} />
        </>
    );
};

export default ServicesScroll;