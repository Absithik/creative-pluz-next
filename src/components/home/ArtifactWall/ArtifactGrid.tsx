// app/components/home/ArtifactWall/ArtifactGrid.tsx
'use client';

import { memo } from 'react';
import ArtifactCard from './ArtifactCard';
import { Artifact, ArtifactWallConfig } from './constants';

interface ArtifactGridProps {
    artifacts: Artifact[];
    config: ArtifactWallConfig;
}

const ArtifactGrid = memo(function ArtifactGrid({ artifacts, config }: ArtifactGridProps) {
    const hoverEffect = config.hoverEffect || { enabled: true, scale: 1.02 };

    return (
        <div
            className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto"
            role="list"
            aria-label="Artifacts grid"
        >
            {artifacts.map((artifact, index) => (
                <ArtifactCard
                    key={artifact._id || `artifact-${index}`}
                    artifact={artifact}
                    hoverEffect={hoverEffect}
                    position={index + 1}
                />
            ))}
        </div>
    );
});

export default ArtifactGrid;