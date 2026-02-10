export interface HeroItem {
    id: number;
    cardTitle: string;
    headline: string;
    description: string;
    image: string;
}

export interface HeroSectionProps {
    items: HeroItem[];
}

export interface DesktopSideCardProps {
    image: string;
    isActive: boolean;
    index: number;
}
