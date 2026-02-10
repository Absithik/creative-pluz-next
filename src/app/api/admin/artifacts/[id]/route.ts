import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import Artifact from '@/lib/models/Artifact';

interface Params {
    params: { id: string };
}

// GET - Get single artifact
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectToDatabase();

        const artifact = await Artifact.findById(id).lean();

        if (!artifact) {
            return NextResponse.json(
                { success: false, error: 'Artifact not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: artifact
        });

    } catch (error) {
        console.error('Error fetching artifact:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch artifact' },
            { status: 500 }
        );
    }
}

// PUT - Update artifact
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectToDatabase();
        const body = await request.json();

        const artifact = await Artifact.findById(id);

        if (!artifact) {
            return NextResponse.json(
                { success: false, error: 'Artifact not found' },
                { status: 404 }
            );
        }

        // Update artifact
        Object.assign(artifact, body);

        // Update publishedAt if status changed to published
        if (body.status === 'published' && artifact.status !== 'published') {
            artifact.publishedAt = new Date();
        }

        await artifact.save();

        revalidateTag('artifact-wall', 'default');

        return NextResponse.json({
            success: true,
            data: artifact,
            message: 'Artifact updated successfully'
        });

    } catch (error) {
        console.error('Error updating artifact:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update artifact' },
            { status: 500 }
        );
    }
}

// DELETE - Delete artifact (soft delete)
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectToDatabase();

        const artifact = await Artifact.findById(id);

        if (!artifact) {
            return NextResponse.json(
                { success: false, error: 'Artifact not found' },
                { status: 404 }
            );
        }

        // Soft delete by changing status to archived
        artifact.status = 'archived';
        await artifact.save();

        revalidateTag('artifact-wall', 'default');

        return NextResponse.json({
            success: true,
            message: 'Artifact archived successfully'
        });

    } catch (error) {
        console.error('Error archiving artifact:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to archive artifact' },
            { status: 500 }
        );
    }
}
