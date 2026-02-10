import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Artifact from '@/lib/models/Artifact';

// GET - Public artifacts
export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const searchParams = request.nextUrl.searchParams;
        const limit = parseInt(searchParams.get('limit') || '9');
        const category = searchParams.get('category');

        const query: any = {
            status: 'published',
            $or: [
                { publishedAt: { $lte: new Date() } },
                { publishedAt: { $exists: false } }
            ]
        };

        if (category && category !== 'All') {
            query.category = category;
        }

        const artifacts = await Artifact.find(query)
            .select('-__v')
            .sort({ 'position.order': 1, featured: -1, publishedAt: -1 })
            .limit(limit)
            .lean();

        return NextResponse.json({
            success: true,
            data: artifacts
        });

    } catch (error) {
        console.error('Error fetching artifacts:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch artifacts' },
            { status: 500 }
        );
    }
}
