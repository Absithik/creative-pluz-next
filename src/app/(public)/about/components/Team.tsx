import React from 'react';
import TeamMember from './TeamMember';

export default function Team() {
    const team = [
        {
            name: "S. Sathish",
            role: "Founder",
            experience: "25+ Years",
            image: "/assets/images/about/team/C_PLUS 1080 x 1350 SM_01.png",
            bio: "Visionary leader with 25 years of excellence in designing and printing."
        },
        {
            name: "Hari",
            role: "Creator",
            experience: "10+ Years",
            image: "/assets/images/about/team/C_PLUS 1080 x 1350 SM_02.png",
            bio: "Supporting strong creative execution backed by a decade of experience."
        },
        {
            name: "Swaminathan",
            role: "Operations & Execution",
            experience: "10+ Years",
            image: "/assets/images/about/team/C_PLUS 1080 x 1350 SM_03.png",
            bio: "Experienced professional with 10 years of expertise handling operations and execution."
        },
        {
            name: "Vinoth",
            role: "Creator",
            experience: "9+ Years",
            image: "/assets/images/about/team/C_PLUS 1080 x 1350 SM_04.png",
            bio: "Driving innovative design ideas with 9 years of creative experience."
        },
        {
            name: "Gopi",
            role: "Creator",
            experience: "10+ Years",
            image: "/assets/images/about/team/C_PLUS 1080 x 1350 SM_05.png",
            bio: "Transforming concepts into visuals with 10 years of industry expertise."
        },

        {
            name: "Diwakar",
            role: "Junior Creator",
            experience: "1+ Years",
            image: "/assets/images/about/team/C_PLUS 1080 x 1350 SM_06.png",
            bio: "A growing creative professional with 1+ years of hands-on experience."
        },

    ];

    return (
        <div className="mb-40 max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <div>
                    <span className="text-brand-primary font-bold tracking-[0.5em] uppercase text-[10px] mb-4 block">
                        The Collective
                    </span>

                    <h2 className="text-6xl md:text-[8vw] font-display font-black text-white uppercase italic leading-[0.8]">
                        Our <br /> <span className="text-brand-primary">Team.</span>
                    </h2>
                </div>

                <div className="max-w-md text-right">
                    <p className="text-slate-500 font-medium leading-relaxed">
                        A passionate team of creative professionals dedicated to delivering
                        high-quality design and printing solutions with expertise and innovation.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, i) => (
                    <TeamMember key={i} member={member} delay={i * 0.1} />
                ))}
            </div>
        </div>
    );
}
