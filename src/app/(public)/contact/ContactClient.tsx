'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight, ChevronDown, Clock, CheckCircle, ShieldCheck } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@/components/Button';
import { motion, AnimatePresence } from 'framer-motion';
// 1. UPDATED IMPORTS TO MATCH THE "HERO" STYLE (Syne + Inter)
import { Syne, Inter } from 'next/font/google';

// 2. CONFIGURE FONTS
// Syne is the font used in the previous "Hero" example for that "Black Italic" look
const syne = Syne({
    subsets: ['latin'],
    variable: '--font-display',
    weight: ['400', '700', '800']
});
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter'
});

// --- Types ---
type FormInputs = {
    name: string;
    email: string;
    phone: string;
    budget: string;
    message: string;
};

const faqs = [
    {
        question: "What is the typical timeline for a project?",
        answer: "Speed varies by scope. A standard branding or landing page project takes 2-4 weeks. Full-scale custom web development typically requires 8-12 weeks to ensure rigorous testing and optimization."
    },
    {
        question: "Do you work with international clients?",
        answer: "Absolutely. While HQ is in Salem, 60% of our client base is international (USA, UK, UAE). We align our communication hours to your timezone for seamless collaboration."
    },
    {
        question: "Do you offer post-launch maintenance?",
        answer: "We don't leave you hanging. We offer flexible AMC (Annual Maintenance Contracts) that cover security updates, content changes, and server monitoring to keep your digital asset secure."
    },
    {
        question: "What are your payment terms?",
        answer: "We operate on a milestone basis: 50% advance to book the schedule, and 50% upon successful project completion and sign-off, prior to final deployment."
    }
];

