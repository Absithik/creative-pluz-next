import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow relative z-10">
                {children}
            </main>
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
}
