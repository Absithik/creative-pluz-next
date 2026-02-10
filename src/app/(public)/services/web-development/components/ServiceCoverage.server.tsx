// app/services/web-development/components/ServiceCoverage.server.tsx
interface ServiceCoverageProps {
    areas: string[];
}

export default function ServiceCoverage({ areas }: ServiceCoverageProps) {
    return (
        <section className="py-16 px-6 lg:px-12 bg-gradient-to-b from-black to-zinc-900">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-white text-3xl lg:text-4xl font-bold mb-4">
                        Web Development Service Areas
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Serving businesses across Tamil Nadu and pan-India with premium web development solutions
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {areas.map((area, index) => (
                        <div
                            key={index}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-brand-primary rounded-full mr-3"></div>
                                <span className="text-white font-medium">{area}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* GEO: Local business information */}
                <div className="mt-16 p-8 bg-black/50 border border-white/10 rounded-2xl">
                    <h3 className="text-white text-2xl font-bold mb-6">Our Location</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-white font-semibold mb-4">Head Office</h4>
                            <address className="text-white/70 not-italic">
                                <p>Creative Pluz Creative Agency</p>
                                <p>Salem, Tamil Nadu 636001</p>
                                <p>India</p>
                            </address>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Service Hours</h4>
                            <ul className="text-white/70 space-y-2">
                                <li>Monday - Friday: 9:00 AM - 7:00 PM</li>
                                <li>Saturday: 10:00 AM - 5:00 PM</li>
                                <li>Sunday: Emergency Support Only</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}