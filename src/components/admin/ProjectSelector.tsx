'use client';

import { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface ProjectSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (project: Project) => void;
}

export default function ProjectSelector({ isOpen, onClose, onSelect }: ProjectSelectorProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchProjects();
        }
    }, [isOpen]);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/projects?limit=100'); // Fetch enough to scroll
            const json = await res.json();
            if (json.success) {
                setProjects(json.data);
            }
        } catch (error) {
            console.error('Failed to fetch projects', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
                    >
                        <div className="bg-white pointer-events-auto w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">
                            <div className="p-4 border-b flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900">Select Project</h3>
                                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-4 border-b bg-gray-50">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search projects..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div className="overflow-y-auto p-4 space-y-2 flex-1">
                                {loading ? (
                                    <div className="text-center py-8 text-gray-500">Loading...</div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-2">
                                        {filteredProjects.map(project => (
                                            <button
                                                key={project._id}
                                                onClick={() => onSelect(project)}
                                                className="flex items-center gap-4 p-2 hover:bg-blue-50 rounded-lg border border-transparent hover:border-blue-200 transition-all text-left group"
                                            >
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 relative shrink-0">
                                                    <img
                                                        src={project.coverImage?.url || '/placeholder.jpg'}
                                                        alt={project.coverImage?.alt || project.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-gray-900 truncate group-hover:text-blue-700">
                                                        {project.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                                        <span>{project.category}</span>
                                                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${project.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                            }`}>
                                                            {project.status}
                                                        </span>
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                        {filteredProjects.length === 0 && !loading && (
                                            <div className="text-center py-8 text-gray-500">
                                                No projects found matching "{search}"
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
