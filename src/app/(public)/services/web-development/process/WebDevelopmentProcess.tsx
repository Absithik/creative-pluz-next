'use client';

import Image from 'next/image';

const PROCESS = [
    {
        step: '01',
        title: 'Requirement & Planning',
        desc: 'We understand your business goals, target audience, and technical requirements to create a solid project roadmap.',
        image: '/assets/images/service/web-development/process-1.png',
    },
    {
        step: '02',
        title: 'Design & Development',
        desc: 'Our team designs clean UI/UX and develops scalable, high-performance web solutions using modern technologies.',
        image: '/assets/images/service/web-development/process-2.png',
    },
    {
        step: '03',
        title: 'Testing & Launch',
        desc: 'We rigorously test performance, security, and responsiveness before launching your product with confidence.',
        image: '/assets/images/service/web-development/process-3.png',
    },
];

export default function WebDevelopmentProcess() {
    return (
        <section className="relative py-28 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <div className="max-w-3xl mb-20">
                    <span className="inline-block mb-4 px-5 py-2 rounded-full bg-brand-primary text-white text-sm font-semibold">
                        Our Work Process
                    </span>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-brand-primary leading-tight">
                        We follow the best <br /> web development process
                    </h2>

                    <p className="mt-6 text-lg text-primary">
                        A structured, transparent, and proven approach to deliver scalable and
                        high-performing digital solutions.
                    </p>
                </div>

                {/* PROCESS FLOW */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {PROCESS.map((item, index) => (
                        <div
                            key={index}
                            className="relative border border-brand-primary bg-black rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-shadow"
                        >

                            {/* STEP NUMBER */}
                            <div className="absolute -top-6 left-6 w-12 h-12 rounded-full bg-brand-primary text-black flex items-center justify-center font-bold text-lg shadow-lg">
                                {item.step}
                            </div>

                            {/* IMAGE - FIXED RENDER VERSION */}
                            <div className="mb-6 flex justify-center">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={400}
                                    height={520}
                                    className="rounded-2xl object-contain"
                                    priority
                                />
                            </div>

                            {/* CONTENT */}
                            <h3 className="text-xl font-bold text-white mb-3">
                                {item.title}
                            </h3>

                            <p className="text-white/80 leading-relaxed">
                                {item.desc}
                            </p>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
