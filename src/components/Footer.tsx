'use client';

import React from 'react';
import Link from 'next/link';
import {
    Mail, Phone, MapPin,
    Linkedin, Facebook, Twitter, Instagram,
    Palette
} from 'lucide-react';

// Brand Color
const BRAND_COLOR = '#fbbf24'; // amber-400

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: "Instagram", icon: Instagram, href: "https://instagram.com/yourhandle", color: "hover:text-pink-500" },
        { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/yourhandle", color: "hover:text-blue-500" },
        { name: "Facebook", icon: Facebook, href: "https://facebook.com/yourhandle", color: "hover:text-blue-600" },
        { name: "Twitter", icon: Twitter, href: "https://twitter.com/yourhandle", color: "hover:text-sky-400" },
    ];

    return (
        <footer className="w-full bg-transparent mt-20 rounded-t-lg relative z-50">

            {/* CHANGE MADE HERE:
               1. Changed bg-[#050505] to bg-zinc-900 (Lighter, charcoal grey) 
               2. Added shadow-black/50 to help it pop against the black body
            */}
            <div className="mx-auto w-full lg:w-[99%] bg-zinc-900 text-white rounded-t-[2rem] overflow-hidden relative border border-white/10 shadow-2xl shadow-black/50">

                {/* Background Glow Effects - Adjusted Opacity for the new background */}
                <div
                    className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-5"
                    style={{ background: `radial-gradient(circle, ${BRAND_COLOR}, transparent)` }}
                />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none opacity-20" />

                <div className="container mx-auto px-6 md:px-10 py-4 pt-8 relative z-10">

                    {/* 1. CTA / Newsletter Section (Top) */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 pb-6 border-b border-white/10 gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/20 border border-white/10 mb-6 backdrop-blur-md">
                                <Palette className="w-3 h-3 mr-2" style={{ color: BRAND_COLOR }} />
                                <span className="text-xs text-zinc-300 font-medium tracking-wide">Creative Excellence</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight font-display">
                                Let's craft your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Digital Future.</span>
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Join our network. Get the latest design trends and agency updates delivered to you.
                            </p>
                        </div>

                        <form className="w-full lg:w-auto min-w-[350px]" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full opacity-20 group-hover:opacity-30 transition duration-500 blur"></div>
                                {/* Changed input background to black/40 to contrast with the new grey footer */}
                                <div className="relative flex items-center bg-black/40 rounded-full p-1.5 pl-6 border border-white/10">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="bg-transparent border-none focus:outline-none text-white placeholder-zinc-500 w-full py-2 text-sm"
                                    />
                                    <button
                                        type="submit"
                                        className="text-black rounded-full px-6 py-2.5 font-bold hover:opacity-90 transition-all duration-300 flex items-center gap-2 text-xs uppercase tracking-widest"
                                        style={{ backgroundColor: BRAND_COLOR }}
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* 2. Main Grid Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">

                        {/* Column 1: Brand Info */}
                        <div className="lg:col-span-4 space-y-6" itemScope itemType="https://schema.org/Organization">
                            <Link href="/" className="flex items-center space-x-3 group">
                                <div
                                    className="w-10 h-10 flex items-center justify-center text-black font-black text-xl rounded-lg shadow-lg shadow-amber-900/20 transition-transform group-hover:scale-105"
                                    style={{ backgroundColor: BRAND_COLOR }}
                                >
                                    CP
                                </div>
                                <div>
                                    <span className="font-display font-bold text-xl tracking-tight block text-white">Creative<span style={{ color: BRAND_COLOR }}>Pluz</span></span>
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Design Studio</span>
                                </div>
                            </Link>
                            <p className="text-zinc-400 leading-relaxed text-sm max-w-sm">
                                Full-spectrum <strong className="text-zinc-200">creative agency</strong> engineering growth through trend-driven design, branding, and physical brand presence.
                            </p>
                        </div>

                        {/* Column 2: Navigation */}
                        <div className="lg:col-span-2 lg:pl-4">
                            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-widest flex items-center gap-2">
                                Navigation
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { name: 'Selected Work', path: '/portfolio' },
                                    { name: 'The Team', path: '/about' },
                                    { name: 'Contact', path: '/contact' },
                                    { name: 'Services', path: '/services' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.path} className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
                                            {/* Changed chevron color to white/30 for subtlety */}
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0"></span>
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Expertise */}
                        <div className="lg:col-span-3">
                            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-widest flex items-center gap-2">
                                Expertise
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { name: 'Package Designing', path: '/services/package-design' },
                                    { name: 'Social Media Posts', path: '/services/social-media' },
                                    { name: 'Flex Banner Designs', path: '/services/flex-banner' },
                                    { name: 'Logo & Branding', path: '/services/branding' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.path} className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0"></span>
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Contact Info */}
                        <div className="lg:col-span-3 lg:pl-8">
                            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-widest flex items-center gap-2">
                                Connect
                            </h3>

                            <div className="space-y-3">
                                <a
                                    href="mailto:creativepluzsalem@gmail.com"
                                    className="flex items-center space-x-3 text-zinc-400 hover:text-white transition-colors group"
                                >
                                    <div className="p-2 bg-black/20 rounded-full group-hover:bg-amber-500/10 transition-colors">
                                        <Mail className="w-4 h-4 group-hover:text-amber-400 transition-colors" />
                                    </div>
                                    <span className="text-sm">creativepluzsalem@gmail.com</span>
                                </a>

                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Creative+Pluz+S.S.+Plaza+Salem"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start space-x-3 text-zinc-400 group hover:text-white transition-colors"
                                >
                                    <div className="p-2 bg-black/20 rounded-full mt-1 group-hover:bg-amber-500/10 transition-colors">
                                        <MapPin className="w-4 h-4 group-hover:text-amber-400 transition-colors" />
                                    </div>
                                    <span className="text-sm leading-relaxed" itemProp="address">
                                        #7/2, 1st Floor, S.S. Plaza,
                                        Advaitha Ashram Rd, Nr. Nathan Hospital,<br />
                                        <span className="text-white">SALEM - 636016</span>.
                                    </span>
                                </a>

                                <div className="flex items-center space-x-3 text-zinc-400 group">
                                    <div className="p-2 bg-black/20 rounded-full group-hover:bg-amber-500/10 transition-colors">
                                        <Phone className="w-4 h-4 group-hover:text-amber-400 transition-colors" />
                                    </div>
                                    <div className="flex flex-col text-sm">
                                        <a href="tel:+919363024021" className="hover:text-white transition-colors">+91 93630 24021</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* 3. Bottom Bar */}
                    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                            <span className="text-zinc-500 text-xs font-medium">
                                © {currentYear} Creative Pluz. Salem Branch.
                            </span>
                            <div className="flex gap-6">
                                <a href="#" className="text-xs text-zinc-600 hover:text-white transition-colors">Privacy</a>
                                <a href="#" className="text-xs text-zinc-600 hover:text-white transition-colors">Terms</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 flex items-center justify-center rounded-full bg-black/20 border border-white/5 text-zinc-400 transition-all duration-300 hover:scale-110 hover:bg-white/10 ${social.color}`}
                                        aria-label={social.name}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;