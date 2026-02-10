import React from 'react';
import StatsGrid from './StatsGrid';

export default function Stats() {
    return (
        <div className="bg-brand-dark">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="border-y border-white/5 py-10 bg-white/[0.01]">
                    <StatsGrid />
                </div>
            </div>
        </div>
    );
}
