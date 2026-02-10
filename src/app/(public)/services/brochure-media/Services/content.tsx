import React from 'react';
import { BookOpen, Printer, Layers, Sparkles } from 'lucide-react';

export const serviceIntro = {
    sectionLabel: "Service 01",
    heading: "Brochure & \nCatalog Design",
    description: "From tactile textures to perfect typography. Multi-page designs crafted to be held, read, and remembered.",
    icons: [<BookOpen key="book" size={20} />, <Layers key="layers" size={20} />],
};

export const services = [
    {
        title: "Company Profiles",
        desc: "Professional booklets defining your corporate vision and values.",
        icon: <BookOpen />
    },
    {
        title: "Product Catalogs",
        desc: "Structured, high-fidelity layouts for your entire product inventory.",
        icon: <Layers />
    },
    {
        title: "Editorial Lookbooks",
        desc: "Magazine-style spreads for fashion, retail, or portfolio showcases.",
        icon: <Sparkles />
    },
    {
        title: "Annual Reports",
        desc: "Clean typography and data visualization for formal business reviews.",
        icon: <Printer />
    },
];