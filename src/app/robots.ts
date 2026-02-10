// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://creativepluz.com'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin/',
                '/api/admin/',
                '/_next/',
                '/private/',
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}