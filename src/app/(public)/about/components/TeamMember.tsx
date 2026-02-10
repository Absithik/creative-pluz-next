'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import Magnetic from '@/components/Magnetic';

interface TeamMemberProps {
    member: {
        name: string;
        role: string;
        experience: string;
        image: string;
        bio: string;
    };
    delay: number;
}

export default function TeamMember({ member, delay }: TeamMemberProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="group cursor-none"
        >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-8 bg-brand-gray border border-white/5 shadow-xl">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                    <p className="text-white/80 text-sm leading-relaxed mb-6 font-medium italic">"{member.bio}"</p>
                    <div className="flex gap-5">
                        <Magnetic strength={0.4}><Instagram className="w-5 h-5 text-brand-primary cursor-pointer hover:text-white transition-colors" /></Magnetic>
                        <Magnetic strength={0.4}><Linkedin className="w-5 h-5 text-brand-primary cursor-pointer hover:text-white transition-colors" /></Magnetic>
                        <Magnetic strength={0.4}><Twitter className="w-5 h-5 text-brand-primary cursor-pointer hover:text-white transition-colors" /></Magnetic>
                    </div>
                </div>
            </div>
            <div className="px-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-display font-bold text-white group-hover:text-brand-primary transition-colors uppercase italic">{member.name}</h3>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-brand-primary text-black rounded-full">
                        {member.experience}
                    </span>
                    <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[9px]">{member.role}</p>
                </div>
            </div>
        </motion.div>
    );
}
