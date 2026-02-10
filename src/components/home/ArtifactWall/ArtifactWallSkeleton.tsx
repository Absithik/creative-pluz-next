// app/components/home/ArtifactWall/ArtifactWallSkeleton.tsx
import { POSITION_LAYOUTS } from './constants';

export default function ArtifactWallSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 animate-pulse">
            {POSITION_LAYOUTS.map((layout, index) => (
                <div
                    key={index}
                    className={`${layout.colSpan} ${layout.rowSpan} ${layout.minHeight} bg-gray-800 rounded-xl`}
                />
            ))}
        </div>
    );
}