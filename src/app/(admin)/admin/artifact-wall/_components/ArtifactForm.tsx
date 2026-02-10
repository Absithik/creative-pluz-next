'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Save, X, Upload, Palette, Grid, Link as LinkIcon, Eye, Trash2, Lock } from 'lucide-react'
import toast from 'react-hot-toast'

// Cloudinary widget type (Copied from ProjectForm)
interface CloudinaryWidget {
    open: () => void
    close: (options?: { quiet?: boolean }) => void
}

declare global {
    interface Window {
        cloudinary?: {
            createUploadWidget: (
                options: any,
                callback: (error: Error | null, result: any) => void
            ) => CloudinaryWidget
        }
    }
}

// Fixed Layout Configuration
const FIXED_LAYOUTS = [
    { mdColSpan: 8, mdRowSpan: 2, label: 'Large Feature' },     // 0
    { mdColSpan: 4, mdRowSpan: 1, label: 'Tactical Slim' },     // 1
    { mdColSpan: 4, mdRowSpan: 2, label: 'Vertical Tech' },     // 2
    { mdColSpan: 5, mdRowSpan: 1, label: 'Horizontal Mid' },    // 3
    { mdColSpan: 3, mdRowSpan: 1, label: 'Square Accent' },     // 4
    { mdColSpan: 8, mdRowSpan: 1, label: 'Wide Banner' },       // 5
    { mdColSpan: 4, mdRowSpan: 2, label: 'Identity Block' },    // 6
    { mdColSpan: 3, mdRowSpan: 1, label: 'Dark Accent' },       // 7
    { mdColSpan: 5, mdRowSpan: 1, label: 'Slim Footer Item' },  // 8
];

// Validation Schema
const artifactSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
    description: z.string().min(1, 'Description is required').max(200, 'Description too long'),
    image: z.object({
        url: z.string().url('Valid URL required'),
        alt: z.string().min(1, 'Alt text required'),
        publicId: z.string().optional(),
        width: z.number().optional(),
        height: z.number().optional()
    }),
    position: z.object({
        mdColSpan: z.number().min(1).max(12),
        mdRowSpan: z.number().min(1).max(3),
        order: z.number()
    }),
    design: z.object({
        backgroundColor: z.string(),
        textColor: z.string(),
        customClass: z.string().optional()
    }),
    link: z.object({
        url: z.string().optional(),
        text: z.string()
    }),
    category: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean(),
    status: z.enum(['draft', 'published', 'archived'])
})

type ArtifactFormValues = z.infer<typeof artifactSchema>

interface ArtifactFormProps {
    initialId?: string;
    initialOrder?: number;
}

