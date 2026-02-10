import React from 'react';
import { Testimonial, TestimonialsColumn, TestimonialsHeader } from './TestimonialsClient';

// --- Static Data (Server Side) ---
const testimonialsData: Testimonial[] = [
    {
        text: "This team revolutionized our brand identity. The visuals are stunning and the strategy is spot on.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Briana Patton",
        role: "Marketing Director",
    },
    {
        text: "Implementing the new design system was smooth. The assets were perfectly organized and easy to use.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Bilal Ahmed",
        role: "Product Owner",
    },
    {
        text: "Exceptional creativity. They guided us through the rebranding process with patience and expertise.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Saman Malik",
        role: "Founder",
    },
    {
        text: "The website redesign significantly enhanced our user engagement. Highly recommend their UX services.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Omar Raza",
        role: "CEO",
    },
    {
        text: "Robust design language and quick turnaround. Transformed how our customers perceive our products.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Zainab Hussain",
        role: "Brand Manager",
    },
    {
        text: "Exceeded expectations. The social media campaign they designed went viral within days.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Aliza Khan",
        role: "Social Lead",
    },
    {
        text: "Our visual presence improved drastically. User-friendly designs and positive feedback from all stakeholders.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Farhan Siddiqui",
        role: "Director",
    },
    {
        text: "Delivered a solution that perfectly captured our vision. They truly understand modern aesthetics.",
        image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Sana Sheikh",
        role: "VP of Sales",
    },
    {
        text: "Conversions improved significantly after the UI overhaul. A fantastic investment for our business.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100",
        name: "Hassan Ali",
        role: "E-commerce Mgr",
    },
];

const firstColumn = testimonialsData.slice(0, 3);
const secondColumn = testimonialsData.slice(3, 6);
const thirdColumn = testimonialsData.slice(6, 9);

const Testimonials = () => {
    return (
        <section className="relative w-full py-32 overflow-hidden border-t border-white/5 bg-brand-dark">
            {/* Background Elements (Static - Server Side Rendered) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-primary/5 rounded-[100%] blur-[120px] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-6">

                {/* Animated Header (Client Component) */}
                <TestimonialsHeader />

                {/* Marquee Grid */}
                <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[600px] overflow-hidden">
                    <TestimonialsColumn
                        testimonials={firstColumn}
                        duration={25}
                        className="w-full max-w-[350px]"
                    />
                    <TestimonialsColumn
                        testimonials={secondColumn}
                        className="hidden md:block w-full max-w-[350px] pt-12"
                        duration={35}
                    />
                    <TestimonialsColumn
                        testimonials={thirdColumn}
                        className="hidden lg:block w-full max-w-[350px]"
                        duration={30}
                    />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;