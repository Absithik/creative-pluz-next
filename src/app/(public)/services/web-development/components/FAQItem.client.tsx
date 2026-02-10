// app/services/web-development/components/FAQItem.client.tsx
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Inline types instead of importing
interface FAQ {
    question: string;
    answer: string;
}

interface FAQItemProps {
    faq: FAQ;
    index: number;
    totalItems: number;
}

export default function FAQItemClient({ faq, index, totalItems }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(index === 0);

    return (
        <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02] hover:bg-white/5 transition-colors">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex justify-between items-center"
            >
                <h3 className="text-white text-lg font-semibold">
                    {faq.question}
                </h3>
                <ChevronDown className={`w-5 h-5 text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''
                    }`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 py-4 border-t border-white/10">
                            <p className="text-white/70">{faq.answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}