// app/services/web-development/components/TrustSignals.server.tsx
export default function TrustSignals() {
    const stats = [
        { value: '50+', label: 'Websites Developed' },
        { value: 'High', label: 'Client Satisfaction' },
        { value: '2-6', label: 'Weeks Delivery' },
        { value: '24/7', label: 'Support Available' },
    ];

    const certifications = [
        { name: 'Performance Focused', icon: '⚡' },
        { name: 'SEO Optimized', icon: '🔍' },
        { name: 'Security Compliant', icon: '🛡️' },
        { name: 'Mobile First', icon: '📱' },
    ];

    return (
        <section className="py-20 px-6 lg:px-12 bg-black">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-brand-primary text-[10px] uppercase tracking-[0.6em] font-bold mb-4 block">
                        Our Standards
                    </span>
                    <h2 className="text-white text-4xl lg:text-5xl font-bold mb-6">
                        Why Choose Our Web Development Services
                    </h2>
                    <p className="text-white/60 max-w-3xl mx-auto">
                        Quality-focused web development with modern technologies and best practices
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

                {/* Development Standards */}
                <div className="bg-gradient-to-r from-brand-primary/10 to-blue-500/10 border border-white/10 rounded-2xl p-8">
                    <h3 className="text-white text-2xl font-bold mb-6">
                        Our Development Standards
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <h4 className="text-white font-semibold">Performance</h4>
                            <ul className="text-white/70 space-y-2 text-sm">
                                <li>✓ Optimized Loading Times</li>
                                <li>✓ Core Web Vitals Focused</li>
                                <li>✓ Efficient Code Practices</li>
                                <li>✓ Resource Optimization</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-white font-semibold">Security</h4>
                            <ul className="text-white/70 space-y-2 text-sm">
                                <li>✓ SSL/TLS Implementation</li>
                                <li>✓ Regular Security Updates</li>
                                <li>✓ Data Protection Focus</li>
                                <li>✓ Privacy Compliance</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-white font-semibold">SEO</h4>
                            <ul className="text-white/70 space-y-2 text-sm">
                                <li>✓ Semantic HTML Structure</li>
                                <li>✓ Mobile-First Design</li>
                                <li>✓ Technical SEO Implementation</li>
                                <li>✓ Accessibility Compliance</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}