export default function ArtifactForm({ initialId, initialOrder }: ArtifactFormProps) {
    const router = useRouter()
    const params = useParams()
    const id = initialId || (params.id as string) || 'create'

    const [isLoading, setIsLoading] = useState(id !== 'create')
    const [isSaving, setIsSaving] = useState(false)
    const [tagInput, setTagInput] = useState('')
    const [isCloudinaryLoaded, setIsCloudinaryLoaded] = useState(false)
    const cloudinaryWidgetRef = useRef<CloudinaryWidget | null>(null)

    // Check if we are in a fixed slot (0-8)
    // If id is new, use initialOrder. If editing, use loaded order.
    // We will update this state when data loads.
    const [currentOrder, setCurrentOrder] = useState<number | undefined>(initialOrder);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm<ArtifactFormValues>({
        resolver: zodResolver(artifactSchema),
        defaultValues: {
            title: '',
            description: '',
            image: {
                url: '',
                alt: '',
                publicId: '',
                width: 0,
                height: 0
            },
            position: {
                mdColSpan: 4,
                mdRowSpan: 1,
                order: initialOrder ?? 0
            },
            design: {
                backgroundColor: '#000000',
                textColor: '#FFFFFF',
                customClass: ''
            },
            link: {
                url: '',
                text: 'Explore'
            },
            category: 'General',
            tags: [],
            featured: false,
            status: 'draft'
        }
    })

    const watchedValues = watch()

    // Load initial data
    useEffect(() => {
        if (id !== 'create') {
            fetchArtifact()
        } else if (initialOrder !== undefined) {
            // For new items with initialOrder, enforce the layout immediately
            enforceFixedLayout(initialOrder);
        }
    }, [id, initialOrder])

    // Helper to enforce layout based on order
    const enforceFixedLayout = (order: number) => {
        if (order >= 0 && order < FIXED_LAYOUTS.length) {
            const layout = FIXED_LAYOUTS[order];
            setValue('position.mdColSpan', layout.mdColSpan);
            setValue('position.mdRowSpan', layout.mdRowSpan);
            setValue('position.order', order);
            setCurrentOrder(order);
        }
    };

    const fetchArtifact = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`/api/admin/artifacts/${id}`)

            if (!response.ok) {
                throw new Error('Failed to fetch artifact')
            }

            const result = await response.json()
            if (result.success) {
                const data = result.data

                // Enforce layout consistency on load as well
                const order = data.position?.order ?? 0;
                let mdColSpan = data.position?.mdColSpan || 4;
                let mdRowSpan = data.position?.mdRowSpan || 1;

                if (order >= 0 && order < FIXED_LAYOUTS.length) {
                    const layout = FIXED_LAYOUTS[order];
                    mdColSpan = layout.mdColSpan;
                    mdRowSpan = layout.mdRowSpan;
                    setCurrentOrder(order);
                }

                reset({
                    ...data,
                    position: {
                        mdColSpan,
                        mdRowSpan,
                        order
                    },
                    link: {
                        url: data.link?.url || '',
                        text: data.link?.text || 'Explore'
                    },
                    design: {
                        backgroundColor: data.design?.backgroundColor || '#000000',
                        textColor: data.design?.textColor || '#FFFFFF',
                        customClass: data.design?.customClass || ''
                    }
                })
            }
        } catch (error) {
            console.error('Error fetching artifact:', error)
            toast.error('Failed to load artifact')
            router.push('/admin/artifact-wall')
        } finally {
            setIsLoading(false)
        }
    }

    // Check Cloudinary
    useEffect(() => {
        const checkCloudinary = () => {
            if (typeof window !== 'undefined' && (window as any).cloudinary) {
                setIsCloudinaryLoaded(true)
                return true
            }
            return false
        }

        if (checkCloudinary()) return

        const interval = setInterval(() => {
            if (checkCloudinary()) {
                clearInterval(interval)
            }
        }, 500)

        return () => clearInterval(interval)
    }, [])

    const handleImageUpload = () => {
        if (typeof window === 'undefined') {
            toast.error('Cannot upload from server-side')
            return
        }

        const cloudinary = (window as any).cloudinary
        if (!cloudinary) {
            toast.error('Cloudinary not loaded. Please refresh the page.')
            return
        }

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

        if (!cloudName || !uploadPreset) {
            toast.error('Cloudinary configuration missing.')
            return
        }

        try {
            const widget = cloudinary.createUploadWidget(
                {
                    cloudName,
                    uploadPreset,
                    sources: ['local', 'url', 'camera', 'image_search'],
                    multiple: false,
                    maxFiles: 1,
                    resourceType: 'image',
                    cropping: false, // Unlike project cover, artifacts might vary
                    theme: 'minimal',
                    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                    maxFileSize: 10000000, // 10MB
                    styles: {
                        palette: {
                            window: "#FFFFFF",
                            sourceBg: "#F4F4F5",
                            windowBorder: "#90A0B3",
                            tabIcon: "#000000",
                            inactiveTabIcon: "#555A5F",
                            menuIcons: "#555A5F",
                            link: "#2563EB",
                            action: "#2563EB",
                            inProgress: "#2563EB",
                            complete: "#10B981",
                            error: "#EF4444",
                            textDark: "#000000",
                            textLight: "#FFFFFF"
                        }
                    }
                },
                (error: any, result: any) => {
                    if (error) {
                        console.error('Cloudinary widget error:', error)
                        toast.error('Upload failed')
                        return
                    }

                    if (result && result.event === 'success') {
                        const imageData = {
                            url: result.info.secure_url,
                            publicId: result.info.public_id,
                            alt: result.info.original_filename || 'Artifact image',
                            width: result.info.width,
                            height: result.info.height
                        }
                        setValue('image', imageData, { shouldValidate: true, shouldDirty: true })
                        toast.success('Image uploaded successfully!')
                    }
                }
            )

            cloudinaryWidgetRef.current = widget
            widget.open()

        } catch (error) {
            console.error('Error creating Cloudinary widget:', error)
            toast.error('Failed to initialize upload')
        }
    }

    const handleAddTag = () => {
        if (tagInput.trim()) {
            const currentTags = watch('tags') || []
            if (!currentTags.includes(tagInput.trim())) {
                setValue('tags', [...currentTags, tagInput.trim()], { shouldValidate: true })
                setTagInput('')
            }
        }
    }

    const handleRemoveTag = (tag: string) => {
        const currentTags = watch('tags') || []
        setValue('tags', currentTags.filter(t => t !== tag), { shouldValidate: true })
    }

    const handleFormSubmit = async (data: ArtifactFormValues) => {
        try {
            setIsSaving(true)

            const url = id === 'create'
                ? '/api/admin/artifacts'
                : `/api/admin/artifacts/${id}`

            const method = id === 'create' ? 'POST' : 'PUT'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to save artifact')
            }

            toast.success(id === 'create' ? 'Artifact created successfully' : 'Artifact updated successfully')
            router.push('/admin/artifact-wall')
        } catch (error) {
            console.error('Error saving artifact:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to save artifact')
        } finally {
            setIsSaving(false)
        }
    }

    // Cleanup
    useEffect(() => {
        return () => {
            if (cloudinaryWidgetRef.current) {
                cloudinaryWidgetRef.current.close({ quiet: true })
            }
        }
    }, [])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    const isFixedLayout = currentOrder !== undefined && currentOrder >= 0 && currentOrder < FIXED_LAYOUTS.length;

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="min-h-screen text-black bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {id === 'create' ? 'Create New Artifact' : 'Edit Artifact'}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {id === 'create' ? 'Add a new item to your artifact wall' : 'Update artifact details'}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => router.push('/admin/artifact-wall')}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    {id === 'create' ? 'Create Artifact' : 'Save Changes'}
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Image Upload */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Upload size={18} />
                                Image
                            </h2>
                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
                                    {watchedValues.image?.url ? (
                                        <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4 group">
                                            <img
                                                src={watchedValues.image.url}
                                                alt={watchedValues.image.alt || 'Preview'}
                                                className="absolute inset-0 w-full h-full object-contain bg-gray-100"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={handleImageUpload}
                                                    className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100"
                                                >
                                                    Change Image
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                                            <Upload className="w-8 h-8 text-gray-400" />
                                        </div>
                                    )}

                                    {!watchedValues.image?.url && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={handleImageUpload}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium transition-colors"
                                            >
                                                <Upload size={16} />
                                                Upload Image
                                            </button>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Supports JPG, PNG, WEBP up to 10MB
                                            </p>
                                        </>
                                    )}
                                </div>
                                {errors.image?.url && (
                                    <p className="text-sm text-red-600">{errors.image.url.message}</p>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Alt Text
                                    </label>
                                    <input
                                        type="text"
                                        {...register('image.alt')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
                                        placeholder="Describe the image..."
                                    />
                                    {errors.image?.alt && (
                                        <p className="text-sm text-red-600 mt-1">{errors.image.alt.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Info</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        {...register('title')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
                                        placeholder="Artifact title"
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        {...register('description')}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors"
                                        placeholder="Brief description..."
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category
                                        </label>
                                        <select
                                            {...register('category')}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                                        >
                                            <option value="General">General</option>
                                            <option value="Branding">Branding</option>
                                            <option value="Packaging">Packaging</option>
                                            <option value="Social Media">Social Media</option>
                                            <option value="Print">Print</option>
                                            <option value="Digital">Digital</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tags
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={tagInput}
                                                onChange={(e) => setTagInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="Add tag..."
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddTag}
                                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {watchedValues.tags && watchedValues.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {watchedValues.tags.map(tag => (
                                            <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                                {tag}
                                                <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-blue-900">×</button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Position */}
                        {/* Position (Hidden controls, just slot identifier) */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <Grid size={18} /> Slot #{currentOrder !== undefined ? currentOrder + 1 : '?'}
                            </h2>
                            {/* Hidden inputs to ensure submission */}
                            <input type="hidden" {...register('position.mdColSpan', { valueAsNumber: true })} />
                            <input type="hidden" {...register('position.mdRowSpan', { valueAsNumber: true })} />
                            <input type="hidden" {...register('position.order', { valueAsNumber: true })} value={currentOrder} />
                        </div>

                        {/* Design */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Palette size={18} /> Design
                            </h2>
                            <div className="space-y-4">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex-1">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Background</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                {...register('design.backgroundColor')}
                                                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                            />
                                            <input
                                                type="text"
                                                {...register('design.backgroundColor')}
                                                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Text Color</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                {...register('design.textColor')}
                                                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                            />
                                            <input
                                                type="text"
                                                {...register('design.textColor')}
                                                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Custom CSS</label>
                                    <input
                                        type="text"
                                        {...register('design.customClass')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
                                        placeholder="e.g. opacity-90"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select
                                        {...register('status')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                                <label className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        {...register('featured')}
                                        className="w-4 h-4 text-blue-600 rounded"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Mark as Featured</span>
                                </label>
                            </div>
                        </div>

                        {/* Live Preview Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Eye size={18} /> Card Preview
                            </h2>
                            <div
                                className="relative overflow-hidden rounded-lg aspect-square border border-gray-100 flex items-center justify-center p-6 text-center shadow-sm"
                                style={{
                                    backgroundColor: watchedValues.design?.backgroundColor,
                                    color: watchedValues.design?.textColor
                                }}
                            >
                                {watchedValues.image?.url && (
                                    <img
                                        src={watchedValues.image.url}
                                        alt="Preview"
                                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                                    />
                                )}
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-2">{watchedValues.title || 'Title'}</h3>
                                    <button
                                        className="px-4 py-1.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full"
                                    >
                                        {watchedValues.link?.text || 'Explore'}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    )
}
