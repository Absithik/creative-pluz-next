import React from 'react';
import { Printer } from 'lucide-react';

export const digitalServiceIntro = {
    sectionLabel: "Service 02",
    heading: "Print Advertising \n& Signage",
    description:
        "Dominate the physical world. We produce durable, high-impact outdoor advertising materials that ensure your brand is seen from a distance.",
    features: [
        "Flex Banners & Hoardings",
        "LED & Glow Sign Boards",
        "Vinyl Sticker Branding",
        "Corporate Standees",
    ],
    images: [
        {
            src: "/assets/images/service/BROUCHURE/New folder/C_PLUS 1000 X 1000_19.png",
            alt: "Large Format Printing",
            label: "High Impact",
            // Updated label style
            labelBg: "bg-brand-primary",
            labelTextClass: "text-3xl italic font-black uppercase text-black",
        },
        {
            src: "/assets/images/service/BROUCHURE/New folder/C_PLUS 1000 X 1000_22.png",
            alt: "Signage Solutions",
            labelBg: "bg-zinc-900",
            labelTextClass: "text-xs font-bold uppercase tracking-widest text-white",
            icon: <Printer className="text-brand-primary w-8 h-8" />,
            iconLabel: "Wide Format",
        },
    ],
};