'use client';

import { useState, useEffect, useCallback } from 'react';
import { Project } from '../types';

export function useProjectsPagination(category: string) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const LIMIT = 15;

    // Reset when category changes
    useEffect(() => {
        setProjects([]);
        setPage(1);
        setHasMore(true);
    }, [category]);

    const loadMore = useCallback(async () => {
        if (loading || !hasMore || category === 'All') return;

        setLoading(true);
        try {
            const res = await fetch(`/api/projects?category=${encodeURIComponent(category)}&page=${page}&limit=${LIMIT}&status=published`);
            const json = await res.json();

            if (json.success) {
                const newProjects = json.data;
                if (newProjects.length < LIMIT) {
                    setHasMore(false);
                }

                setProjects(prev => {
                    // Prevent duplicates just in case
                    const existingIds = new Set(prev.map(p => p._id));
                    const uniqueNew = newProjects.filter((p: Project) => !existingIds.has(p._id));
                    return [...prev, ...uniqueNew];
                });
                setPage(prev => prev + 1);
            }
        } catch (error) {
            console.error('Failed to load projects:', error);
        } finally {
            setLoading(false);
        }
    }, [category, page, loading, hasMore]);

    // Initial load for category
    useEffect(() => {
        if (category !== 'All' && page === 1) {
            loadMore();
        }
    }, [category, page, loadMore]);

    return { projects, loading, hasMore, loadMore };
}
