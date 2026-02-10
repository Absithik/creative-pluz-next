export enum CardType {
    IMAGE_TAG = 'IMAGE_TAG',
    TYPOGRAPHIC = 'TYPOGRAPHIC',
    INFOGRAPHIC = 'INFOGRAPHIC',
    INVESTOR = 'INVESTOR'
}

export interface InvestmentCard {
    id: string;
    type: CardType;
    title: string;
    subtitle?: string;
    value?: string;
    tag?: string;
    imageUrl?: string;
    bgColor: string;
    textColor: string;
}
