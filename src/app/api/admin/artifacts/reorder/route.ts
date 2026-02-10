import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import Artifact from '@/lib/models/Artifact';

// POST - Reorder artifacts
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectToDatabase();
        const { orderedIds } = await request.json();

        if (!Array.isArray(orderedIds)) {
            return NextResponse.json(
                { success: false, error: 'Invalid reorder data' },
                { status: 400 }
            );
        }

        // Update order for all artifacts
        const bulkOps = orderedIds.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { order: index + 1 }
            }
        }));

        await Artifact.bulkWrite(bulkOps);

        return NextResponse.json({
            success: true,
            message: 'Artifacts reordered successfully'
        });

    } catch (error) {
        console.error('Error reordering artifacts:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to reorder artifacts' },
            { status: 500 }
        );
    }
}
