/** @type {import('next').NextConfig} */
const nextConfig = {
    // ✅ Keep trailingSlash as false (better for Next.js)
    trailingSlash: false,

    // ✅ Enable compression for better performance
    compress: true,

    // ✅ Keep ETags for caching
    generateEtags: true,

    // ✅ FIXED Images configuration
    images: {
        // Remove 'avif' format - it's causing issues
        formats: ['image/webp'], // Only WebP for modern browsers

        // Optimize image domains
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
            },
            // Add your local domain if loading from your own server
            {
                protocol: 'https',
                hostname: 'creativepluz.com', // Your actual domain
            },
            {
                protocol: 'https',
                hostname: 'www.creativepluz.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],

        // Optimized sizes for better performance
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 64, 96, 128, 256],

        // Add these optimizations:
        minimumCacheTTL: 60, // Cache for 60 seconds minimum
        dangerouslyAllowSVG: true, // Allow SVG if you use them
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },

    // ✅ SEO: Add redirects
    async redirects() {
        return [
            {
                source: '/services/webdev',
                destination: '/services/web-development',
                permanent: true,
            },
            {
                source: '/web-development',
                destination: '/services/web-development',
                permanent: true,
            },
            {
                source: '/services/website',
                destination: '/services/web-development',
                permanent: true,
            },
            {
                source: '/admin/artifact-wall/new',
                destination: '/admin/artifact-wall/create',
                permanent: false,
            },
        ];
    },

    // ✅ FIXED Headers - Security & Caching (Merged)
    async headers() {
        return [
            // Security Headers
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    // Add CSP that allows images from all your sources
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "img-src 'self' data: blob: https://images.unsplash.com https://picsum.photos https://res.cloudinary.com https://i.pravatar.cc https://creativepluz.com https://www.creativepluz.com",
                            "media-src 'self' data:",
                            "style-src 'self' 'unsafe-inline'",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://upload-widget.cloudinary.com",
                            "frame-src 'self' https://upload-widget.cloudinary.com",
                            "font-src 'self'",
                            "connect-src 'self' https://res.cloudinary.com https://upload-widget.cloudinary.com",
                        ].join('; '),
                    },
                ],
            },
            // Caching Headers for Images
            {
                source: '/_next/image(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            // Caching Headers for Static Assets
            {
                source: '/_next/static/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },


};

module.exports = nextConfig;