import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IArtifact extends Document {
    title: string;
    description: string;
    image: {
        url: string;
        alt: string;
        publicId?: string;
        width?: number;
        height?: number;
    };
    position: {
        mdColSpan: number;
        mdRowSpan: number;
        order: number;
    };
    design: {
        backgroundColor: string;
        textColor: string;
        customClass?: string;
    };
    link: {
        url: string;
        text: string;
    };
    category?: string;
    tags?: string[];
    featured: boolean;
    status: 'draft' | 'published' | 'archived';
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const ArtifactSchema = new Schema<IArtifact>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [100, 'Title cannot exceed 100 characters']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            maxlength: [200, 'Description cannot exceed 200 characters']
        },
        image: {
            url: {
                type: String,
                required: [true, 'Image URL is required']
            },
            alt: {
                type: String,
                required: [true, 'Image alt text is required'],
                trim: true
            },
            publicId: String,
            width: Number,
            height: Number
        },
        position: {
            mdColSpan: {
                type: Number,
                required: true,
                min: 1,
                max: 12,
                default: 4
            },
            mdRowSpan: {
                type: Number,
                required: true,
                min: 1,
                max: 3,
                default: 1
            },
            order: {
                type: Number,
                required: true,
                default: 0
            }
        },
        design: {
            backgroundColor: {
                type: String,
                required: true,
                default: '#000000'
            },
            textColor: {
                type: String,
                required: true,
                default: '#FFFFFF'
            },
            customClass: String
        },
        link: {
            url: {
                type: String,
                default: ''
            },
            text: {
                type: String,
                default: 'Explore'
            }
        },
        category: {
            type: String,
            default: 'General'
        },
        tags: [String],
        featured: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft'
        },
        publishedAt: Date
    },
    {
        timestamps: true
    }
);

// Indexes for better query performance
ArtifactSchema.index({ status: 1, 'position.order': 1 });
ArtifactSchema.index({ featured: 1, status: 1 });
ArtifactSchema.index({ category: 1, status: 1 });

// Prevent overwrite model error
const Artifact: Model<IArtifact> = mongoose.models.Artifact || mongoose.model<IArtifact>('Artifact', ArtifactSchema);

export default Artifact;
