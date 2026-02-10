export type SpanType = 'small' | 'medium' | 'tall' | 'extra-tall' | 'wide';

export interface GalleryItem {
  id: string;
  url: string;
  alt: string;
  spanType: SpanType;
}
