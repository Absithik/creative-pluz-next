export interface Project {
    id: string;
    number: string;
    title: string;
    projectType: string;
    projectTypeFull: string;
    imageUrl: string;
    imageClass: string;
    link: string;
    buttonClass: string;
    headingTransform: {
        translateX: string;
        translateY: string;
        skew: string;
        opacity: number;
    };
    numberTransform: {
        translateX: string;
    };
    imageScale: number;
    buttonPosition: {
        translateX: string;
        translateY: string;
    };
    textRotation: number;
    labelTransform: {
        translateX: string;
    };
}

export interface FeaturedWorkProps {
    projects?: Project[];
}

export interface AnimationState {
    scrollProgress: number;
    activeSection: number;
    isScrolling: boolean;
}

export interface ScrollData {
    current: number;
    target: number;
    ease: number;
}
