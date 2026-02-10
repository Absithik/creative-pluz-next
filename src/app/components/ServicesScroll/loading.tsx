export default function ServicesLoading() {
    return (
        <div className="min-h-screen bg-black">
            <div className="h-screen flex items-center justify-center">
                <div className="text-white">
                    <div className="animate-pulse">
                        <div className="h-8 w-48 bg-gray-800 rounded mb-4"></div>
                        <div className="h-4 w-64 bg-gray-800 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