const ContactClient: React.FC = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInputs>();
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log(data);
        alert("Request received. We will be in touch shortly.");
    };

    return (
        // 3. APPLY FONT VARIABLES
        <main className={`${inter.variable} ${syne.variable} font-sans bg-[#0B0D10] min-h-screen selection:bg-brand-primary selection:text-white overflow-hidden`}>

            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] opacity-60" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] opacity-40" />
            </div>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-32 pb-24">

                {/* --- Section 1: Hero & Form --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32">

                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7 flex flex-col justify-center"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit mb-6">
                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                            {/* UPDATED STYLE: Tracking 0.3em */}
                            <span className="text-brand-primary font-bold text-xs uppercase tracking-[0.2em] font-sans">Accepting New Projects</span>
                        </div>

                        {/* UPDATED STYLE: Font Display, Black, Uppercase, Italic */}
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white mb-8 uppercase italic leading-none">
                            Let's Build <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-white to-brand-primary bg-[length:200%_auto] animate-shine">
                                Something Iconic.
                            </span>
                        </h2>

                        {/* UPDATED STYLE: Added left border and padding to match Hero example */}
                        <p className="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed border-l-4 border-brand-primary pl-6 font-sans">
                            Ready to dominate your market? Our strategy team is ready to analyze your needs.
                            Fill out the form for a consultation within 24 hours.
                        </p>

                        {/* Trust Signals */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
                            <div>
                                {/* UPDATED STYLE: Italic Display Font */}
                                <h3 className="text-4xl font-display font-black italic text-white mb-1">500+</h3>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Projects Delivered</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-display font-black italic text-white mb-1">24h</h3>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Response Time</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-display font-black italic text-white mb-1">100%</h3>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Client Satisfaction</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: The Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5"
                    >
                        <div className="relative bg-[#16181D]/90 backdrop-blur-xl p-8 md:p-10 border border-white/10 rounded-3xl shadow-2xl">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-5">
                                    <div className="group">
                                        {/* UPDATED LABEL: Tracking 0.2em */}
                                        <label className="block text-xs font-bold text-brand-primary uppercase tracking-[0.2em] mb-2 font-sans">Name</label>
                                        <input
                                            {...register("name", { required: true })}
                                            className="w-full bg-[#0B0D10] border border-white/10 rounded-none px-4 py-4 text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all placeholder:text-slate-600 text-lg font-sans"
                                            placeholder="John Doe"
                                        />
                                        {errors.name && <span className="text-red-500 text-xs mt-1">Name is required</span>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-bold text-brand-primary uppercase tracking-[0.2em] mb-2 font-sans">Email</label>
                                            <input
                                                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                                className="w-full bg-[#0B0D10] border border-white/10 rounded-none px-4 py-4 text-white focus:border-brand-primary outline-none transition-all placeholder:text-slate-600 font-sans"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-brand-primary uppercase tracking-[0.2em] mb-2 font-sans">Phone</label>
                                            <input
                                                {...register("phone")}
                                                className="w-full bg-[#0B0D10] border border-white/10 rounded-none px-4 py-4 text-white focus:border-brand-primary outline-none transition-all placeholder:text-slate-600 font-sans"
                                                placeholder="+91..."
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-brand-primary uppercase tracking-[0.2em] mb-2 font-sans">Project Budget</label>
                                        <select
                                            {...register("budget", { required: true })}
                                            className="w-full bg-[#0B0D10] border border-white/10 rounded-none px-4 py-4 text-white focus:border-brand-primary outline-none transition-all appearance-none cursor-pointer font-sans"
                                        >
                                            <option value="" className="text-slate-500">Select Investment Range...</option>
                                            <option value="10-25k">₹50k - ₹1 Lakh</option>
                                            <option value="25-50k">₹1 Lakh - ₹3 Lakhs</option>
                                            <option value="50-100k">₹3 Lakhs - ₹5 Lakhs</option>
                                            <option value="100k+">₹5 Lakhs+</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-brand-primary uppercase tracking-[0.2em] mb-2 font-sans">Message</label>
                                        <textarea
                                            {...register("message", { required: true })}
                                            rows={4}
                                            className="w-full bg-[#0B0D10] border border-white/10 rounded-none px-4 py-4 text-white focus:border-brand-primary outline-none transition-all placeholder:text-slate-600 resize-none font-sans"
                                            placeholder="Tell us about your project goals..."
                                        ></textarea>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-brand-primary hover:bg-white hover:text-black text-white py-5 rounded-none font-bold font-sans uppercase tracking-[0.2em] text-sm transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(var(--brand-primary-rgb),0.3)]"
                                >
                                    {isSubmitting ? 'Sending...' : 'Start Conversation'}
                                    {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </div>

                {/* --- Section 2: Contact Info Grid --- */}
                <section className="mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ContactCard
                            icon={<Mail className="w-6 h-6" />}
                            title="Email Us"
                            content={<a href="mailto:creativepluzsalem@gmail.com" className="hover:text-brand-primary transition-colors">creativepluzsalem@gmail.com</a>}
                        />
                        <ContactCard
                            icon={<Phone className="w-6 h-6" />}
                            title="Call Us"
                            content={
                                <>
                                    <a href="tel:+919363024021" className="hover:text-brand-primary transition-colors block">+91 93630 24021</a>
                                    <a href="tel:+919363027021" className="hover:text-brand-primary transition-colors block mt-1">+91 93630 27021</a>
                                </>
                            }
                        />
                        <ContactCard
                            icon={<MapPin className="w-6 h-6" />}
                            title="Visit HQ"
                            content={
                                <address className="not-italic leading-relaxed">
                                    #7/2, 1st Floor, S.S. Plaza,<br />
                                    Advaitha Ashram Rd,<br />
                                    Salem - 636016, TN.
                                </address>
                            }
                        />
                        <ContactCard
                            icon={<Clock className="w-6 h-6" />}
                            title="Working Hours"
                            content={
                                <>
                                    <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                                    <p className="mt-1">Sat: 9:00 AM - 1:00 PM</p>
                                </>
                            }
                        />
                    </div>
                </section>

                {/* --- Section 3: FAQ & Map Split --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* FAQ for AEO */}
                    <div>
                        {/* UPDATED STYLE: Display Font, Black, Uppercase, Italic */}
                        <h2 className="text-4xl lg:text-5xl font-display font-black uppercase italic text-white mb-8 leading-none">
                            Common <span className="text-brand-primary">Questions</span>
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-white/10 pb-4 last:border-0">
                                    <button
                                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between text-left py-4 focus:outline-none group hover:bg-white/5 px-4 rounded-lg transition-colors"
                                    >
                                        {/* UPDATED STYLE: Bold Display */}
                                        <span className={`font-display font-bold text-lg pr-8 transition-colors ${activeIndex === index ? 'text-brand-primary' : 'text-white group-hover:text-brand-primary'}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${activeIndex === index ? 'border-brand-primary bg-brand-primary/10 rotate-180' : 'border-white/20 bg-white/5'}`}>
                                            <ChevronDown className={`w-4 h-4 ${activeIndex === index ? 'text-brand-primary' : 'text-slate-400'}`} />
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {activeIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-4 pb-4">
                                                    <p className="text-slate-400 leading-relaxed text-base border-l-2 border-brand-primary/30 pl-4 font-sans">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl flex items-start gap-4">
                            <ShieldCheck className="w-8 h-8 text-brand-primary flex-shrink-0" />
                            <div>
                                <h4 className="text-white font-bold font-display uppercase italic text-lg">Secure & Confidential</h4>
                                <p className="text-slate-400 text-sm mt-1 font-sans">We sign a Non-Disclosure Agreement (NDA) for every project to ensure your idea remains yours.</p>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Map */}
                    <div className="max-h-[600px] min-h-[400px] w-full m-auto rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 relative group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.643325752174!2d78.14601431481177!3d11.65330399172856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1ccf52cba0b%3A0x6b840812735749!2sAdvaitha%20Ashram%20Rd%2C%20Salem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1677654321098!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0"
                            title="Creative Pluz Office Location"
                        />
                        <div className="absolute inset-0 pointer-events-none group-hover:bg-transparent bg-brand-dark/20 transition-colors" />
                    </div>
                </div>

            </div>
        </main>
    );
};

// Helper Component for Cards
const ContactCard = ({ icon, title, content }: { icon: React.ReactNode, title: string, content: React.ReactNode }) => (
    <div className="bg-[#16181D] border border-white/5 p-8 rounded-2xl hover:border-brand-primary/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl">
        <div className="bg-brand-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors text-brand-primary">
            {icon}
        </div>
        {/* UPDATED STYLE: Display Font, Italic, Black */}
        <h3 className="text-white font-display font-black italic text-xl mb-3">{title}</h3>
        <div className="text-slate-400 text-sm font-sans">{content}</div>
    </div>
);

export default ContactClient;