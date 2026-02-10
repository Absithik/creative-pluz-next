'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

const letterAnim = {
    initial: { y: 200 },
    animate: { y: 0, transition: { duration: 1, ease: [0.6, 0.01, 0.05, 0.95] as const } }
};

const containerAnim = {
    animate: { transition: { staggerChildren: 0.1 } }
};

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] as const } }
};

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 bg-brand-dark overflow-hidden">
            <div className="max-w-[1920px] w-full mx-auto z-10">
                <motion.div
                    className="flex flex-col gap-0"
                    variants={containerAnim}
                    initial="initial"
                    animate="animate"
                >
                    {/* Row 1 */}
                    <div className="overflow-hidden">
                        <motion.h1 variants={letterAnim} className="text-[14vw] leading-[0.8] font-display font-black text-white uppercase tracking-tighter">
                            We Craft
                        </motion.h1>
                    </div>
                    {/* Row 2 */}
                    <div className="overflow-hidden flex items-center gap-4 md:gap-12">
                        <motion.div variants={letterAnim} className="w-16 h-16 md:w-32 md:h-32 bg-brand-primary rounded-full flex items-center justify-center animate-spin-slow">
                            <ArrowDownRight className="text-black w-8 h-8 md:w-16 md:h-16" />
                        </motion.div>
                        <motion.h1 variants={letterAnim} className="text-[10vw] leading-[0.8] font-display font-black text-transparent stroke-text uppercase tracking-tighter" style={{ WebkitTextStroke: "2px white" }}>
                            Digital
                        </motion.h1>
                    </div>
                    {/* Row 3 */}
                    <div className="overflow-hidden">
                        <motion.h1 variants={letterAnim} className="text-[10vw] leading-[0.8] font-display font-black text-brand-primary uppercase tracking-tighter">
                            Futures
                        </motion.h1>
                    </div>
                </motion.div>

                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 1 }}
                    className="mt-12 md:mt-20 flex flex-col md:flex-row justify-between items-start md:items-end"
                >
                    <p className="text-slate-400 max-w-md text-lg md:text-xl font-medium leading-relaxed">
                        We are a new-age digital agency. We blend raw creativity with technical precision to build brands that dominate their market.
                    </p>
                    <div className="mt-8 md:mt-0">
                        <Link href="/contact">
                            <div className="group relative overflow-hidden rounded-full bg-white px-8 py-4 md:px-12 md:py-6 transition-all hover:bg-brand-primary">
                                <span className="relative z-10 font-bold uppercase tracking-wider text-black group-hover:text-black transition-colors">Start Project</span>
                            </div>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
