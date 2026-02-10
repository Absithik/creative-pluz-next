import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import LayoutSlot from '@/lib/models/LayoutSlot';
import Project from '@/lib/models/Project';

// Add CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
};

// Handle OPTIONS preflight request
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

// Helper to ensure all 8 slots exist
async function ensureSlotsExist() {
    const count = await LayoutSlot.countDocuments();
    if (count < 8) {
        const slotsToCreate = [];
        for (let i = 0; i < 8; i++) {
            const exists = await LayoutSlot.findOne({ slotIndex: i });
            if (!exists) {
                slotsToCreate.push({ slotIndex: i, project: null });
            }
        }
        if (slotsToCreate.length > 0) {
            await LayoutSlot.insertMany(slotsToCreate);
        }
    }
}

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();
        await ensureSlotsExist();

        const slots = await LayoutSlot.find()
            .sort({ slotIndex: 1 })
            .populate({
                path: 'project',
                model: Project,
                select: 'title coverImage category slug status'
            })
            .lean();

        return NextResponse.json(
            { success: true, data: slots },
            { headers: corsHeaders }
        );
    } catch (error) {
        console.error('Error fetching layout slots:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch layout slots' },
            { status: 500, headers: corsHeaders }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        await connectToDatabase();
        const body = await request.json();
        const { slotIndex, projectId } = body;

        // Validation
        if (slotIndex === undefined || slotIndex < 0 || slotIndex > 7) {
            return NextResponse.json(
                { success: false, error: 'Invalid slot index' },
                { status: 400, headers: corsHeaders }
            );
        }

        // Check if project exists if projectId is provided
        if (projectId) {
            const projectExists = await Project.findById(projectId);
            if (!projectExists) {
                return NextResponse.json(
                    { success: false, error: 'Project not found' },
                    { status: 404, headers: corsHeaders }
                );
            }
        }

        // Update or create the slot
        const slot = await LayoutSlot.findOneAndUpdate(
            { slotIndex },
            { project: projectId || null },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            }
        ).populate({
            path: 'project',
            model: Project,
            select: 'title coverImage category slug status'
        });

        return NextResponse.json(
            { success: true, data: slot },
            { headers: corsHeaders }
        );

    } catch (error) {
        console.error('Error updating layout slot:', error);

        if (error instanceof Error && error.name === 'CastError') {
            return NextResponse.json(
                { success: false, error: 'Invalid project ID format' },
                { status: 400, headers: corsHeaders }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to update layout slot' },
            { status: 500, headers: corsHeaders }
        );
    }
}