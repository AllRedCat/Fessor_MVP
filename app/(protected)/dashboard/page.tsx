'use client';

export default function DashboardPage() {
    return (
        <>
            <DashboardContent />
        </>
    );
}

function DashboardContent() {
    return (
        <div className="w-full h-full bg-black/10 dark:bg-white/15 py-6 sm:px-6 lg:px-8 overflow-auto">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3">
                    <div className='bg-black/10 dark:bg-white/10 w-full rounded-3xl h-80 flex justify-center items-center'>
                    </div>
                    <div className='bg-black/10 dark:bg-white/10 w-full rounded-3xl h-80 flex justify-center items-center'>
                    </div>
                    <div className='bg-black/10 dark:bg-white/10 w-full rounded-3xl h-80 flex justify-center items-center'>
                    </div>
                </div>
            </div>
        </div>
    );
}