// app/components/ServicesScroll/types.ts
export interface ServiceItem {
    id: string;
    bgImage: string;
    smallImage: string;
    title: string;
    description: string;
    // Add any other properties from your data
}

export interface DesktopServiceCardProps {
    service: ServiceItem;
    progress: any; // Framer Motion MotionValue
    range: [number, number];
    index: number;
    total: number;
}

export interface ServicesScrollProps {
    services: ServiceItem[];
}

