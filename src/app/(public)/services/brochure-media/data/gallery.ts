import { STUDIO_IMAGES } from './images';

export interface GalleryItem {
    image: string;
    title: string;
    description: string;
}

export const GALLERY_ITEMS: GalleryItem[] = STUDIO_IMAGES.slice(9, 17).map((img, index) => ({
    image: img,
    title: 'SYNTHETIC',
    description: 'A curated selection of our most recent digital explorations.'
}));
