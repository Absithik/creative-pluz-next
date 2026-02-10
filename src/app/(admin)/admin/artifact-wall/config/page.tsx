'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Palette, Grid, MousePointer, Layout } from 'lucide-react';
import toast from 'react-hot-toast';

interface ArtifactWallConfig {
    title: string;
    subtitle: string;
    archiveLink: string;
    gridHeight: {
        mobile: string;
        desktop: string;
        largeDesktop: string;
    };
    hoverEffect: {
        enabled: boolean;
        scale: number;
    };
    maxItems: number;
}

export default function ArtifactWallConfigPage() {
    const router = useRouter();
    const [config, setConfig] = useState<ArtifactWallConfig>({
        title: 'Selected',
        subtitle: 'Artifacts.',
        archiveLink: '/portfolio',
        gridHeight: {
            mobile: 'auto',
            desktop: '300vh',
            largeDesktop: '220vh'
        },
        hoverEffect: {
            enabled: true,
            scale: 0.99
        },
        maxItems: 9
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/admin/artifact-wall-config');

            if (!response.ok) {
                throw new Error('Failed to fetch config');
            }

            const result = await response.json();
            if (result.success) {
                setConfig(result.data);
            }
        } catch (error) {
            console.error('Error fetching config:', error);
            toast.error('Failed to load configuration');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);

            const response = await fetch('/api/admin/artifact-wall-config', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to save config');
            }

            toast.success('Configuration saved successfully');
        } catch (error) {
            console.error('Error saving config:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to save configuration');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading configuration...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Artifact Wall Configuration</h1>
                            <p className="text-gray-600 mt-1">Customize how your artifact wall appears</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => router.push('/admin/artifact-wall')}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                <X size={16} />
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Configuration Form */}
                <div className="space-y-6">
                    {/* Text Configuration */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Palette size={18} />
                            Text Configuration
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={config.title}
                                    onChange={(e) => setConfig({ ...config, title: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subtitle
                                </label>
                                <input
                                    type="text"
                                    value={config.subtitle}
                                    onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Archive Link
                                </label>
                                <input
                                    type="text"
                                    value={config.archiveLink}
                                    onChange={(e) => setConfig({ ...config, archiveLink: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="/portfolio"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Grid Configuration */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Grid size={18} />
                            Grid Settings
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile Height
                                </label>
                                <input
                                    type="text"
                                    value={config.gridHeight.mobile}
                                    onChange={(e) => setConfig({
                                        ...config,
                                        gridHeight: { ...config.gridHeight, mobile: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="auto"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Desktop Height
                                </label>
                                <input
                                    type="text"
                                    value={config.gridHeight.desktop}
                                    onChange={(e) => setConfig({
                                        ...config,
                                        gridHeight: { ...config.gridHeight, desktop: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="300vh"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Large Desktop Height
                                </label>
                                <input
                                    type="text"
                                    value={config.gridHeight.largeDesktop}
                                    onChange={(e) => setConfig({
                                        ...config,
                                        gridHeight: { ...config.gridHeight, largeDesktop: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="220vh"
                                />
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Maximum Items
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={config.maxItems}
                                    onChange={(e) => setConfig({
                                        ...config,
                                        maxItems: parseInt(e.target.value)
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Maximum number of artifacts to display in the wall
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hover Effects */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <MousePointer size={18} />
                            Hover Effects
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Enable Hover Effects
                                    </label>
                                    <p className="text-sm text-gray-500">Enable or disable hover animations</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={config.hoverEffect.enabled}
                                        onChange={(e) => setConfig({
                                            ...config,
                                            hoverEffect: { ...config.hoverEffect, enabled: e.target.checked }
                                        })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Hover Scale
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="1.5"
                                        step="0.01"
                                        value={config.hoverEffect.scale}
                                        onChange={(e) => setConfig({
                                            ...config,
                                            hoverEffect: { ...config.hoverEffect, scale: parseFloat(e.target.value) }
                                        })}
                                        className="flex-1"
                                    />
                                    <span className="text-sm font-medium text-gray-700 w-16">
                                        {config.hoverEffect.scale.toFixed(2)}x
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>0.5x</span>
                                    <span>1.0x</span>
                                    <span>1.5x</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Layout size={18} />
                            Live Preview
                        </h2>
                        <div className="bg-gray-50 rounded-lg p-8">
                            <div className="max-w-4xl mx-auto">
                                {/* Preview Header */}
                                <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                                    <div className="max-w-2xl">
                                        <h3 className="text-4xl font-black text-blue-600 uppercase leading-[0.85] italic tracking-tighter">
                                            {config.title} <br /> <span className="text-gray-400">{config.subtitle}</span>
                                        </h3>
                                    </div>
                                    <div className="group mt-4 md:mt-0 flex items-center gap-4 text-gray-800 font-black uppercase tracking-widest text-sm">
                                        View Archive
                                        <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                            →
                                        </div>
                                    </div>
                                </div>

                                {/* Preview Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 min-h-[200px]">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className={`md:col-span-${i === 1 ? '8 md:row-span-2' : '4'} bg-gray-300 rounded-lg h-32 md:h-48 border-2 border-dashed border-gray-400 flex items-center justify-center`}
                                            style={{
                                                transform: config.hoverEffect.enabled ? 'scale(1)' : 'none',
                                                transition: 'transform 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (config.hoverEffect.enabled) {
                                                    e.currentTarget.style.transform = `scale(${config.hoverEffect.scale})`;
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (config.hoverEffect.enabled) {
                                                    e.currentTarget.style.transform = 'scale(1)';
                                                }
                                            }}
                                        >
                                            <div className="text-center">
                                                <div className="text-gray-500 text-sm">Artifact {i}</div>
                                                <div className="text-xs text-gray-400 mt-1">
                                                    {i === 1 ? '8×2' : '4×1'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
