'use client';

import { useState, useEffect } from 'react';
import { Plus, X, LayoutGrid, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ProjectSelector from './ProjectSelector';
import toast from 'react-hot-toast';

interface Project {
    _id: string;
    title: string;
    coverImage: {
        url: string;
        alt: string;
    };
    category: string;
    status: string;
    slug: string;
}

interface LayoutSlot {
    _id: string;
    slotIndex: number;
    project: Project | null;
}

const SLOT_CONFIG = [
    { type: 'large', label: 'Large (2x2)' },       // 0
    { type: 'standard', label: 'Standard (1x1)' }, // 1
    { type: 'vertical', label: 'Vertical (1x2)' }, // 2
    { type: 'standard', label: 'Standard (1x1)' }, // 3
    { type: 'standard', label: 'Standard (1x1)' }, // 4
    { type: 'large', label: 'Large (2x2)' },       // 5
    { type: 'standard', label: 'Standard (1x1)' }, // 6
    { type: 'standard', label: 'Standard (1x1)' }, // 7
];

export default function AdminLayoutGrid() {
    const [slots, setSlots] = useState<LayoutSlot[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const res = await fetch('/api/admin/layout-slots');
            const json = await res.json();
            if (json.success) {
                setSlots(json.data);
            } else {
                toast.error('Failed to load layout slots');
            }
        } catch (error) {
            toast.error('Error loading slots');
        } finally {
            setLoading(false);
        }
    };

    const handleAssignProject = async (project: Project) => {
        if (selectedSlotIndex === null) return;

        try {
            const res = await fetch('/api/admin/layout-slots', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slotIndex: selectedSlotIndex,
                    projectId: project._id
                })
            });

            const json = await res.json();
            if (json.success) {
                toast.success(`Assigned "${project.title}" to slot ${selectedSlotIndex + 1}`);
                fetchSlots(); // Refresh
                setSelectedSlotIndex(null);
            } else {
                toast.error(json.error || 'Assignment failed');
            }
        } catch (error) {
            toast.error('Failed to assign project');
        }
    };

    const handleRemoveProject = async (slotIndex: number) => {
        if (!confirm('Remove project from this slot?')) return;

        try {
            const res = await fetch('/api/admin/layout-slots', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slotIndex: slotIndex,
                    projectId: null
                })
            });

            const json = await res.json();
            if (json.success) {
                toast.success('Project removed from slot');
                fetchSlots();
            }
        } catch (error) {
            toast.error('Failed to remove project');
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading layout configuration...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <LayoutGrid size={24} />
                        Layout Manager
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Assign projects to fixed layout slots. Changes reflect immediately on the frontend.
                    </p>
                </div>
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] grid-flow-row-dense">
                {SLOT_CONFIG.map((config, index) => {
                    const slotData = slots.find(s => s.slotIndex === index);
                    const project = slotData?.project;

                    // Tailwind classes for layout based on type
                    let gridClass = '';
                    if (config.type === 'large') gridClass = 'md:col-span-2 md:row-span-2';
                    if (config.type === 'vertical') gridClass = 'md:row-span-2';

                    return (
                        <div
                            key={index}
                            className={`
                                relative group rounded-2xl border-2 border-dashed border-gray-300 
                                bg-gray-50 overflow-hidden transition-all hover:border-blue-400
                                flex flex-col items-center justify-center
                                ${gridClass}
                            `}
                        >
                            {/* Slot Label Badge */}
                            <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-mono text-gray-500 border border-gray-200 shadow-sm pointer-events-none">
                                Slot {index + 1}: {config.label}
                            </div>

                            {project ? (
                                // Assigned State
                                <>
                                    <img
                                        src={project.coverImage.url}
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                        <h3 className="text-white font-bold text-xl line-clamp-2">{project.title}</h3>
                                        <p className="text-white/70 text-sm">{project.category}</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setSelectedSlotIndex(index)}
                                            className="p-2 bg-white text-blue-600 rounded-full hover:bg-blue-50 shadow-sm"
                                            title="Change Project"
                                        >
                                            <Plus size={16} className="rotate-45" /> {/* Use Plus rotated as 'Change' icon implies swap/edit, or just use Plus icon again as 'Replace' */}
                                        </button>
                                        <button
                                            onClick={() => handleRemoveProject(index)}
                                            className="p-2 bg-white text-red-600 rounded-full hover:bg-red-50 shadow-sm"
                                            title="Remove Project"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                // Empty State
                                <div className="text-center p-4">
                                    <button
                                        onClick={() => setSelectedSlotIndex(index)}
                                        className="group-hover:scale-105 transition-transform flex flex-col items-center gap-3 text-gray-400 hover:text-blue-600"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-gray-200 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                                            <Plus size={24} />
                                        </div>
                                        <span className="font-medium text-sm">Assign Project</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <ProjectSelector
                isOpen={selectedSlotIndex !== null}
                onClose={() => setSelectedSlotIndex(null)}
                onSelect={handleAssignProject}
            />
        </div>
    );
}
