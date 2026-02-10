'use client'; // This component needs to be client because of animations

import React from 'react';
import { motion } from 'framer-motion';
import './FeaturedWork.css';
import { FeaturedWorkProps } from './types';
import ProjectItem from './ProjectItem.client';
import ScrollProgress from './ScrollProgress.client';
import { AnimationProvider } from './AnimationContext.client';
import { useSmoothScroll } from './hooks/useSmoothScroll';
const image1 = '/assets/images/service/BROUCHURE/Creative%20pluz%202540%20x%203368.png_01.png';
const image2 = '/assets/images/service/BROUCHURE/Creative%20pluz%202540%20x%203368.png_02.png';
const image3 = '/assets/images/service/BROUCHURE/Creative%20pluz%202540%20x%203368.png_03.png';
const image4 = '/assets/images/service/BROUCHURE/Creative%20pluz%202540%20x%203368.png_06.png'; // Substituting for missing _04
const image5 = '/assets/images/service/BROUCHURE/Creative%20pluz%202540%20x%203368.png_05.png'; // Large file
const image6 = '/assets/images/service/BROUCHURE/Creative%20pluz%202540%20x%203368.png_06.png';

const projectsData = [
    {
        id: 'opoint',
        number: '01',
        title: 'opoint',
        projectType: 'WEBSITE',
        projectTypeFull: 'IDENTITY + WEBSITE',
        // Using correct path checked from directory
        imageUrl: image1,
        imageClass: '',
        link: '/work/o-point',
        buttonClass: '',
        buttonPosition: {
            translateX: '-8.99728vw',
            translateY: '7.77092vh'
        },
        textRotation: 36.8748,
        imageScale: 1.24998,
        headingTransform: {
            translateX: '10.0015vw',
            translateY: '20vh',
            skew: '-5deg',
            opacity: 0
        },
        numberTransform: {
            translateX: '-11.9968vh'
        },
        labelTransform: {
            translateX: '29.994px'
        }
    },
    {
        id: 'spyscape',
        number: '02',
        title: 'SPYSCAPE',
        projectType: 'WEBSITE',
        projectTypeFull: 'WEBSITE',
        imageUrl: image2,
        imageClass: '_7',
        link: '/work/007xspyscape',
        buttonClass: '_10',
        buttonPosition: {
            translateX: '-8.99728vw',
            translateY: '9.1691vh'
        },
        textRotation: 352.8,
        imageScale: 1.13812,
        headingTransform: {
            translateX: '16.7127vw',
            translateY: '0vh',
            skew: '0deg',
            opacity: 1
        },
        numberTransform: {
            translateX: '2.32032vh'
        },
        labelTransform: {
            translateX: '3.1494px'
        }
    },
    {
        id: 'le-vermeil',
        number: '03',
        title: 'LE VERMEIL',
        projectType: 'IDENTITY',
        projectTypeFull: 'IDENTITY + WEBSITE',
        imageUrl: image3,
        imageClass: '_3',
        link: '/work/le-vermeil',
        buttonClass: '_3',
        buttonPosition: {
            translateX: '-8.99728vw',
            translateY: '7.77092vh'
        },
        textRotation: 36.8748,
        imageScale: 1,
        headingTransform: {
            translateX: '25vw',
            translateY: '20vh',
            skew: '-5deg',
            opacity: 0
        },
        numberTransform: {
            translateX: '20vh'
        },
        labelTransform: {
            translateX: '-30px'
        }
    },
    {
        id: 'chiro-actif',
        number: '04',
        title: 'CHIRO ACTIF',
        projectType: 'IDENTITY',
        projectTypeFull: 'IDENTITY',
        imageUrl: image4,
        imageClass: '_4',
        link: '/work/chiro-actif',
        buttonClass: '_4',
        buttonPosition: {
            translateX: '-8.99728vw',
            translateY: '7.77092vh'
        },
        textRotation: 36.8748,
        imageScale: 1,
        headingTransform: {
            translateX: '25vw',
            translateY: '20vh',
            skew: '-5deg',
            opacity: 0
        },
        numberTransform: {
            translateX: '20vh'
        },
        labelTransform: {
            translateX: '-30px'
        }
    },
    {
        id: 'northand',
        number: '05',
        title: 'NORTHAND',
        projectType: 'WEBSITE',
        projectTypeFull: 'WEBSITE',
        imageUrl: image5,
        imageClass: '_8',
        link: '/work/northand-films',
        buttonClass: '_8',
        buttonPosition: {
            translateX: '-8.99728vw',
            translateY: '7.77092vh'
        },
        textRotation: 36.8748,
        imageScale: 1,
        headingTransform: {
            translateX: '25vw',
            translateY: '20vh',
            skew: '-5deg',
            opacity: 0
        },
        numberTransform: {
            translateX: '20vh'
        },
        labelTransform: {
            translateX: '-30px'
        }
    }
];

function FeaturedWorkContent({ projects = projectsData }: FeaturedWorkProps) {
    // Enable smooth scroll
    useSmoothScroll();

    return (
        <>
            <motion.div
                className="featured-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {projects.map((project, index) => (
                    <ProjectItem
                        key={project.id}
                        project={project}
                        index={index}
                    />
                ))}
            </motion.div>
            <ScrollProgress />
        </>
    );
}

export default function FeaturedWork(props: FeaturedWorkProps) {
    return (
        <AnimationProvider>
            <FeaturedWorkContent {...props} />
        </AnimationProvider>
    );
}
