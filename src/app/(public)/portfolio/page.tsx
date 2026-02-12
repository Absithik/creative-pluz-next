import { Metadata } from 'next'
import { SITE_URL } from '@/lib/taxonomy'
import { connectToDatabase } from '@/lib/db'
import Project from '@/lib/models/Project'
import LayoutSlot from '@/lib/models/LayoutSlot'
import PortfolioContent from './PortfolioContent'
import PortfolioFilters from './PortfolioFilters.client'
import ProjectGrid from './ProjectGrid.client'
import { Project as ProjectType } from './types'

// On-Demand Revalidation: Page is static until manually revalidated
export const revalidate = false

export const metadata: Metadata = {
    title: 'Our Work | Branding & Design Agency Salem | Creative Pluz',
    description: 'Explore our portfolio of logo design, packaging, and web development projects. See how we help businesses in Salem and Tamil Nadu grow.',
    alternates: {
        canonical: `${SITE_URL}/portfolio`,
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
    openGraph: {
        title: 'Our Work | Branding & Design Agency Salem | Creative Pluz',
        description: 'Explore our portfolio of logo design, packaging, and web development projects.',
        url: `${SITE_URL}/portfolio`,
        type: 'website',
        // images: [{ url: '/assets/images/portfolio-og.jpg', width: 1200, height: 630, alt: 'Creative Pluz Portfolio' }]
    }
}

async function getInitialData() {
    try {
        await connectToDatabase()

        // 1. Fetch Layout Slots for "All" view (replaces getProjects for All)
        const slots = await LayoutSlot.find()
            .sort({ slotIndex: 1 })
            .populate({
                path: 'project',
                model: Project,
                select: 'title slug category year excerpt coverImage size featured featuredOrder clientName duration status'
            })
            .lean()
        console.log(slots);

        // 2. Fetch one batch of projects just to extract Categories? 
        // Or fetch distinct categories efficiently? 
        // Let's fetch distinct categories from all published projects.
        const categories = await Project.distinct('category', { status: 'published' });

        return {
            layoutSlots: JSON.parse(JSON.stringify(slots)),
            categories: ['All', ...categories.sort()]
        }
    } catch (error) {
        console.error('Failed to fetch portfolio data:', error)
        return { layoutSlots: [], categories: ['All'] }
    }
}

export default async function PortfolioPage() {
    const { layoutSlots, categories } = await getInitialData()

    return (
        <main className="min-h-screen">
            <PortfolioContent />

            {/* Server renders categories, Client handles filtering */}
            <PortfolioFilters categories={categories} />

            {/* Client handles animations and pagination */}
            <ProjectGrid projects={[]} layoutSlots={layoutSlots} />
        </main>
    )
}
