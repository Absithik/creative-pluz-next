'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Project } from './types';
import { useAnimation } from './AnimationContext.client';
import ProjectImage from './ProjectImage.client';
import RoundCTA from './RoundCTA.client';

interface ProjectItemProps {
    project: Project;
    index: number;
}

export default function ProjectItem({ project, index }: ProjectItemProps) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const { sectionProgress, activeSection } = useAnimation();
    const currentProgress = sectionProgress[index] || 0;
    const isActive = activeSection === index;

    // Opacity can still be scroll-driven via spring if desired, 
    // or we can let 'animate' handle it too.
    // The original code had specific scroll-driven opacity fade in/out [0, 0.2, 0.8, 1] -> [0, 1, 1, 0]
    // This implies it fades in, stays, then fades out as you scroll past.
    // 'isActive' is binary (active or not).
    // I will keep the scroll-driven opacity because it's richer than binary active/inactive.

    const headingOpacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0, 1, 1, 0]
    );

    const smoothHeadingOpacity = useSpring(headingOpacity, { stiffness: 100, damping: 30 });

    return (
        <motion.section
            ref={ref}
            id={`project-${project.id}`}
            data-scroll-time={index === 0 ? "1.3" : undefined}
            className="section pp"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
        >
            {/* LEFT COLUMN: Image */}
            <div className="pp-image-wrapper">
                <ProjectImage
                    projectId={project.id}
                    imageClass={project.imageClass}
                    imageUrl={project.imageUrl}
                    sectionIndex={index}
                    initialScale={project.imageScale || 1}
                />
            </div>

            {/* RIGHT COLUMN: Content */}
            <div className="pp-content-div">

                {/* Round CTA Button - Positioned relative to this column now */}
                <RoundCTA
                    project={project}
                    index={index}
                    currentProgress={currentProgress}
                />

                {/* Project Type */}
                <div className="type-div">
                    <motion.div
                        className="label-text"
                        style={{ opacity: smoothHeadingOpacity }}
                        animate={{
                            x: isActive ? 0 : -30, // Simplified animation
                            opacity: isActive ? 1 : 0
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 30 }}
                    >
                        {project.projectTypeFull}
                    </motion.div>
                </div>

                {/* Project Title - Background */}
                <motion.div
                    className="pp-h-div back"
                    style={{
                        opacity: smoothHeadingOpacity,
                        skew: project.headingTransform.skew
                    }}
                    animate={{
                        x: isActive ? 0 : 50, // Simplified motion relative to center
                        y: isActive ? 0 : 50,
                        opacity: isActive ? project.headingTransform.opacity : 0
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 30, delay: index * 0.05 }}
                >
                    <h2 className="heading-1 home">{project.title}</h2>
                </motion.div>

                {/* Project Title - Foreground */}
                <motion.div
                    className="pp-h-div"
                    style={{
                        opacity: smoothHeadingOpacity,
                        skew: project.headingTransform.skew
                    }}
                    animate={{
                        x: isActive ? 0 : 50,
                        y: isActive ? 0 : 50,
                        opacity: isActive ? 1 : 0
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 30, delay: index * 0.05 + 0.1 }}
                >
                    <h2 className="heading-1 front home">{project.title}</h2>
                </motion.div>

                {/* Project Number */}
                <div className="no-div">
                    <motion.div
                        className="no"
                        animate={{
                            x: isActive ? 0 : 50
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 30 }}
                        whileHover={{ scale: 1.2 }}
                    >
                        {project.number}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
