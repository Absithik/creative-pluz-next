// app/services/web-development/components/FAQSection.server.tsx
interface FAQ {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
    return (
        <section className="py-20 px-6 lg:px-12 bg-black">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-brand-primary text-[10px] uppercase tracking-[0.6em] font-bold mb-4 block">
                        Questions & Answers
                    </span>
                    <h2 className="text-white text-4xl lg:text-5xl font-bold mb-6">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Common questions about our web development process and services
                    </p>
                </div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-b border-white/10 pb-8"
                        >
                            <h3 className="text-white text-xl lg:text-2xl font-semibold mb-4">
                                {faq.question}
                            </h3>
                            <div className="text-white/70 leading-relaxed">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* AEO: Call-to-action for featured snippets */}
                <div className="mt-12 p-8 bg-gradient-to-r from-brand-primary/10 to-purple-500/10 rounded-2xl border border-white/10">
                    <h3 className="text-white text-2xl font-bold mb-4">
                        Need More Specific Information?
                    </h3>
                    <p className="text-white/70 mb-6">
                        For detailed project quotes, technical specifications, or to discuss your specific requirements,
                        contact our web development experts directly.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 bg-brand-primary text-black font-bold rounded-lg hover:bg-brand-primary/90 transition-colors"
                    >
                        Get Custom Quote
                    </a>
                </div>
            </div>
        </section>
    );
}