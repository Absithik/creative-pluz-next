import Image from 'next/image';
import { Destination } from '../types';

interface DestinationCardProps {
    destination: Destination;
    isActive: boolean;
    onClick: () => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
    destination,
    isActive,
    onClick
}) => {
    return (
        <div
            onClick={onClick}
            className={`relative cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden rounded-[2rem] group
        ${isActive
                    ? 'w-[280px] md:w-[320px] lg:w-[380px] h-[350px] md:h-[450px] lg:h-[550px] opacity-100 shadow-[0_40px_100px_rgba(0,0,0,0.8)]'
                    : 'w-[180px] md:w-[220px] lg:w-[260px] h-[300px] md:h-[400px] lg:h-[500px] opacity-40 scale-95 translate-y-4 font-normal'
                }
      `}
        >
            <Image
                src={destination.imageUrl}
                alt={destination.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
            />

            {/* Premium Gradient Overlay */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? 'opacity-40' : 'opacity-80'} bg-black`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* ACTIVE STATE ACCENT */}
            {isActive && (
                <div className="absolute top-0 left-0 w-full h-2 bg-brand-primary/50 blur-[20px]" />
            )}

            <div className={`absolute bottom-10 left-10 right-10 transition-all duration-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <div className="flex flex-col gap-2">
                    {/* Subtitle with accent */}
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-[1px] bg-brand-primary shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-primary">
                            {destination.subtitle}
                        </p>
                    </div>
                    {/* Title */}
                    <h3 className="font-sans font-black text-2xl md:text-3xl leading-none text-white tracking-widest uppercase mb-2">
                        {destination.title}
                    </h3>
                    {/* Extra bit if active */}
                    <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-medium">
                        View Details — {destination.bestTime || "2026"}
                    </p>
                </div>
            </div>

            {/* INACTIVE LABEL (visible when not active) */}
            {!isActive && (
                <div className="absolute inset-x-0 bottom-10 flex flex-col items-center group-hover:translate-y-[-10px] transition-transform duration-500">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                        {destination.id.padStart(2, '0')}
                    </span>
                    <div className="w-[1px] h-8 bg-white/20 mt-2" />
                </div>
            )}
        </div>
    );
};
