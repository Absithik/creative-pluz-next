// app/services/web-development/components/types.ts
export interface FAQ {
    question: string;
    answer: string;
}

export interface FAQItemProps {
    faq: FAQ;
    index: number;
    totalItems: number;
}