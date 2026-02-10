// app/sitemap.ts
import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://creativepluz.com'

// Function to fetch dynamic portfolio slugs (mocked - replace with your actual data source)
async function getPortfolioSlugs(): Promise<string[]> {
    try {
        // If you have an API endpoint
        const res = await fetch(`${baseUrl}/api/portfolio/slugs`, {
            next: { revalidate: 3600 } // Revalidate every hour
        })

        if (res.ok) {
            const data = await res.json()
            return data.slugs || []
        }

        // Fallback: Return some hardcoded slugs or empty array
        return ['project-1', 'project-2', 'project-3']
    } catch (error) {
        console.error('Error fetching portfolio slugs:', error)
        return []
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const currentDate = new Date()

    // Static routes with individual configurations
    const staticRoutes = [
        {
            path: '',
            changeFrequency: 'weekly' as const,
            priority: 1,
        },
        {
            path: '/services',
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            path: '/services/web-development',
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            path: '/services/branding',
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            path: '/services/package-design',
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            path: '/services/social-media',
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            path: '/services/flex-banner',
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            path: '/services/brochure-media',
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            path: '/services/photography',
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            path: '/services/corporate-display',
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            path: '/portfolio',
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            path: '/about',
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            path: '/contact',
            changeFrequency: 'monthly' as const,
            priority: 0.8, // Higher priority for contact page
        },
    ]

    // Get dynamic portfolio slugs
    const portfolioSlugs = await getPortfolioSlugs()

    // Create static route entries
    const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
        url: `${baseUrl}${route.path}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }))

    // Create dynamic portfolio entries
    const dynamicEntries: MetadataRoute.Sitemap = portfolioSlugs.map((slug) => ({
        url: `${baseUrl}/portfolio/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    // Combine static and dynamic entries
    return [...staticEntries, ...dynamicEntries]
}