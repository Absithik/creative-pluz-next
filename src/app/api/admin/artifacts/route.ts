import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidateTag } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import Artifact from '@/lib/models/Artifact';

// GET - List all artifacts (admin)
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectToDatabase();

        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const search = searchParams.get('search') || '';

        const skip = (page - 1) * limit;

        let query: any = {};

        if (status && status !== 'all') {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ];
        }

        const [artifacts, total] = await Promise.all([
            Artifact.find(query)
                .sort({ 'position.order': 1, createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Artifact.countDocuments(query)
        ]);

        return NextResponse.json({
            success: true,
            data: artifacts,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error('Error fetching artifacts:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch artifacts' },
            { status: 500 }
        );
    }
}

// POST - Create new artifact
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
        const body = await request.json();

        // Validate required fields
        const required = ['title', 'description', 'image'];
        for (const field of required) {
            if (!body[field]) {
                return NextResponse.json(
                    { success: false, error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Get order number
        let order = body.position?.order;

        if (typeof order !== 'number') {
            const maxOrder = await Artifact.findOne().sort({ 'position.order': -1 }).select('position.order');
            order = (maxOrder?.position?.order || 0) + 1;
        }

        // Create artifact
        const artifact = new Artifact({
            ...body,
            position: {
                ...(body.position || {}),
                order
            },
            publishedAt: body.status === 'published' ? new Date() : null
        });

        await artifact.save();

        revalidateTag('artifact-wall', 'default');

        return NextResponse.json({
            success: true,
            data: artifact,
            message: 'Artifact created successfully'
        }, { status: 201 });

    } catch (error) {
        console.error('Error creating artifact:', error);

        if (error instanceof Error && error.message.includes('duplicate key')) {
            return NextResponse.json(
                { success: false, error: 'Artifact with similar data already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to create artifact' },
            { status: 500 }
        );
    }
}
