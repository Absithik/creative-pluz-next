'use client';

import React, { useState } from 'react';

const faqs = [
    {
        question: 'How much does brochure printing cost in Salem?',
        answer:
            'Brochure printing costs vary based on size, paper quality, quantity, and finishing options. We offer competitive pricing starting from ₹5 per piece for basic A4 brochures. Contact us for a detailed quote based on your specific requirements.',
    },
    {
        question: 'What is the best paper for brochures?',
        answer:
            'We recommend 200-300 GSM art paper for premium brochures, 130-170 GSM coated paper for standard brochures, and recycled paper for eco-friendly options.',
    },
    {
        question: 'How long does brochure printing take in Salem?',
        answer:
            'Standard turnaround is 3-5 business days for digital printing and 7-10 days for offset printing.',
    },
    {
        question: 'Do you provide both offset and digital printing?',
        answer:
            'Yes! We offer both offset printing and digital printing depending on quantity, timeline, and budget.',
    },
    {
        question: 'Can you design and print in multiple languages?',
        answer:
            'Absolutely! We design brochures in English, Tamil, Hindi, and other regional languages.',
    },
    {
        question: 'Do you handle brochure distribution in Salem?',
        answer:
            'Yes, we partner with local distribution services for targeted brochure distribution.',
    },
    {
        question: 'What file formats do you accept for printing?',
        answer:
            'We accept PDF, AI, PSD, and INDD files. PDF/X-1a with 300 DPI is recommended.',
    },
    {
        question: 'Can I see a proof before printing?',
        answer:
            'Yes, we provide digital proofs and physical proofs for large orders.',
    },
];

const FAQSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-black">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <h2 className="text-center text-4xl md:text-5xl font-bold text-white uppercase mb-4">
                    Brochure Printing FAQs
                </h2>

                <p className="text-center text-zinc-400 max-w-2xl mx-auto mb-12">
                    Common questions about brochure design and printing services in Salem
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
                        Have more questions about brochure design or printing?
                    </p>
                    <a
                        href="/contact"
                        className="inline-block border border-brand-primary text-brand-primary font-bold px-8 py-3 rounded-full hover:bg-brand-primary hover:text-black transition"
                    >
                        Contact Our Print Experts
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
