// app/components/home/ArtifactWall/ArtifactWallHeader.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ArtifactWallConfig } from './constants';

interface ArtifactWallHeaderProps {
    config: ArtifactWallConfig;
}

export default function ArtifactWallHeader({ config }: ArtifactWallHeaderProps) {
    const { title = 'Selected', subtitle = 'Artifacts.', archiveLink = '/portfolio' } = config;

    return (
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16">
            <div className="max-w-2xl">
                <h2 className="text-3xl md:text-6xl lg:text-7xl font-display font-black text-brand-primary uppercase leading-[0.85] italic tracking-tighter">
                    {title} <br />
                    <span className="text-slate-400" aria-hidden="true">{subtitle}</span>
                </h2>
                <span className="sr-only">
                    {title} {subtitle}
                </span>
            </div>
            <Link
                href={archiveLink}
                className="group mt-6 md:mt-0 flex items-center gap-3 text-white font-bold uppercase tracking-widest text-sm transition-colors hover:text-brand-primary"
                aria-label="View all artifacts in archive"
                prefetch={false} // Don't prefetch archive
            >
                View Archive
                <div
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-brand-primary transition-colors duration-300"
                    aria-hidden="true"
                >
                    <ArrowRight size={16} />
                </div>
            </Link>
        </div>
    );
}