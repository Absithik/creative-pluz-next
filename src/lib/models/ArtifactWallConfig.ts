import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IArtifactWallConfig extends Document {
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
    updatedAt: Date;
}

const ArtifactWallConfigSchema = new Schema<IArtifactWallConfig>(
    {
        title: {
            type: String,
            default: 'Selected'
        },
        subtitle: {
            type: String,
            default: 'Artifacts.'
        },
        archiveLink: {
            type: String,
            default: '/portfolio'
        },
        gridHeight: {
            mobile: {
                type: String,
                default: 'auto'
            },
            desktop: {
                type: String,
                default: '300vh'
            },
            largeDesktop: {
                type: String,
                default: '220vh'
            }
        },
        hoverEffect: {
            enabled: {
                type: Boolean,
                default: true
            },
            scale: {
                type: Number,
                default: 0.99,
                min: 0.5,
                max: 1.5
            }
        },
        maxItems: {
            type: Number,
            default: 9,
            min: 1,
            max: 20
        }
    },
    {
        timestamps: true
    }
);

// Prevent overwrite model error
const ArtifactWallConfig: Model<IArtifactWallConfig> = mongoose.models.ArtifactWallConfig || mongoose.model<IArtifactWallConfig>('ArtifactWallConfig', ArtifactWallConfigSchema);

export default ArtifactWallConfig;
