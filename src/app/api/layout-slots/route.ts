import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import LayoutSlot from '@/lib/models/LayoutSlot';
import Project from '@/lib/models/Project';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const slots = await LayoutSlot.find()
            .sort({ slotIndex: 1 })
            .populate({
                path: 'project',
                model: Project,
                select: 'title coverImage category slug status year description'
                // Added year/description as they are used in the snippet
            })
            .lean();

        return NextResponse.json({ success: true, data: slots });
    } catch (error) {
        console.error('Error fetching layout slots:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch layout slots' },
            { status: 500 }
        );
    }
}
