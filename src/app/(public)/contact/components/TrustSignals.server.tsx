// app/contact/components/TrustSignals.server.tsx
export default function TrustSignals() {
    const stats = [
        { value: '4+', label: 'Years Experience' }, // Based on founding date 2020
        { value: '100+', label: 'Projects Delivered' },
        { value: '98%', label: 'Client Retention' },
        { value: '24/7', label: 'Support Available' },
    ];

    const certifications = [
        { name: 'Certified Experts', icon: '🏆' },
        { name: 'Google Partner', icon: 'G' }, // Assuming or generic
        { name: 'Award Winning', icon: '⭐' },
        { name: 'Quality Assured', icon: '✅' },
    ];

    return (
        <section className="py-20 px-6 lg:px-12 bg-black/50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-brand-primary text-[10px] uppercase tracking-[0.6em] font-bold mb-4 block">
                        Why Partner With Us
                    </span>
                    <h2 className="text-white text-4xl lg:text-5xl font-bold mb-6">
                        Trusted by Businesses in Salem & Beyond
                    </h2>
                    <p className="text-white/60 max-w-3xl mx-auto">
                        We don't just build websites; we build long-term digital partnerships.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-5xl lg:text-6xl font-bold text-brand-primary mb-4">
                                {stat.value}
                            </div>
                            <div className="text-white/80 text-lg">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Certifications & Badges */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {certifications.map((cert, index) => (
                        <div
                            key={index}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-brand-primary/50 transition-colors"
                        >
                            <div className="text-3xl mb-4">{cert.icon}</div>
                            <div className="text-white font-semibold">{cert.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
