import { StaticImageData } from 'next/image';

export interface Destination {
    id: string;
    title: string;
    subtitle: string;
    location: string;
    description: string;
    imageUrl: StaticImageData | string;
    projectUrl?: string;
    vibe?: string;
    bestTime?: string;
}
export interface ProjectListProps {
    destinations: Destination[];
}

export interface PerspectiveCanvasProps {
    activeItem: Destination;
}