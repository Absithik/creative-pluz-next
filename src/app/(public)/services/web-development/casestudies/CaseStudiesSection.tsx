'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CaseStudyCard from './CaseStudyCard';
import { CASE_STUDIES } from '../data/case-studies';

const CaseStudiesSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    /* ---------------- DESKTOP SCROLL PHASES ----------------
       0.00 → 0.33  → Card 1
       0.33 → 0.66  → Card 2
       0.66 → 1.00  → Card 3
    -------------------------------------------------------- */

    // CARD 1
    const c1Opacity = useTransform(
        scrollYProgress,
        [0, 0.25, 0.33],
        [1, 1, 0]
    );
    const c1Scale = useTransform(
        scrollYProgress,
        [0, 0.33],
        [1, 0.92]
    );

    // CARD 2
    const c2Opacity = useTransform(
        scrollYProgress,
        [0.33, 0.4, 0.66],
        [0, 1, 0]
    );
    const c2Scale = useTransform(
        scrollYProgress,
        [0.33, 0.66],
        [1.05, 0.92]
    );

    // CARD 3
    const c3Opacity = useTransform(
        scrollYProgress,
        [0.66, 0.75, 1],
        [0, 1, 1]
    );
    const c3Scale = useTransform(
        scrollYProgress,
        [0.66, 1],
        [1.05, 1]
    );

    return (
        <section ref={containerRef} className="bg-black py-18">
            {/* HEADER */}
            <div className="text-center max-w-4xl mx-auto mb-12 px-4">
                <span className="inline-block bg-white text-black px-5 py-2 rounded-full text-sm">
                    CASE STUDIES
                </span>
                <h2 className="text-5xl font-bold mt-6">
                    Success Stories That Inspire
                </h2>
                <p className="text-gray-600 mt-4">
                    Scroll to explore how we build high-impact digital products.
                </p>
            </div>

            {/* MOBILE / TABLET */}
            <div className="lg:hidden space-y-12 px-4 max-w-5xl mx-auto">
                {CASE_STUDIES.map((item, i) => (
                    <CaseStudyCard key={item.id} data={item} index={i + 1} />
                ))}
            </div>

            {/* DESKTOP SCROLL STORY */}
            <div className="hidden lg:block relative h-[200vh]">
                <div className="sticky top-1 h-[120px] max-w-6xl mx-auto px-6">
                    {/* CARD 1 */}
                    <motion.div
                        style={{ opacity: c1Opacity, scale: c1Scale }}
                        className="absolute inset-0 z-30"
                    >
                        <CaseStudyCard data={CASE_STUDIES[0]} index={1} />
                    </motion.div>

                    {/* CARD 2 */}
                    <motion.div
                        style={{ opacity: c2Opacity, scale: c2Scale }}
                        className="absolute inset-0 z-20"
                    >
                        <CaseStudyCard data={CASE_STUDIES[1]} index={2} />
                    </motion.div>

                    {/* CARD 3 */}
                    <motion.div
                        style={{ opacity: c3Opacity, scale: c3Scale }}
                        className="absolute inset-0 z-10"
                    >
                        <CaseStudyCard data={CASE_STUDIES[2]} index={3} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CaseStudiesSection;
