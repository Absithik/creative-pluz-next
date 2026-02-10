// app/components/home/ArtifactWall/constants.ts
export interface Artifact {
    _id: string;
    positionId: string;
    title: string;
    description: string;
    image: {
        url: string;
        alt: string;
    };
    design: {
        backgroundColor: string;
        textColor?: string;
        customClass?: string;
    };
    link: {
        url: string;
        text: string;
    };
}

export interface ArtifactWallConfig {
    title: string;
    subtitle: string;
    archiveLink: string;
    hoverEffect?: {
        enabled: boolean;
        scale: number;
    };
}

// Simplified fallback data (reduced from 9 to 6 artifacts)
export const FALLBACK_ARTIFACTS: Artifact[] = [
    {
        _id: 'position-1',
        positionId: 'position-1',
        title: 'Social Media Campaign',
        description: 'Creative campaign featuring bold typography',
        image: {
            url: '/assets/images/service/BANNERS/Insta Post 17.jpg',
            alt: 'Social media creative campaign'
        },
        design: {
            backgroundColor: '#E31E24',
            textColor: '#FFFFFF',
        },
        link: { url: '/portfolio/1', text: 'Explore' }
    },
    {
        _id: 'position-2',
        positionId: 'position-2',
        title: 'Brand Identity',
        description: 'Minimalist brand identity for tech startup',
        image: {
            url: '/assets/images/service/BANNERS/Insta Post 16.jpg',
            alt: 'Brand identity design'
        },
        design: {
            backgroundColor: '#222222',
            textColor: '#FFFFFF',
            customClass: 'opacity-80'
        },
        link: { url: '/portfolio/2', text: 'View' }
    },
    {
        _id: 'position-3',
        positionId: 'position-3',
        title: 'Mobile App Design',
        description: 'Mobile app interface showcasing user dashboard',
        image: {
            url: '/assets/images/service/BANNERS/Insta Post.png',
            alt: 'Mobile app interface design'
        },
        design: {
            backgroundColor: '#4CAF50',
            textColor: '#FFFFFF',
        },
        link: { url: '/portfolio/3', text: 'Explore' }
    },
    {
        _id: 'position-4',
        positionId: 'position-4',
        title: 'Print Collateral',
        description: 'Minimalist branding collateral with clean typography',
        image: {
            url: '/assets/images/service/BANNERS/Insta Post 17.jpg',
            alt: 'Print design collateral'
        },
        design: {
            backgroundColor: '#f8fafc',
            textColor: '#000000',
        },
        link: { url: '/portfolio/4', text: 'View' }
    },
    {
        _id: 'position-5',
        positionId: 'position-5',
        title: 'Marketing Banner',
        description: 'Orange themed marketing banner for seasonal promotion',
        image: {
            url: '/assets/images/service/BANNERS/Insta Post 16.jpg',
            alt: 'Marketing banner design'
        },
        design: {
            backgroundColor: '#f97316',
            textColor: '#FFFFFF',
            customClass: 'opacity-80'
        },
        link: { url: '/portfolio/5', text: 'View' }
    },
    {
        _id: 'position-6',
        positionId: 'position-6',
        title: 'Logo Design',
        description: 'Corporate logo design on white background',
        image: {
            url: '/assets/images/service/BANNERS/Insta Post.png',
            alt: 'Logo design showcase'
        },
        design: {
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
        },
        link: { url: '/portfolio/6', text: 'Explore' }
    },
];

export const FALLBACK_CONFIG: ArtifactWallConfig = {
    title: 'Selected',
    subtitle: 'Artifacts.',
    archiveLink: '/portfolio',
    hoverEffect: {
        enabled: true,
        scale: 1.02
    }
};

// Image optimization settings
export const IMAGE_QUALITY = {
    primary: 75,   // First image
    secondary: 65, // Other images
};

// Position layout configuration
export const POSITION_LAYOUTS = [
    { colSpan: 'md:col-span-8', rowSpan: 'md:row-span-2', minHeight: 'min-h-[400px] md:min-h-[500px]' },
    { colSpan: 'md:col-span-4', rowSpan: 'md:row-span-1', minHeight: 'min-h-[250px] md:min-h-[300px]' },
    { colSpan: 'md:col-span-4', rowSpan: 'md:row-span-2', minHeight: 'min-h-[500px] md:min-h-[600px]' },
    { colSpan: 'md:col-span-5', rowSpan: 'md:row-span-1', minHeight: 'min-h-[250px] md:min-h-[300px]' },
    { colSpan: 'md:col-span-3', rowSpan: 'md:row-span-1', minHeight: 'min-h-[250px] md:min-h-[300px]' },
    { colSpan: 'md:col-span-8', rowSpan: 'md:row-span-1', minHeight: 'min-h-[250px] md:min-h-[300px]' },
];

export const IMAGE_SIZES = [
    '(max-width: 768px) 100vw, 66vw',
    '(max-width: 768px) 100vw, 33vw',
    '(max-width: 768px) 100vw, 33vw',
    '(max-width: 768px) 100vw, 41vw',
    '(max-width: 768px) 100vw, 25vw',
    '(max-width: 768px) 100vw, 66vw',
];