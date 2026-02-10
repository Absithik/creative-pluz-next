// app/components/home/ArtifactWall/index.tsx
import { Suspense } from 'react';
import ArtifactWallHeader from './ArtifactWallHeader';
import ArtifactGrid from './ArtifactGrid';
import ArtifactWallSkeleton from './ArtifactWallSkeleton';
import { FALLBACK_ARTIFACTS, FALLBACK_CONFIG } from './constants';

// Server-side data fetching
async function fetchArtifacts() {
    try {
        // Use absolute URL for server-side fetching
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/artifacts`, {
            headers: {
                'Content-Type': 'application/json',
            },
            next: {
                revalidate: 3600, // Cache for 1 hour
                tags: ['artifacts']
            },
            cache: 'force-cache' // Use HTTP cache
        });

        if (!response.ok) {
            console.warn('Failed to fetch artifacts, using fallback');
            return FALLBACK_ARTIFACTS;
        }

        const data = await response.json();
        return data.data || FALLBACK_ARTIFACTS;
    } catch (error) {
        console.error('Error fetching artifacts:', error);
        return FALLBACK_ARTIFACTS;
    }
}

async function fetchConfig() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/public/artifact-wall-config`, {
            next: { revalidate: 3600 },
            cache: 'force-cache'
        });

        if (!response.ok) {
            return FALLBACK_CONFIG;
        }

        const data = await response.json();
        return data.data || FALLBACK_CONFIG;
    } catch (error) {
        console.error('Error fetching config:', error);
        return FALLBACK_CONFIG;
    }
}

export default async function ArtifactWall() {
    // Fetch data in parallel on the server
    const [artifacts, config] = await Promise.all([
        fetchArtifacts(),
        fetchConfig()
    ]);

    return (
        <section
            className="py-12 md:py-24 bg-brand-dark overflow-hidden"
            aria-label="Artifact wall showcasing our work"
        >
            <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-12">
                {/* Static header rendered on server */}
                <ArtifactWallHeader config={config} />

                {/* Grid with Suspense for loading state */}
                <Suspense fallback={<ArtifactWallSkeleton />}>
                    <ArtifactGrid
                        artifacts={artifacts.slice(0, 6)} // Limit to 6 artifacts
                        config={config}
                    />
                </Suspense>
            </div>
        </section>
    );
}