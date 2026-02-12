'use client';

import React from 'react';
import Link from 'next/link';
import {
    Mail, Phone, MapPin,
    Facebook, Instagram, Linkedin, Twitter,
    Palette
} from 'lucide-react';

// Brand Color
const BRAND_COLOR = '#fbbf24'; // amber-400

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: "Instagram",
            icon: Instagram,
            href: "https://www.instagram.com/creativepluz_designstudio?igsh=MWwzajZ2b2ZkbzdzZA==",
            color: "hover:text-pink-500"
        },
        {
            name: "Facebook",
            icon: Facebook,
            href: "https://www.facebook.com/share/1HUR3VjJsp/?mibextid=wwXIfr",
            color: "hover:text-blue-600"
        },
        // Added placeholders for completeness; these now have imports to prevent HMR errors
        { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-500" },
        { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-400" },
    ];

    return (
        <footer className="w-full bg-transparent mt-10 md:mt-20 rounded-t-lg relative z-50">
            <div className="mx-auto w-full lg:w-[98%] bg-zinc-900 text-white rounded-t-[2rem] overflow-hidden relative border border-white/10 shadow-2xl shadow-black/50">

                {/* Background Glow Effects */}
                <div
                    className="absolute top-0 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-[120px] pointer-events-none opacity-5"
                    style={{ background: `radial-gradient(circle, ${BRAND_COLOR}, transparent)` }}
                />
                <div className="absolute bottom-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none opacity-20" />

                <div className="container mx-auto px-6 md:px-10 py-12 relative z-10">

                    {/* 1. CTA / Newsletter Section (Top) */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 pb-10 border-b border-white/10 gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/20 border border-white/10 mb-6 backdrop-blur-md">
                                <Palette className="w-3 h-3 mr-2" style={{ color: BRAND_COLOR }} />
                                <span className="text-xs text-zinc-300 font-medium tracking-wide">Creative Excellence</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                                Let's craft your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Digital Future.</span>
                            </h2>
                            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                                Join our network. Get the latest design trends and agency updates delivered to you.
                            </p>
                        </div>

                        <form className="w-full lg:w-auto min-w-full md:min-w-[400px]" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full opacity-20 group-hover:opacity-30 transition duration-500 blur"></div>
                                <div className="relative flex items-center bg-black/40 rounded-full p-1.5 pl-6 border border-white/10">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="bg-transparent border-none focus:outline-none text-white placeholder-zinc-500 w-full py-2 text-sm"
                                    />
                                    <button
                                        type="submit"
                                        className="text-black rounded-full px-6 py-2.5 font-bold hover:opacity-90 transition-all duration-300 hidden sm:block text-xs uppercase tracking-widest shrink-0"
                                        style={{ backgroundColor: BRAND_COLOR }}
                                    >
                                        Subscribe
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full mt-4 text-black rounded-full px-6 py-3 font-bold sm:hidden text-xs uppercase tracking-widest"
                                    style={{ backgroundColor: BRAND_COLOR }}
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* 2. Main Grid Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                        {/* Column 1: Brand Info */}
                        <div className="lg:col-span-4 space-y-6">
                            <Link href="/" className="flex items-center space-x-3 group w-fit">
                                <div
                                    className="w-10 h-10 flex items-center justify-center text-black font-black text-xl rounded-lg shadow-lg transition-transform group-hover:scale-105"
                                    style={{ backgroundColor: BRAND_COLOR }}
                                >
                                    CP
                                </div>
                                <div>
                                    <span className="font-bold text-xl tracking-tight block text-white">Creative<span style={{ color: BRAND_COLOR }}>Pluz</span></span>
                                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Design Studio</span>
                                </div>
                            </Link>
                            <p className="text-zinc-400 leading-relaxed text-sm max-w-sm">
                                Full-spectrum <strong className="text-zinc-200">creative agency</strong> engineering growth through trend-driven design, branding, and physical brand presence.
                            </p>
                        </div>

                        {/* Column 2: Navigation */}
                        <div className="lg:col-span-2">
                            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Navigation</h3>
                            <ul className="space-y-3">
                                {[
                                    { name: 'Home', path: '/' },
                                    { name: 'About', path: '/about' },
                                    { name: 'Works', path: '/portfolio' },
                                    { name: 'Contact', path: '/contact' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.path} className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
                                            <span className="w-1 h-1 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-all"></span>
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Services */}
                        <div className="lg:col-span-3">
                            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Services</h3>
                            <ul className="space-y-3">
                                {[
                                    'Logo & Branding',
                                    'Product Package Designing',
                                    'Social Media Post',
                                    'Banner Designs & Corporate Display',
                                    'Brochure & Print Advertising',
                                    'Website Development'
                                ].map((service) => (
                                    <li key={service} className="text-zinc-400 hover:text-white transition-colors text-sm cursor-default flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-zinc-700 group-hover:bg-amber-500 transition-colors"></span>
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Contact Info */}
                        <div className="lg:col-span-3">
                            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">Connect</h3>
                            <div className="space-y-4">
                                <a href="mailto:creativepluzsalem@gmail.com" className="flex items-center space-x-3 text-zinc-400 hover:text-white transition-colors group text-sm">
                                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-amber-500/10">
                                        <Mail className="w-4 h-4 group-hover:text-amber-400" />
                                    </div>
                                    <span>creativepluzsalem@gmail.com</span>
                                </a>

                                <div className="flex items-start space-x-3 text-zinc-400 group text-sm">
                                    <div className="p-2 bg-white/5 rounded-lg shrink-0">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span>
                                        #7/2, 1st Floor, S.S. Plaza, Advaitha Ashram Rd,<br />
                                        Nr. Nathan Hospital, <span className="text-white">SALEM - 636016</span>
                                    </span>
                                </div>

                                <a href="tel:+919363024021" className="flex items-center space-x-3 text-zinc-400 hover:text-white transition-colors group text-sm">
                                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-amber-500/10">
                                        <Phone className="w-4 h-4 group-hover:text-amber-400" />
                                    </div>
                                    <span>+91 93630 24021</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 3. Bottom Bar */}
                    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                        <div className="space-y-2">
                            <p className="text-zinc-500 text-xs">
                                © {currentYear} Creative Pluz. Salem Branch.
                            </p>
                            <p className="text-xs text-zinc-600">
                                Powered by <a href="https://nkmoderntechnology.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-zinc-500 hover:text-amber-400 transition-colors">NK modern Technology</a>
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-zinc-400 transition-all duration-300 hover:scale-110 hover:bg-white/10 ${social.color}`}
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
}