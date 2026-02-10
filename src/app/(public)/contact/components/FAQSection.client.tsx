'use client';

import { useState } from 'react';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-black">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <h2 className="text-center text-4xl md:text-5xl font-bold text-white uppercase mb-4">
                    Frequently Asked Questions
                </h2>

                <p className="text-center text-zinc-400 max-w-2xl mx-auto mb-12">
                    Common questions about working with Creative Pluz
                </p>

                <div className="max-w-3xl mx-auto divide-y divide-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden">
                    {faqs.map((faq, index) => {
                        const isOpen = activeIndex === index;

                        return (
                            <div
                                key={index}
                                itemScope
                                itemType="https://schema.org/Question"
                                className="bg-black"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex justify-between items-center text-left px-6 py-5 text-white font-semibold text-lg hover:bg-zinc-900 transition"
                                    aria-expanded={isOpen}
                                >
                                    <span itemProp="name">{faq.question}</span>
                                    <span className="text-brand-primary text-2xl">
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                    itemScope
                                    itemType="https://schema.org/Answer"
                                    itemProp="acceptedAnswer"
                                >
                                    <div
                                        className="px-6 pb-6 text-zinc-400"
                                        itemProp="text"
                                    >
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <p className="text-zinc-400 mb-6">
                        Have more questions?
                    </p>
                    <a
                        href="tel:+919363024021"
                        className="inline-block border border-brand-primary text-brand-primary font-bold px-8 py-3 rounded-full hover:bg-brand-primary hover:text-black transition"
                    >
                        Call Our Experts
                    </a>
                </div>
            </div>
        </section>
    );
}
