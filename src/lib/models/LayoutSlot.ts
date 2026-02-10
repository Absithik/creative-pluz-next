import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILayoutSlot extends Document {
    slotIndex: number;
    project: mongoose.Types.ObjectId;
}

const LayoutSlotSchema = new Schema({
    slotIndex: {
        type: Number,
        required: true,
        unique: true,
        min: 0,
        max: 7
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        default: null
    }
}, {
    timestamps: true
});

// Ensure indexes
LayoutSlotSchema.index({ slotIndex: 1 });

const LayoutSlot: Model<ILayoutSlot> = mongoose.models.LayoutSlot || mongoose.model<ILayoutSlot>('LayoutSlot', LayoutSlotSchema);

export default LayoutSlot;
