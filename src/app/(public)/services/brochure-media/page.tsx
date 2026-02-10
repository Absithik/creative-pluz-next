import { Metadata } from 'next';
import Hero from './Hero';
import Services from './Services';
import DigitalServices from './DigitalServices';
import Showcase from './Showcase';
import CallToAction from './CallToAction';
import { MarqueeBackground } from './components/Marquee/MarqueeBackground';
import { StudioOverlay } from './components/StudioOverlay';
import CircularGallery from './CircularGallery/CircularGallery';
import PrintAdGrid from './components/PrintAdGrid/PrintAdGrid';
import MaterialSpecs from './components/MaterialSpecs';
import { BrochureStructuredData } from './BrochureStructuredData';
import { COMPANY_DETAILS, SITE_URL } from '@/lib/taxonomy';

import { GALLERY_ITEMS } from './data/gallery';
import FAQSection from './components/FAQSection';

const galleryItems = GALLERY_ITEMS;

// SEO Metadata
export const metadata: Metadata = {
    title: 'Brochure & Print Advertising Design Salem | Creative Pluz',
    description: 'Professional brochure, flyer, and print advertising design in Salem. High-quality printing, fast delivery, and impactful marketing materials for businesses.',

    keywords: [
        'brochure design salem',
        'flyer design and printing salem',
        'catalogue design salem',
        'print advertising company salem',
        'marketing brochure printing',
        'brochure printing services tamil nadu',
        'corporate brochure design',
        'product catalog design',
        'offset printing salem',
        'digital printing salem'
    ],

    openGraph: {
        title: 'Brochure & Print Advertising Design Salem | Creative Pluz',
        description: 'Professional brochure, flyer, and catalog design with high-quality printing in Salem, Tamil Nadu.',
        type: 'website',
        locale: 'en_IN',
        siteName: COMPANY_DETAILS.name,
        images: [{
            url: `${SITE_URL}/assets/images/brochure-og.jpg`,
            width: 1200,
            height: 630,
            alt: 'Brochure Design & Printing Services in Salem',
        }],
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Brochure & Print Advertising Design | Creative Pluz',
        description: 'High-quality brochure, flyer, and print design services in Salem',
        images: [`${SITE_URL}/assets/images/brochure-twitter.jpg`],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    alternates: {
        canonical: `${SITE_URL}/services/brochure-design-printing`,
    },

    authors: [{ name: COMPANY_DETAILS.name }],
    creator: COMPANY_DETAILS.name,
    publisher: COMPANY_DETAILS.name,

    // GEO metadata for local SEO
    other: {
        'geo.region': 'IN-TN',
        'geo.placename': 'Salem, Tamil Nadu',
        'geo.position': '11.6643;78.1460',
        'ICBM': '11.6643, 78.1460',
    },
};

const BrochureMedia: React.FC = () => {
    return (
        <>
            {/* Structured Data for SEO */}
            <BrochureStructuredData />

            {/* Hidden SEO Content Section (for search engines only) */}
            <div className="sr-only" aria-hidden="true">
                <h2>Brochure & Print Advertising Design in Salem</h2>
                <p>Creative Pluz offers professional <strong>brochure design</strong>, <strong>flyer printing</strong>, and <strong>catalog design services</strong> in Salem, Tamil Nadu. We specialize in creating impactful print marketing materials for businesses across South India.</p>

                <h2>Our Print Services in Salem</h2>
                <ul>
                    <li>Brochure Design & Printing</li>
                    <li>Flyer Design & Distribution</li>
                    <li>Product Catalog Design</li>
                    <li>Corporate Profile Design</li>
                    <li>Marketing Collateral Printing</li>
                    <li>Offset & Digital Printing</li>
                </ul>
            </div>

            <main className="relative w-full bg-black">
                {/* SECTION 1: The Marquee Scroll Interaction */}
                <div className="relative h-[300vh] w-full">
                    <div className="sticky top-0 h-screen w-full overflow-hidden">
                        <MarqueeBackground />
                        <StudioOverlay />
                    </div>
                </div>

                {/* SECTION 2: The Content Below */}
                <div className="relative z-10 bg-black flex flex-col">
                    <Services />
                    <DigitalServices />
                    {/* <Showcase /> */}

                    {/* Gallery Section - Updated H2 for SEO */}
                    <section className="py-12 relative overflow-hidden bg-zinc-950/40">
                        <div className="px-6 md:px-12 mb-16 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <span className="text-brand-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                                    Editorial Layouts
                                </span>
                                {/* Updated H2 with keywords */}
                                <h2 className="text-4xl uppercase md:text-7xl font-bold tracking-tighter font-heading text-white">
                                    Brochure Design &<br />Catalog Printing Services
                                </h2>
                            </div>
                            {/* Updated description with keywords */}
                            <p className="text-zinc-500 max-w-xs text-sm leading-relaxed mb-2">
                                Professional brochure printing and catalog design in Salem. From corporate profiles to product lookbooks - immersive multi-page designs crafted to tell your brand's complete story.
                            </p>
                        </div>

                        <div className="relative h-[700px] w-full bg-zinc-950/20 select-none group">
                            <CircularGallery
                                items={galleryItems}
                                bend={1.2}
                                textColor="#ffffff"
                                borderRadius={0.1}
                                scrollSpeed={2.5}
                                scrollEase={0.07}
                                font="bold 48px Space Grotesk"
                            />
                        </div>
                    </section>

                    <PrintAdGrid />
                    <MaterialSpecs />

                    <CallToAction />
                    <FAQSection />
                </div>
            </main>
        </>
    );
};

export default BrochureMedia;