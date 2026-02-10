import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import ArtifactWallConfig from '@/lib/models/ArtifactWallConfig';

// GET - Get config
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectToDatabase();

        let config = await ArtifactWallConfig.findOne();

        if (!config) {
            // Create default config if none exists
            config = new ArtifactWallConfig();
            await config.save();
        }

        return NextResponse.json({
            success: true,
            data: config
        });

    } catch (error) {
        console.error('Error fetching config:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch config' },
            { status: 500 }
        );
    }
}

// PUT - Update config
export async function PUT(request: NextRequest) {
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

        let config = await ArtifactWallConfig.findOne();

        if (!config) {
            config = new ArtifactWallConfig(body);
        } else {
            Object.assign(config, body);
        }

        await config.save();

        return NextResponse.json({
            success: true,
            data: config,
            message: 'Configuration updated successfully'
        });

    } catch (error) {
        console.error('Error updating config:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update config' },
            { status: 500 }
        );
    }
}
