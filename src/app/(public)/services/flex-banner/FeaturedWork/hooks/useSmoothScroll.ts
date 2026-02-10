'use client';

import { useEffect, useRef } from 'react';

export function useSmoothScroll() {
    const scrollRef = useRef<number>(0);
    const targetRef = useRef<number>(0);

    // Native scroll is sufficient and safer than hijacking body height
    // which caused the page to be stuck.
    useEffect(() => {
        // Ensure body is scrollable
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';

        return () => {
            // Cleanup if necessary
        };
    }, []);

    return { scrollRef, targetRef };
}
