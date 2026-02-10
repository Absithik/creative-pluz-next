'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
    Plus, Edit, Eye, Trash2, Palette, Grid,
    Image as ImageIcon, Loader2, RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Artifact {
    _id: string;
    title: string;
    description: string;
    image: {
        url: string;
        alt: string;
    };
    link: {
        url: string;
        text: string;
    };
    position: {
        order: number;
        mdColSpan?: number;
        mdRowSpan?: number;
    };
    order?: number; // Keep for fallback compatibility
    status: 'draft' | 'published' | 'archived';
}

export default function ArtifactWallPage() {
    const router = useRouter();
    const [artifacts, setArtifacts] = useState<Artifact[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchArtifacts();
    }, []);

    const fetchArtifacts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/admin/artifacts'); // Returns all artifacts
            if (!response.ok) throw new Error('Failed to fetch artifacts');
            const result = await response.json();
            if (result.success) {
                setArtifacts(result.data);
            }
        } catch (error) {
            console.error('Error fetching artifacts:', error);
            toast.error('Failed to load artifacts');
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to get artifact by mapped order (0-8)
    const getArtifact = (index: number) => {
        return artifacts.find(a => (a.position?.order ?? a.order) === index) || null;
    };

    const renderSlotContent = (index: number) => {
        const artifact = getArtifact(index);
        const slotNumber = index + 1;

        if (!artifact) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 text-gray-400 p-4 relative group">
                    <span className="absolute top-4 left-4 font-bold text-2xl text-gray-300">#{slotNumber}</span>
                    <Plus className="w-8 h-8 mb-2 group-hover:text-blue-500 transition-colors" />
                    <span className="text-sm font-medium">Empty Slot</span>
                    <Link
                        href={`/admin/artifact-wall/create?order=${index}`}
                        className="absolute inset-0 z-10"
                        title="Add Artifact to this slot"
                    />
                </div>
            );
        }

        return (
            <div className="relative w-full h-full group">
                {/* Image */}
                <div className={`relative w-full h-full ${index === 0 || index === 6 ? 'p-8' : ''}`}>
                    <Image
                        src={artifact.image.url}
                        alt={artifact.image.alt}
                        fill
                        className={`object-cover ${index === 0 ? "object-contain" : index === 6 ? "object-contain mix-blend-multiply" : ""} ${artifact.status === 'draft' ? 'opacity-50 grayscale' : ''}`}
                    />
                </div>

                {/* Overlay Info */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 z-20">
                    <span className="absolute top-4 left-4 font-bold text-2xl text-white/20">#{slotNumber}</span>
                    <p className="font-bold text-lg mb-1">{artifact.title}</p>
                    <p className="text-xs text-center text-gray-300 mb-4 line-clamp-2">{artifact.description}</p>

                    <div className="flex items-center gap-2">
                        <Link
                            href={`/admin/artifact-wall/${artifact._id}/edit`}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-brand-primary hover:text-white rounded-full text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                            <Edit size={14} /> Change Image
                        </Link>
                    </div>
                    {artifact.status === 'draft' && <span className="mt-2 text-xs bg-yellow-500 text-black px-2 py-1 rounded">DRAFT</span>}
                </div>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 text-black">
            <div className="max-w-[1920px] mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Artifact Wall Manager</h1>
                        <p className="text-gray-600 mt-1">Manage the 9 fixed slots of your showcase</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={fetchArtifacts} className="p-2 bg-white border rounded hover:bg-gray-50" title="Refresh">
                            <RefreshCw size={18} />
                        </button>
                    </div>
                </div>

                {/* The Grid - Exact Mirror of User Component */}
                <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[1800px] lg:h-[1200px]"> {/* Adjusted height for Admin view ease */}

                        {/* 1. Large Feature */}
                        <div id="slot-0" className="md:col-span-8 md:row-span-2 bg-[#E31E24] relative overflow-hidden min-h-[300px] border border-gray-100">
                            {renderSlotContent(0)}
                        </div>

                        {/* 2. Tactical Slim */}
                        <div id="slot-1" className="md:col-span-4 md:row-span-1 bg-[#222222] relative overflow-hidden min-h-[200px] border border-gray-100">
                            {renderSlotContent(1)}
                        </div>

                        {/* 3. Vertical Tech */}
                        <div id="slot-2" className="md:col-span-4 md:row-span-2 bg-[#4CAF50] relative overflow-hidden min-h-[400px] border border-gray-100">
                            {renderSlotContent(2)}
                        </div>

                        {/* 4. Horizontal Mid */}
                        <div id="slot-3" className="md:col-span-5 md:row-span-1 bg-slate-100 relative overflow-hidden min-h-[200px] border border-gray-100">
                            {renderSlotContent(3)}
                        </div>

                        {/* 5. Square Accent */}
                        <div id="slot-4" className="md:col-span-3 md:row-span-1 bg-[#6366f1] relative overflow-hidden min-h-[200px] border border-gray-100">
                            {renderSlotContent(4)}
                        </div>

                        {/* 6. Wide Banner */}
                        <div id="slot-5" className="md:col-span-8 md:row-span-1 bg-[#f97316] relative overflow-hidden min-h-[200px] border border-gray-100">
                            {renderSlotContent(5)}
                        </div>

                        {/* 7. Identity Block */}
                        <div id="slot-6" className="md:col-span-4 md:row-span-2 bg-white relative overflow-hidden min-h-[300px] border-4 border-gray-100">
                            {renderSlotContent(6)}
                        </div>

                        {/* 8. Dark Accent */}
                        <div id="slot-7" className="md:col-span-3 md:row-span-1 bg-[#333333] relative overflow-hidden min-h-[200px] border border-gray-100">
                            {renderSlotContent(7)}
                        </div>

                        {/* 9. Slim Footer Item */}
                        <div id="slot-8" className="md:col-span-5 md:row-span-1 bg-slate-800 relative overflow-hidden min-h-[200px] border border-gray-100">
                            {renderSlotContent(8)}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
