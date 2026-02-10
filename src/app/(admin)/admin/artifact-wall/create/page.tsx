'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ArtifactForm from '../_components/ArtifactForm';

function NewArtifactContent() {
    const searchParams = useSearchParams();
    const order = searchParams.get('order') ? parseInt(searchParams.get('order')!) : undefined;

    return <ArtifactForm initialId="create" initialOrder={order} />;
}

export default function NewArtifactPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NewArtifactContent />
        </Suspense>
    );
}
